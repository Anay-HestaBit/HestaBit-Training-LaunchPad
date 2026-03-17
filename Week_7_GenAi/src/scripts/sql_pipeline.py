import sys
import sqlite3
import pandas as pd
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.generator.sql_generator import SQLGenerator
from src.utils.schema_loader import schema_as_text
from src.utils.sql_validator import validate_sql
from src.generator.llm_client import generate

DB_PATH = "src/data/sales.db"


class SQLPipeline:
    def __init__(self):
        self.generator = SQLGenerator()
        self.schema_text = schema_as_text()

    def execute_sql(self, sql: str):
        conn = sqlite3.connect(DB_PATH)
        try:
            df = pd.read_sql_query(sql, conn)
        finally:
            conn.close()
        return df

    def auto_fix_sql(self, question: str, bad_sql: str, error: str):
        fix_prompt = f"""
The following SQL query failed:

SQL:
{bad_sql}

Error:
{error}

Schema:
{self.schema_text}

Fix the SQL query.
Return ONLY corrected SELECT query.
"""

        output = generate(fix_prompt)

        import re

        match = re.search(r"(select\s+.*?;)", output, re.IGNORECASE | re.DOTALL)

        if not match:
            raise ValueError("Failed to auto-correct SQL.")

        return match.group(1).strip()

    def summarize_result(self, question: str, df: pd.DataFrame):
        preview = df.head(20).to_string(index=False)

        prompt = f"""
User question:
{question}

SQL result table:
{preview}

Summarize the result in clear and concise natural language.
"""

        return generate(prompt)

    def run(self, question: str):
        print("\nGenerating SQL...")
        sql = self.generator.generate_sql(question, self.schema_text)
        print("Generated SQL:", sql)

        try:
            sql = validate_sql(sql)
            df = self.execute_sql(sql)

        except Exception as e:
            print("SQL failed. Attempting auto-fix...")
            fixed_sql = self.auto_fix_sql(question, sql, str(e))
            print("Fixed SQL:", fixed_sql)

            fixed_sql = validate_sql(fixed_sql)
            df = self.execute_sql(fixed_sql)

        if df.empty:
            return "No results found."

        summary = self.summarize_result(question, df)
        return summary


if __name__ == "__main__":
    pipeline = SQLPipeline()

    while True:
        question = input("\nAsk SQL question (q to quit): ")
        if question.lower() == "q":
            break

        answer = pipeline.run(question)
        print("\nFinal Answer:\n", answer)
