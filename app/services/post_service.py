from database.Neo4jConnect import Neo4jConnector
import uuid
from datetime import datetime
PAGESIZE = 4

def create_post(post, id):
        neo4j = Neo4jConnector()
        post.id = str(uuid.uuid4())
        time = str(datetime.now().strftime("%Y-%m-%d %H:%M"))
        with neo4j.get_session() as session:
            query = "MATCH (u:User) WHERE u.id = $user_id\n" \
                   "CREATE (u)-[r:UPLOADS]->(p:Post {id: $id, text: $text, imageUrl: $imageURL, time: $time, likesCount: 0, commentsCount: 0}) "

            try:
                session.run(query, {
                    "user_id": id,
                    "id": post.id,
                    "text": post.text,
                    "imageURL": post.imageURL,
                    "time": post.time
                })
                return True
            except Exception as e:
                print(e)
                return False
    
def exists_like(userid, postid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "match (u:User {id: $userid})"\
                "match (p:Post {id: $postid})"\
                "match (u) -[l:like_at]->(p)"\
                "return l"
        result = session.run(query,userid=userid, postid = postid)
        record = result.single()
        return True if record else False
    
def quit_like(userid, postid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "match (u:User {id: $userid}) "\
                "match (p:Post {id: $postid}) "\
                "match (u)-[l:like_at]->(p) "\
                "delete l "\
                "set p.likesCount = p.likesCount-1"
        try:
            session.run(query,userid=userid, postid = postid)
            return True
        except Exception as e:
            print(e)
            return False
def like_post(userid, postid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "match (u:User {id: $userid}) "\
                "match (p:Post {id: $postid}) "\
                "create (u) -[l:like_at]->(p) "\
                "set p.likesCount = p.likesCount+1"
        try:
            session.run(query,userid=userid, postid = postid)
            return True
        except Exception as e:
            print(e)
            return False
        
def findAllPostPage(page, id):
    neo4j = Neo4jConnector()
    skip = page*PAGESIZE
    with neo4j.get_session() as session:
        query = "match (p:Post)"\
                "match (u:User) -[l:UPLOADS]->(p)"\
                "OPTIONAL MATCH (u2:User {id: $id})-[r:like_at]->(p)"\
                "RETURN p.id as id, p.imageUrl as imageUrl, p.text as text, p.time as time, p.likesCount as likesCount, p.commentsCount as commentsCount, "\
                "CASE WHEN r IS NULL THEN FALSE ELSE TRUE END AS liked, u.fullname as fullname, u.profileImageUrl as avata "\
                "ORDER BY p.time DESC skip $skip  limit $pagesize"
        try:
            result = session.run(query,id = id,skip=skip, pagesize = PAGESIZE)
            return result.data()
        except Exception as e:
            print(e)

def findPostFollowing(page, id):
    neo4j = Neo4jConnector()
    skip = page*PAGESIZE
    with neo4j.get_session() as session:
        query = "Match (u1:User {id: $id}) "\
                "Match (u1) -[f:FOLLOWS]-> (u2:User) "\
                "Match (u2) -[up:UPLOADS]->(p:Post) "\
                "OPTIONAL MATCH (u1)-[r:like_at]->(p) "\
                "RETURN p.id as id, p.imageUrl as imageUrl, p.text as text, p.time as time, p.likesCount as likesCount, p.commentsCount as commentsCount, "\
                "CASE WHEN r IS NULL THEN FALSE ELSE TRUE END AS liked, u2.fullname as fullname, u2.profileImageUrl as avata "\
                "ORDER BY p.time DESC skip $skip  limit $pagesize"
        try:
            result = session.run(query,id = id,skip=skip, pagesize = PAGESIZE)
            return result.data()
        except Exception as e:
            print(e)

def createComment(postid, comment, userid):
    neo4j = Neo4jConnector()
    id = str(uuid.uuid4())
    time = str(datetime.now().strftime("%Y-%m-%d %H:%M"))
    with neo4j.get_session() as session:
        query = "MATCH (u:User) WHERE u.id = $userid\n" \
                "MATCH (p:Post) WHERE p.id = $postid\n"\
                "CREATE (u)-[r:comment_at {id: $cmtid, content: $content, time: $time}]->(p) \n"\
                "set p.commentsCount = p.commentsCount+1 "\
                "return r.id as id, r.content as content, r.time as time, u.fullname as fullname, u.profileImageUrl as avata "

        try:
            result = session.run(query, {
                    "userid": userid,
                    "postid": postid,
                    "cmtid": id,
                    "content": comment.content,
                    "time": time
            })
            return result.data()
        except Exception as e:
            print(e)
            return False
        
def findAllCmt(postid):
    neo4j = Neo4jConnector()
    with neo4j.get_session() as session:
        query = "Match (p:Post {id: $postid}) "\
                "Match (u:User) "\
                "Match (u) -[r:comment_at]->(p) "\
                "return r.id as id, r.content as content, r.time as time, u.fullname as fullname, u.profileImageUrl as avata "\
                "ORDER BY r.time DESC"
        try:
            result = session.run(query, postid = postid)
            return result.data()
        except Exception as e:
            print(e)

def findSavePost(page, userid):
    neo4j = Neo4jConnector()
    skip = page*PAGESIZE
    with neo4j.get_session() as session:
        query = "Match (u1:User {id: $id}) "\
                "Match (u1) -[s:save_at]-> (p:Post) "\
                "Match (u2) -[up:UPLOADS]->(p) "\
                "OPTIONAL MATCH (u1)-[r:like_at]->(p) " \
                "RETURN p.id as id, p.imageUrl as imageUrl, p.text as text, p.time as time, p.likesCount as likesCount, p.commentsCount as commentsCount, "\
                "CASE WHEN r IS NULL THEN FALSE ELSE TRUE END AS liked, u2.fullname as fullname, u2.profileImageUrl as avata  "\
                "ORDER BY p.time DESC skip $skip  limit $pagesize"
        try:
            result = session.run(query,id = userid,skip=skip, pagesize = PAGESIZE)
            return result.data()
        except Exception as e:
            print(e)
    
def findMyPost(page, id):
    neo4j = Neo4jConnector()
    skip = page*PAGESIZE
    with neo4j.get_session() as session:
        query = "Match (u1:User {id: $id}) "\
                "Match (u1) -[up:UPLOADS]->(p:Post) "\
                "OPTIONAL MATCH (u1)-[r:like_at]->(p) "\
                "RETURN p.id as id, p.imageUrl as imageUrl, p.text as text, p.time as time, p.likesCount as likesCount, p.commentsCount as commentsCount, "\
                "CASE WHEN r IS NULL THEN FALSE ELSE TRUE END AS liked, u1.fullname as fullname, u1.profileImageUrl as avata "\
                "ORDER BY p.time DESC skip $skip  limit $pagesize"
        try:
            result = session.run(query,id = id,skip=skip, pagesize = PAGESIZE)
            return result.data()
        except Exception as e:
            print(e)



