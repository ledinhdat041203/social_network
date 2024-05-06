from database.Neo4jConnect import Neo4jConnector
import uuid

SUGGESTION_SIZE = 6

def findIDByEmail(email):
        neo4j = Neo4jConnector()
        with neo4j.get_session() as session:
            result = session.run(
                "MATCH (u:User {email: $email}) RETURN u",
                email=email)
            record = result.single()
            print(record)
            if record:
                return record["u"]["id"]
            else:
                return None
        
def login(email, pwd):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        result = session.run(
            "MATCH (u:User {email: $email, password: $password}) RETURN u",
            email=email, password = pwd)
        record = result.single()
        return True if record else False
    
def existsEmail(email):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        result = session.run(
            "MATCH (a:User {email: $email}) RETURN a",
            email=email)
        record = result.single()
        return True if record else False

def register(user):
    neo4j = Neo4jConnector()
    user.id = str(uuid.uuid4())
    
    with neo4j.get_session() as session:
        query = (
            "CREATE (u:User {id: $id, fullname: $fullname, gender: $gender, phone: $phone, birthday: $birthday, "
            "city: $city, country: $country, email: $email, password: $password, profileImageUrl: $profileImageUrl})"
        )
        try:
            session.run(query, {
                "id": user.id,
                "fullname": user.fullname,
                "gender": user.gender,
                "phone": user.phone,
                "birthday": user.birthday,
                "city": user.city,
                "country": user.country,
                "email": user.email,
                "password": user.password,
                "profileImageUrl": user.profileImageUrl
            })
            return True
        except Exception as e:
            print(e)
            return False

def exists_follow(userid1, userid2):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "MATCH (u1:User) WHERE u1.id = $userid1 \n"\
                "MATCH (u2:User) WHERE u2.id = $userid2 \n"\
                "MATCH (u1)-[f:FOLLOWS]->(u2) \n"\
                "RETURN f"
        try:
            result = session.run(query, userid1 = userid1, userid2 = userid2)
            record = result.single()
            return True if record else False
        except Exception as e:
            print(e)
            return False


def follow(userid1, userid2):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "MATCH (u1:User) WHERE u1.id = $userid1 \n"\
                "MATCH (u2:User) WHERE u2.id = $userid2 \n"\
                "CREATE (u1)-[:FOLLOWS]->(u2)"
        try:
            session.run(query, userid1 = userid1, userid2 = userid2)
            return True
        except Exception as e:
            print(e)
            return False

def unfollow(userid1, userid2):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "MATCH (u1:User) WHERE u1.id = $userid1\n"\
                "MATCH (u2:User) WHERE u2.id = $userid2\n"\
                "MATCH (u1)-[f:FOLLOWS]->(u2)\n"\
                    "DELETE f"
        try:
            session.run(query, userid1 = userid1, userid2 = userid2)
            return True
        except Exception as e:
            print(e)
            return False
def get_info_user(userid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        result = session.run(
            "MATCH (u:User {id: $id}) RETURN u.fullname as fullname, u.id as id, u.profileImageUrl as avata",
            id=userid)
        return result.data()
def suggestionUser(userid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "match (u1:User {id: $id}) "\
                "MATCH (u2:User) "\
                "WHERE NOT EXISTS((u1)-[:FOLLOWS]->(u2)) and (u1.id <> u2.id) "\
                "return u2.id as id, u2.fullname as fullname, u2.profileImageUrl as avata "\
                "ORDER BY rand() LIMIT $size"
        try:
            result = session.run(query, id = userid, size = SUGGESTION_SIZE)
            return result.data()
        except Exception as e:
            print(e)
def savepost(userid, postid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "Match (u:User {id: $userid}) "\
                "Match (p:Post {id: $postid}) "\
                "Create (u) -[r:save_at]-> (p)"
        try:
            session.run(query, userid=userid, postid = postid)
            return True
        except Exception as e:
            print(e)
            return False
def profile(userid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "MATCH (u:User {id: $id}) "\
                "OPTIONAL MATCH (u)-[:FOLLOWS]->(following:User) "\
                "OPTIONAL MATCH (followers:User)-[:FOLLOWS]->(u) "\
                "RETURN u.id as id, u.fullname as fullname, u.phone as phone, u.city as city, u.country as country,u.profileImageUrl as avata, "\
                "COUNT(following) AS following, COUNT(followers) AS followers"
        try:
            result = session.run(query, id = userid)
            return result.data()
        except Exception as e:
            print(e)

        
