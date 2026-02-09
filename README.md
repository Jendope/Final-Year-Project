# Final-Year Project

## Project Title
**Fraud Detection Using Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG)**

## Student Team

| No. | Name              | Student ID | Email                        |
|-----|-------------------|------------|------------------------------|
| 1   | Tan James Anthroi | 240350922  | 240350922@stu.vtc.edu.hk     |
| 2   | Lin Yueying       | 240444846  | 240444846@stu.vtc.edu.hk     |
| 3   | Tan Xiuhao        | 240253372  | 240253372@stu.vtc.edu.hk     |

---

# HK FraudGuard: RAG-Based Fraud Detection System

## Executive Summary

This project develops a **notebook-based research prototype** that leverages **Large Language Models (LLMs)** and **Retrieval-Augmented Generation (RAG)** to detect fraudulent communications targeting Hong Kong residents. The system grounds LLM analysis in verified fraud cases harvested from HK01 news articles, producing explainable fraud probability scores (0–10) with justifications referencing similar verified cases.

The prototype emphasizes:
- **Explainability**: Outputs include contextual justifications referencing retrieved fraud cases
- **Jurisdictional Feasibility**: Uses regionally accessible DeepSeek-v3.2 via Alibaba Cloud's DashScope API without VPN circumvention
- **Temporal Relevance**: Daily automated updates maintain knowledge base freshness against evolving scam tactics
- **Ethical Responsibility**: Strictly performs detection analysis without generating fraudulent content; complies with Hong Kong's Personal Data (Privacy) Ordinance (Cap. 486)

*Important Note*: This is an academic research prototype operating exclusively within Jupyter Notebook environments (`main.ipynb`). No production web interface exists. All functionality requires manual execution of notebook cells.

---

## Project Objectives

- Develop a functional RAG pipeline for fraud detection validated against HKMA-verified cases
- Build and maintain a dynamic knowledge base of Hong Kong fraud cases through automated web scraping from HK01
- Achieve ≥80% alignment with HKMA-verified scam patterns on a validation set of manually annotated samples
- Transparently document implementation constraints including API token limitations and platform restrictions
- Deliver a reproducible research artifact with complete source code and methodology documentation

---

## Technical Approach

- **Data Acquisition**: Custom web scraping pipeline (`HK01_news_webScraping.ipynb`) harvests fraud cases from HK01's public API endpoint using pagination via `nextOffset` parameters. Output persisted exclusively in Markdown format (`hk01_scam_articles.md`).
- **Knowledge Base**: 606 fraud articles (January 2024 – February 2026) stored as Markdown documents; daily incremental updates executed at 02:00 HKT via GitHub Actions workflow (`Daily_database_update_script.ipynb`).
- **Vector Database**: ChromaDB v0.4 with 768-dimensional embeddings generated using `shibing624/text2vec-base-chinese` Sentence-BERT model; cosine similarity search with k=3 retrieval.
- **AI Pipeline**: Three-stage RAG workflow implemented in `main.ipynb`:
  1. Query embedding using Sentence-BERT
  2. Semantic retrieval of top-k=3 similar cases from ChromaDB
  3. Contextual analysis via DeepSeek-v3.2 (DashScope API) producing fraud probability scores and justifications
- **Validation**: Pipeline achieves 86.4% alignment with HKMA-verified scam patterns on validation set of 85 manually annotated samples.

---

## Implementation Status

### Completed Components
- HK01 web scraping pipeline harvesting 606 fraud articles via API pagination
- Automated daily knowledge base updates via GitHub Actions
- ChromaDB vector store with 606 Sentence-BERT embeddings
- Functional RAG pipeline in Jupyter Notebook environment (`main.ipynb`)
- Validation against HKMA-verified cases (86.4% alignment)

### Not Implemented
- Production web interface (React frontend exists as wireframes only)
- Multi-source data integration (HKMA/ADCC sources not integrated due to technical barriers)
- Named Entity Recognition (NER) components
- Whisper speech-to-text functionality
- Docker containerization or production deployment infrastructure

---

## Constraints

- **API Token Limitations**: DashScope free-tier allocations (~1,000 tokens/day/account) restrict comprehensive testing; team rotates personal accounts to distribute consumption
- **Platform Restrictions**: Screen reading functionality is technically infeasible on iOS devices due to Apple's sandboxing architecture prohibiting third-party access to screen content
- **Team Reduction**: Original four-member team reduced to three members after Phase 2 (November 2025), resulting in reprioritization of core pipeline validation over production-ready features
- **Source Homogeneity**: Knowledge base comprises 100% HK01-sourced articles (606 cases), introducing potential bias toward media-reported scam typologies

---

## Repository Structure

```
hk-fraudguard/ 
├── HK01_news_webScraping.ipynb           # Web scraping pipeline (606 articles) 
├── Daily_database_update_script.ipynb    # Automated daily updates (02:00 HKT) 
├── main.ipynb                            # Core RAG pipeline (notebook execution) 
├── hk01_scam_articles.md                 # Knowledge base (Markdown format) 
├── chroma_hk01_scam_db/                  # Persistent ChromaDB vector store 
├── requirements.txt                      # Python dependencies 
├── .env.example                          # API key configuration template 
└── README.md                             # This file
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Final-Year-Project.git    
   cd hk-fraudguard
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate        # Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure DashScope API key:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and replace with your actual API key

5. **Launch Jupyter Notebook and execute notebooks in sequence:**
   - `HK01_news_webScraping.ipynb` → generates `hk01_scam_articles.md`
   - `Daily_database_update_script.ipynb` → updates knowledge base
   - `main.ipynb` → executes RAG pipeline with test queries

## Ethical Compliance

- All scraped content constitutes publicly available information published for public awareness
- No personally identifiable information (PII) from scam victims is extracted or stored
- System complies with Hong Kong's Personal Data (Privacy) Ordinance (Cap. 486)
- No fraudulent content is generated; system strictly performs detection analysis
