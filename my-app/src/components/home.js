import React, { useEffect, useState } from "react";
import logo from "../assets/images/Logo1.png";
import "../styles/style_home.css";
import { UserContext } from "../store/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Newsfeed from "./newsfeed";
import SuggestionUser from "./suggestion_user";
import { suggestionUserApi } from "../services/userService";
import Following from "./following";
import Savepost from "./savepost";
import Profile from "./profile";
import CreatePost from "./createPost";
import PostContext from "../store/PostContext";
import { setOpenPopup } from "../store/actions";

const Home = () => {
  const { user, logout } = useContext(UserContext);
  const [listsugges, setListsugges] = useState([]);
  const [currentPage, setCurrenPage] = useState(1);
  const [currentPost, dispatch] = useContext(PostContext);
  const openpopup = currentPost.openPopup;
  const navigate = useNavigate();

  const handdelClickCreatePost = () => {
    dispatch(setOpenPopup(true));
  };

  const closePopup = () => {
    dispatch(setOpenPopup(false));
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

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {openpopup && <CreatePost user={user} />}
      <div className="body" data-page="{{page}}">
        <div className="sidenav">
          <a
            href="#"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              setCurrenPage(1);
              goToTop();
            }}
          >
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
              <button
                id="popup-btn"
                className="btn btn-success new-post-btn"
                onClick={
                  user && user.auth
                    ? handdelClickCreatePost
                    : () => navigate("/")
                }
              >
                Create Post
              </button>
            </div>
            <div style={{ position: "absolute", bottom: "10px" }}>
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
              <input
                type="hidden"
                id="user_is_authenticated"
                value="True"
                data-username="{{user.username}}"
              />
              <input type="hidden" id="user_is_authenticated" value="False" />
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
                    return <SuggestionUser key={sugges.id} {...sugges} />;
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
      ) : currentPage === 2 ? (
        <Following />
      ) : currentPage === 3 ? (
        <Savepost />
      ) : (
        <Profile user_id={user.id} />
      )}
    </>
  );
};

export default Home;
