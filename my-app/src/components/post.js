import React, { useState } from "react";
import logo from "../assets/images/Logo1.png";
import { likePostApi } from "../services/userService";
import Comment from "./comment";
import { commentApi } from "../services/userService";
import { loadAllCmtApi } from "../services/userService";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { savepostApi } from "../services/userService";
import { toast } from "react-toastify";

const Post = ({
  id,
  imageUrl,
  liked,
  likesCount,
  commentsCount,
  text,
  time,
  fullname,
  avata,
}) => {
  const [isLiked, setIsliked] = useState(liked);
  const [likeCountState, SetLikeCountState] = useState(likesCount);
  const [showcmt, SetShowcmt] = useState(false);
  const [comment, setComment] = useState("");
  const [firstloadcmt, setFirstloadcmt] = useState(false);
  const [listcmt, setListcmt] = useState([]);
  const [cmtcount, setCmtcount] = useState(commentsCount);
  const { user } = useContext(UserContext);
  const [issaved, setIssaved] = useState(false);
  const likeClick = async () => {
    setIsliked((prev) => !prev);
    if (!isLiked) SetLikeCountState(likeCountState + 1);
    else SetLikeCountState(likeCountState - 1);
    const res = await likePostApi(id);
  };
  const show_comment = async () => {
    SetShowcmt((prev) => !prev);
    if (!firstloadcmt) {
      const res = await loadAllCmtApi(id);
      if (res && res.data.status === 200) {
        setListcmt(res.data.data);
      }
      setFirstloadcmt(true);
    }
  };
  const savepost = async () => {
    setIssaved(!issaved);
    const res = savepostApi(id);
    if (res && (await res).data.status === 200) {
      toast.success((await res).data.message);
    }
  };

  const write_comment = async () => {
    setCmtcount(cmtcount + 1);
    const res = await commentApi(id, comment);
    if (res && res.data.status === 200) {
      const data = res.data.data[0];
      console.log("listcmt 1", listcmt);
      console.log(res.data);
      setListcmt((prevListcmt) => [res.data, ...prevListcmt]);
      console.log("listcmt 2", listcmt);
    }
    setComment("");
  };

  return (
    <>
      <div className="post" data-post_id={id}>
        <div>
          <div>
            <a
              href="{% url 'profile' post.creater.username %}"
              onClick={(e) => e.preventDefault()}
            >
              <div
                className="small-profilepic"
                style={{
                  backgroundImage: `url(${avata})`,
                }}
              ></div>
            </a>
          </div>
          <div style={{ flex: 1 }}>
            <div className="post-user">
              <div>
                <a
                  href="{% url 'profile' post.creater.username %}"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>
                    <strong>{fullname}</strong>
                  </span>
                </a>
                &nbsp;&nbsp;&nbsp;
                <span className="grey">{time}</span>
              </div>
              <div
                className="dropdown"
                style={{
                  height: "1em",
                  marginTop: "-3px",
                  marginRight: "-3px",
                }}
              >
                <button
                  className="icon-btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  // onFocus="drop_down(event)"
                  // onBlur="remove_drop_down(event)"
                  // data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 -2 16 16"
                    className="bi bi-chevron-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {/* {% if post.creater == user %} */}
                  <button className="dropdown-item" onClick="edit_post(this)">
                    <svg
                      width="1.1em"
                      height="1.1em"
                      viewBox="0 0 16 16"
                      className="bi bi-pencil"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
                      />
                    </svg>
                    &nbsp;Edit post
                  </button>
                </div>
              </div>
            </div>

            <div className="post-content">{text}</div>
            {imageUrl && (
              <div
                className="post-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
            )}

            <div className="post-actions">
              {isLiked ? (
                <>
                  <div
                    className="like"
                    onClick={likeClick}
                    data-post_id="{{post.id}}"
                  >
                    <div className="svg-span">
                      <svg
                        width="1.1em"
                        height="1.1em"
                        viewBox="0 -1 16 16"
                        className="bi bi-heart-fill"
                        fill="#e0245e"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    </div>
                    &nbsp;
                    <div style={{ padding: "7px 0px" }} className="likes_count">
                      {likeCountState}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="like"
                    onClick={likeClick}
                    data-post_id="{{post.id}}"
                  >
                    <div className="svg-span">
                      <svg
                        className="liked bi bi-heart"
                        width="1.1em"
                        height="1.1em"
                        viewBox="0 -1 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                        />
                      </svg>
                    </div>
                    &nbsp;
                    <div style={{ padding: "7px 0px" }} className="likes_count">
                      {likeCountState}
                    </div>
                  </div>
                </>
              )}
              {/* comment */}

              <div className="comment" onClick={show_comment}>
                <div className="svg-span">
                  <svg
                    width="1.1em"
                    height="1.1em"
                    viewBox="0 0 16 16"
                    className="bi bi-chat"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                    />
                  </svg>
                </div>
                &nbsp;
                <div style={{ padding: "7px 0px" }} className="cmt-count">
                  {cmtcount}
                </div>
              </div>
              {/* save */}
              {issaved ? (
                <>
                  <div className="save" onClick={savepost}>
                    <div className="svg-span">
                      <svg
                        width="1.1em"
                        height="1.1em"
                        viewBox="0.5 0 15 15"
                        className="bi bi-bookmark-fill"
                        fill="#17bf63"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="save"
                    onClick={savepost}
                    data-post_id="{{post.id}}"
                  >
                    <div className="svg-span">
                      <svg
                        width="1.1em"
                        height="1.1em"
                        viewBox="0.5 0 15 15"
                        className="bi bi-bookmark"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {showcmt && (
          <div
            className="comment-div"
            style={{ display: "block" }}
            data-post_id="{{post.id}}"
          >
            <div className="spinner-div">
              <img src={logo} id="spinner" height="65px" alt="" />
            </div>
            {/* {% if user.is_authenticated %} */}
            <div className="comment-div-data" style={{ display: "block" }}>
              <div className="head-comment-input">
                <div>
                  <a
                    href="{% url 'profile' user.username %}"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div
                      className="small-profilepic"
                      style={{ backgroundImage: `url(${user.avata})` }}
                    ></div>
                  </a>
                </div>
                <div style={{ flex: "1" }}>
                  <div className="comment-input-div">
                    <form
                      className="comment-form"
                      onSubmit={(event) => {
                        event.preventDefault();
                        write_comment();
                      }}
                    >
                      <input
                        type="text"
                        name="comment"
                        className="comment-input"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(event) => {
                          setComment(event.target.value);
                        }}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div
                className="comment-comments"
                style={{
                  overflow: "scroll",
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "16em",
                }}
              >
                {listcmt.map((cmt, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        display: "flex",
                        padding: "4px",
                      }}
                    >
                      <Comment key={cmt.id} {...cmt} />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* {% endif %} */}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
