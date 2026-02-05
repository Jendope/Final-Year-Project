# 1.Creating a virtual environment
`python -m venv env`

# 2.Activate the virtual environment
`env\Scripts\activate`

# 3.Install dependencies
`pip install -r requirements.txt`

# 4.Install notebook dependencies
`pip install notebook`

# 5.Run Jupyter Notebook
`jupyter notebook`

# 6.
Run `HK01_news_webScraping.ipynb` to get `hk01_scam_articles.md`

# 7. 
Run `main.ipynb` to obtain the `chroma_hk01_scam_db` folder (vector database).

# 8.
Run `Daily_database_update_script.ipynb` to obtain the `daily_new_articles.md` and update the vector database