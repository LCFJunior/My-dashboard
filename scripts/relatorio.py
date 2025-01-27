import pandas as pd
import psycopg2

conn = psycopg2.connect(
    dbname="myproject",
    user="postgres",
    password="junior40",
    host="localhost",
    client_encoding="UTF8"
)

df = pd.read_sql("SELECT * FROM projetos", conn)
print(df)
