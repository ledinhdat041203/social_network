from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

load_dotenv()

URI = os.getenv("URI")
USERNAME = os.getenv("USER_NAME")
PWD = os.getenv("PWD")

class Neo4jConnector:
    def __init__(self, uri = URI, user = USERNAME, password = PWD):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def get_session(self):
        return self.driver.session()
