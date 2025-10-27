# Final-Year Project

## Project Title
**Fraud Detection Using Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG)**

## Student Team

| No. | Name              | Student ID | Email                        |
|-----|-------------------|------------|------------------------------|
| 1   | Tan James Anthroi | 240350922  | 240350922@stu.vtc.edu.hk     |
| 2   | Aqsa Ahmed        | 240044574  | 240044574@stu.vtc.edu.hk     |
| 3   | Lin Yueying       | 240444846  | 240444846@stu.vtc.edu.hk     |
| 4   | Tan Xiuhao        | 240253372  | 240253372@stu.vtc.edu.hk     |

---

## Executive Summary
This project proposes a **fraud detection platform** that leverages the strengths of **Large Language Models (LLMs)** and **Retrieval-Augmented Generation (RAG)** to identify fraudulent communication with greater accuracy and transparency.  

Fraud cases will be collected from diverse online sources and stored in a vector database for semantic retrieval. When users submit suspicious text, the system retrieves relevant examples to ground the LLM’s analysis, producing reliable classifications and clear explanations.  

The platform emphasizes:
- **Accuracy**: Detecting subtle indicators of fraud through contextual analysis  
- **Scalability**: Modular design for future enhancements  
- **Accessibility**: Multilingual support and a user-friendly web interface  
- **Ethical Responsibility**: Focused exclusively on fraud detection to ensure safe and responsible AI use  

---

## Project Objectives
- Develop a web-based platform to detect fraudulent communication  
- Integrate LLMs with RAG for improved accuracy and explainability  
- Build and maintain a dynamic fraud case knowledge base through web scraping  
- Provide users with clear, actionable insights to strengthen trust in digital communication  

---

## Technical Approach
- **Architecture**: Web-based platform with a React frontend, Node.js backend, and MongoDB for user data.  
- **AI Pipeline**: RAG + LLM pipeline orchestrated with LangChain; embeddings generated using Sentence-BERT or OpenAI embeddings.  
- **Knowledge Base**: Fraud cases scraped from Reddit, HK01, Yahoo, SCMP, and HKMA, vectorized and stored in ChromaDB for semantic retrieval.  
- **Algorithms**:  
  - Named Entity Recognition (NER) to detect fraud-related entities  
  - RAG grounding to provide context from real fraud cases  
  - Rule-based scoring for additional interpretability  
- **Deployment**: Containerized with Docker; CI/CD managed via GitHub Actions.  
- **Optional**: Whisper for multilingual speech-to-text input.  

---

## Expected Deliverables
- Functional web-based fraud detection platform  
- Source code with documentation  
- Fraud case dataset with references  
- User testing summary and demo presentation  
- Final project report  
