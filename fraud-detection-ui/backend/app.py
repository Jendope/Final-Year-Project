from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from sentence_transformers import SentenceTransformer
from typing import List
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# ============================================
# Configuration
# ============================================
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY")
CHROMA_DB_PATH = os.path.join(os.path.dirname(__file__), "..", "Langchain", "chroma_hk01_scam_db")

if not DASHSCOPE_API_KEY:
    raise ValueError("Please set DASHSCOPE_API_KEY in .env file")


# ============================================
# Initialize RAG Components
# ============================================
class LocalEmbeddings:
    def __init__(self, model_name="shibing624/text2vec-base-chinese"):
        print("Loading embedding model: " + model_name + "...")
        self.model = SentenceTransformer(model_name)
        print("Embedding model loaded successfully!")

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return self.model.encode(texts, normalize_embeddings=True).tolist()

    def embed_query(self, text: str) -> List[float]:
        return self.model.encode([text], normalize_embeddings=True)[0].tolist()


# Initialize embeddings
embeddings = LocalEmbeddings()

# Load vector store
print("Loading ChromaDB vector store...")
vectorstore = Chroma(
    persist_directory=CHROMA_DB_PATH,
    embedding_function=embeddings
)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
print("Vector store loaded with " + str(vectorstore._collection.count()) + " documents")

# Initialize LLM
llm = ChatOpenAI(
    model="deepseek-v3.2",
    openai_api_key=DASHSCOPE_API_KEY,
    openai_api_base="https://dashscope.aliyuncs.com/compatible-mode/v1",
    temperature=0.0
)

# Prompt template
prompt_template = """
You are an anti-fraud expert. Based on the following message content and recent real fraud news cases,
determine whether this message matches a known fraud pattern.

Message content:
{sms}

Related recent fraud news (from HK01):
{retrieved_cases}

Please focus on analyzing:
- Whether it involves the same tactics (such as "verify identity", "urgent transfer", "winning a prize", etc.)
- Whether it impersonates official organizations (banks, police, couriers)
- Whether it induces clicking links / downloading apps / providing verification codes

Please output strictly in the following JSON format (no other text):
{{"score": integer (0-10), "reason": "brief reason (within 100 characters)"}}
"""
prompt = ChatPromptTemplate.from_template(prompt_template)


# ============================================
# Fraud Detection Function
# ============================================
def predict_fraud_probability(sms_text: str) -> tuple:
    """
    Predict fraud probability using RAG + LLM

    Returns:
        tuple: (probability: float, reason: str)
    """
    try:
        # Retrieve similar fraud cases
        retrieved_docs = retriever.invoke(sms_text)
        cases = "\n".join([doc.page_content[:500] for doc in retrieved_docs])

        # Format prompt and get LLM response
        formatted_prompt = prompt.format(sms=sms_text, retrieved_cases=cases)
        response = llm.invoke(formatted_prompt)
        output = response.content.strip()

        # Parse JSON response
        try:
            result = json.loads(output)
            score = int(result["score"])
            reason = result.get("reason", "No reason provided").strip()
            score = max(0, min(10, score))  # Clamp to 0-10
            probability = score / 10.0
            return probability, reason
        except Exception:
            # Fallback: extract numbers and text
            numbers = re.findall(r'\d+', output)
            score = int(numbers[0]) if numbers else 5
            score = max(0, min(10, score))
            probability = score / 10.0

            # Extract reason
            reason_match = re.search(r'(?<=[:"\uff1a])([^"\\]+?)(?="|$)', output)
            if reason_match:
                reason = reason_match.group(1).strip()[:100]
            else:
                reason = "(System response: " + output[:50] + "...)"

            return probability, reason

    except Exception as e:
        print("Error in prediction: " + str(e))
        return 0.5, "Analysis error: " + str(e)


# ============================================
# API Routes
# ============================================
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model': 'deepseek-v3.2',
        'documents': vectorstore._collection.count()
    })

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """
    Analyze text for fraud probability

    Request body:
        {
            "text": "string - the suspicious message to analyze"
        }

    Response:
        {
            "probability": float (0.0 to 1.0),
            "reason": "string - explanation",
            "success": boolean
        }
    """
    try:
        data = request.get_json()

        if not data or 'text' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing "text" field in request body'
            }), 400

        text = data['text'].strip()

        if not text:
            return jsonify({
                'success': False,
                'error': 'Text cannot be empty'
            }), 400

        # Perform fraud detection
        probability, reason = predict_fraud_probability(text)

        return jsonify({
            'success': True,
            'probability': probability,
            'reason': reason,
            'input_length': len(text)
        })

    except Exception as e:
        print("API Error: " + str(e))
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================
# Run Server
# ============================================
if __name__ == '__main__':
    print("\n" + "=" * 50)
    print("HK FraudGuard Backend Server")
    print("=" * 50)
    print("Loaded " + str(vectorstore._collection.count()) + " fraud cases")
    print("Using model: deepseek-v3.2")
    print("Server starting on http://localhost:5000")
    print("=" * 50 + "\n")

    app.run(debug=True, host='0.0.0.0', port=5000)