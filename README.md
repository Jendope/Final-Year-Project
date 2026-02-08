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
   git clone https://github.com/your-username/hk-fraudguard.git    
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