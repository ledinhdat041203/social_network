import React, { useEffect, useState } from "react";
import logo from "../assets/images/Logo1.png";
import "../styles/style_home.css";
import { createpost, remove_popup } from "../services/layout";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { uploadImageToStorage } from "../services/firebase_connect";
import { createPostApi } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Newsfeed from "./newsfeed";
import Suggestion_user from "./suggestion_user";
import { suggestionUserApi } from "../services/userService";
import Following from "./following";
import Savepost from "./savepost";
import Profile from "./profile";

const Home = () => {
  const [imgpost, setImgpost] = useState("");
  const [textpost, setTextpost] = useState("");
  const { user, logout } = useContext(UserContext);
  const [isLoadinfo, setIsloafinfo] = useState(true);
  const [listsugges, setListsugges] = useState([]);
  const [currentPage, setCurrenPage] = useState(1);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const fileimg = e.target.files[0];
    uploadImageToStorage(fileimg)
      .then((imageUrl) => {
        setImgpost(imageUrl);
      })
      .catch((error) => {
        console.error("Error handling file change:", error);
      });
  };

  const handlePost = async () => {
    if (textpost === "" && imgpost === "") return;

    try {
      const res = await createPostApi(textpost, imgpost);
      if (res && res.data && res.data.status === 200) {
        setTextpost("");
        remove_popup();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "posted failed!");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const loadSuggestinUser = async () => {
    const res = await suggestionUserApi();
    if (res && res.data.status === 200) {
      setListsugges(res.data.data);
    }
  };
  useEffect(() => {
    if (user && user.auth) {
      loadSuggestinUser();
    }
  }, [user]);
  useEffect(() => {
    console.log("currentPage", currentPage);
  }, [currentPage]);
  return (
    <>
      <div className="popup">
        <div className="small-popup">
          <div style={{ marginBottom: "10px", fontSize: "1.1em" }}>
            <strong>Delete Post?</strong>
          </div>
          <div
            className="grey"
            style={{ fontSize: ".85em", marginBottom: "15px" }}
          >
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from Network search
            results.
          </div>
          <div style={{ padding: "0px 5%" }}>
            <button
              className="btn btn-light float-left"
              // onClick="remove_popup()"
            >
              Cancel
            </button>
            <button className="btn btn-danger float-right" id="delete_post_btn">
              Delete
            </button>
          </div>
        </div>
        <div className="large-popup">
          <div>
            <div>
              <div
                className="small-profilepic"
                style={{ backgroundImage: `url(${user.avata})` }}
              ></div>
            </div>
            <div className="form-area">
              <form
                // action="/"
                method="POST"
                className="newpost"
                encType="multipart/form-data"
              >
                <textarea
                  name="text"
                  autoFocus
                  placeholder="What's happening?"
                  rows="5"
                  id="post-text"
                  value={textpost}
                  onChange={(event) => {
                    setTextpost(event.target.value);
                  }}
                ></textarea>
                <input type="hidden" id="img-change" value="false"></input>
                <div id="img-div">
                  <button id="del-img" type="button">
                    <svg
                      width="1.55em"
                      height="1.55em"
                      viewBox="0 0 24 24"
                      className="r-jwli3a r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"
                      fill="#fff"
                    >
                      <g>
                        <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                      </g>
                    </svg>
                  </button>
                  <img src={logo} id="spinner" height="70px" alt="" />
                </div>
                <hr />
                <div className="form-action-btns">
                  <div>
                    <input
                      name="picture"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      type="file"
                      style={{ display: "none" }}
                      id="insert-img"
                      data-focusable="true"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="insert-img"
                      className="icon-btn form-icon-btn"
                    >
                      <svg
                        width="1.1em"
                        height="1.4em"
                        viewBox="0 0 16 16"
                        className="bi bi-image"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "2px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.002 2h-12a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12z"
                        />
                        <path d="M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z" />
                        <path
                          fillRule="evenodd"
                          d="M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                        />
                      </svg>
                      <span style={{ fontSize: "0.95em" }}>&nbsp;Photo</span>
                    </label>
                  </div>
                  <div>
                    <button
                      className="btn btn-light float-right cancel-post"
                      type="button"
                      onClick={remove_popup}
                    >
                      Cancel
                    </button>
                    <button
                      // type="submit"
                      type="button"
                      className="btn btn-success float-right submit-btn"
                      onClick={handlePost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="login-popup">
          <div className="icon-btn">
            <svg
              width="1.6em"
              height="1.6em"
              viewBox="0 0 16 16"
              className="bi bi-x"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
          </div>
          <center>
            <div className="icon-div">
              <svg
                width="2.5em"
                height="2.5em"
                viewBox="0 0 16 16"
                className="bi bi-heart-fill"
                fill="#e0245e"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </div>
            <div className="main_text-div">
              <h2>tesst</h2>
              <div className="grey">
                Join Network today to connect with people you know.
              </div>
            </div>
            <div className="btn-div">
              <button
                className="btn btn-success btn-block"
                // onClick="goto_register()"
              >
                Sign Up
              </button>
              <button
                className="btn btn-outline-success btn-block"
                // onClick="goto_login()"
              >
                Login
              </button>
            </div>
          </center>
        </div>
      </div>
      <div className="body" data-page="{{page}}">
        <div className="sidenav">
          <a href="{% url 'index' %}" className="navbar-brand">
            <img src={logo} height="31px" alt="" />
          </a>
          <div style={{ height: "100%" }}>
            <div>
              <div>
                <ul>
                  <li
                    className="nav-item"
                    id="all_posts"
                    onClick={() => {
                      setCurrenPage(1);
                    }}
                  >
                    <a
                      href="{% url 'index' %}"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link"
                    >
                      <div>
                        <svg
                          width="1.5em"
                          height="1.5em"
                          viewBox="0 0 16 16"
                          className="bi bi-card-heading"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
                          />
                          <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
                        </svg>
                        &nbsp;&nbsp;All Posts
                      </div>
                    </a>
                  </li>
                  {user && user.auth ? (
                    <>
                      <li
                        className="nav-item"
                        id="following"
                        onClick={() => {
                          setCurrenPage(2);
                        }}
                      >
                        <a
                          href="{% url 'following' %}"
                          onClick={(e) => e.preventDefault()}
                          className="nav-link"
                        >
                          <div>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              className="bi bi-people"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zm7.973.056v-.002.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                              />
                            </svg>
                            &nbsp;&nbsp;Following
                          </div>
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        id="saved"
                        onClick={() => {
                          setCurrenPage(3);
                        }}
                      >
                        <a
                          href="{% url 'saved' %}"
                          onClick={(e) => e.preventDefault()}
                          className="nav-link"
                        >
                          <div>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              className="bi bi-bookmark"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"
                              />
                            </svg>
                            &nbsp;&nbsp;Saved
                          </div>
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        id="profile"
                        onClick={() => {
                          setCurrenPage(4);
                        }}
                      >
                        <a
                          href="#"
                          className="nav-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              className="bi bi-person"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                              />
                            </svg>
                            &nbsp;&nbsp;Profile
                          </div>
                        </a>
                      </li>
                      <li className="nav-item" id="logout">
                        <a href="#" className="nav-link" onClick={handleLogout}>
                          <div>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              className="bi bi-door-open"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"
                              />
                              <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z" />
                            </svg>
                            &nbsp;&nbsp;Log Out
                          </div>
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item" id="login">
                        <a href="/login" className="nav-link">
                          <div>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              className="bi bi-door-closed"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2zm1 0v13h8V2H4z"
                              />
                              <path d="M7 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              <path
                                fillRule="evenodd"
                                d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                              />
                            </svg>
                            &nbsp;&nbsp;Log In
                          </div>
                        </a>
                      </li>
                      <li className="nav-item" id="Signup">
                        <a href="/register" className="nav-link">
                          <div>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              className="bi bi-person-plus"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"
                              />
                            </svg>
                            &nbsp;&nbsp;Sign Up
                          </div>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              {/* {% if user.is_authenticated %} */}
              <button
                id="popup-btn"
                className="btn btn-success new-post-btn"
                onClick={user && user.auth ? createpost : () => navigate("/")}
              >
                Create Post
              </button>
              {/* {% endif %} */}
            </div>
            <div style={{ position: "absolute", bottom: "10px" }}>
              {/* {% if user.is_authenticated %}     */}
              <li className="nav-item sidenav-user">
                <a
                  href="{% url 'profile' user.username %}"
                  onClick={(e) => e.preventDefault()}
                  className="nav-link"
                >
                  <div className="user_account">
                    <div
                      className="small-profilepic"
                      style={{
                        float: "left",
                        backgroundImage: `url(${user.avata})`,
                      }}
                    ></div>
                    <div style={{ height: "2.7vw", margin: "auto" }}>
                      <div style={{ marginTop: "4px" }}>
                        <strong>{user.fullname}</strong>
                        {console.log(user)}
                      </div>
                      <div className="grey" style={{ marginTop: "4px" }}>
                        {user.fullname}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              {/* {% endif %}
                        {% if user.is_authenticated %} */}
              <input
                type="hidden"
                id="user_is_authenticated"
                value="True"
                data-username="{{user.username}}"
              />
              {/* {% else %} */}
              <input type="hidden" id="user_is_authenticated" value="False" />
              {/* {% endif %} */}
            </div>
          </div>
        </div>

        {/* {% block body %}
            {% endblock %} */}

        <div className="right-div">
          <nav className="head">
            <form action="#">
              <div className="search-div">
                <div>
                  <svg
                    width="1em"
                    height="1.6em"
                    viewBox="0 0 16 6"
                    className="bi bi-search"
                    fill="#6d7e8c"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="query"
                  id="search-box"
                  placeholder="Search Network"
                />
              </div>
            </form>
          </nav>
          <div className="right-div-content">
            <div className="space" style={{ backgroundColor: "white" }}></div>
            <div className="suggestion-box">
              <div className="suggestion-header">You might know</div>
              {listsugges.length !== 0 ? (
                <>
                  {listsugges.map((sugges, index) => {
                    return <Suggestion_user key={sugges.id} {...sugges} />;
                  })}
                  <div
                    style={{
                      textAlign: "center",
                      borderBottom: "0.5px solid #e6ecf0",
                      padding: "10px 15px",
                    }}
                  ></div>
                </>
              ) : (
                <span className="grey" style={{ fontSize: ".9em" }}>
                  No suggestions available.
                </span>
              )}
            </div>
            {user.auth && (
              <>
                <div className="guest-box">
                  {!user && !user.auth && (
                    <center>
                      <div className="guest-header">
                        <h5>New to Network?</h5>
                      </div>
                      <div className="grey guest-content">
                        Sign up now to get connected with people you know.
                      </div>
                      <div className="guest-btn">
                        <button
                          className="btn btn-success btn-block"
                          type="button"
                          // onClick="goto_register()"
                        >
                          Sign Up
                        </button>
                      </div>
                    </center>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {currentPage === 1 ? (
        <Newsfeed />
      ) : currentPage == 2 ? (
        <Following />
      ) : currentPage === 3 ? (
        <Savepost />
      ) : (
        <Profile user_id={user.id} />
      )}
      {/* <Newsfeed /> */}
    </>
  );
};

export default Home;
