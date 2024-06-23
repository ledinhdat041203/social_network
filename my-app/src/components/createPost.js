import { useState, useContext } from "react";
import { toast } from "react-toastify";
import React from "react";
import { uploadImageToStorage } from "../services/firebase_connect";
import { createPostApi, editPostAPI } from "../services/userService";
import logo from "../assets/images/Logo1.png";
import { previewFile } from "../services/layout";
import "../styles/style_home.css";
import PostContext from "../store/PostContext";
import {
  setTextPost,
  setImgPost,
  setOpenPopup,
  setEditPost,
  updatePost as updatePostReducer,
} from "../store/actions";
import ListPostContext from "../store/ListPostContext";

const CreatePost = ({ user }) => {
  const [currentPost, dispatch] = useContext(PostContext);
  const [listsPosts, listspostsDispatch] = useContext(ListPostContext);

  const imgpost = currentPost.imgpost;
  const textpost = currentPost.textpost;
  const isEdit = currentPost.isEdit;
  const id = currentPost.id;

  const handleFileUpload = (e) => {
    const fileimg = e.target.files[0];
    uploadImageToStorage(fileimg)
      .then((imageUrl) => {
        dispatch(setImgPost(imageUrl));
        previewFile(imageUrl);
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
        dispatch(setTextPost(""));
        dispatch(setOpenPopup(false));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "posted failed!");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };
  const updatePost = (newpost) => {
    listspostsDispatch(updatePostReducer(newpost));
  };
  const handleEditPost = async () => {
    if (textpost === "" && imgpost === "") return;
    try {
      const res = await editPostAPI(id, textpost, imgpost);
      if (res && res.data && res.data.status === 200) {
        dispatch(setTextPost(""));
        dispatch(setImgPost(""));
        dispatch(setEditPost(false));
        dispatch(setOpenPopup(false));
        updatePost(res.data.data[0]);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "editted failed!");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };
  const handleClickPost = () => {
    if (!isEdit) handlePost();
    else handleEditPost();
  };

  const closePopup = () => {
    dispatch(setOpenPopup(false));
  };
  return (
    <div className="popup">
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
              method="POST"
              className="newpost"
              encType="multipart/form-data"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <textarea
                name="text"
                autoFocus
                placeholder="What's happening?"
                rows="5"
                id="post-text"
                value={textpost}
                onChange={(event) => {
                  dispatch(setTextPost(event.target.value));
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
                    onClick={closePopup}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success float-right submit-btn"
                    onClick={handleClickPost}
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
  );
};

export default CreatePost;
