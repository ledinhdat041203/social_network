from neo4j import GraphDatabase

URI = "bolt://localhost:7687"
USERNAME = "neo4j"
PWD = "socialnetwork"

class Neo4jConnector:
    def __init__(self, uri = URI, user = USERNAME, password = PWD):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def get_session(self):
        return self.driver.session()
