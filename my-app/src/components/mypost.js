import "../styles/style_Newsfeed.css";
import React, { useEffect, useRef, useState } from "react";
import Post from "./post";
import { findMyPostApi } from "../services/userService";
import { UserContext } from "../store/UserContext";
import { useContext } from "react";
import { useStateListPost } from "../store/ListPostContext";
import { addPostToListPost, setTitle } from "../store/actions";
const Myposts = () => {
  const isfistLoading = useRef(true);
  const [currentTitle, listpost, listPostDispatch] = useStateListPost(
    (state) => state.myPosts
  );

  const currentPage = useRef(Math.floor(listpost.length / 4));
  const { user } = useContext(UserContext);
  const isApiBeingCalled = useRef(false);

  const fetchData = async () => {
    if (!isApiBeingCalled.current && !isfistLoading.current) {
      try {
        isApiBeingCalled.current = true;
        console.log("find page: ", currentPage.current);
        const res = await findMyPostApi(currentPage.current);
        if (res && res.data.status === 200 && Array.isArray(res?.data?.data)) {
          listPostDispatch(addPostToListPost("myPosts", res?.data?.data));
          currentPage.current += 1;
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isApiBeingCalled.current = false;
      }
    }
  };
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10 &&
      !isApiBeingCalled.current
    ) {
      window.scrollTo({
        top: document.body.scrollHeight - 20,
        behavior: "smooth",
      });
      fetchData();
      console.log("load");
    }
  };
  useEffect(() => {
    if (!user || !user.auth) return;
    const loadFirstPage = async () => {
      const res = await findMyPostApi(0);
      if (Array.isArray(res?.data?.data)) {
        listPostDispatch(addPostToListPost("myPosts", res?.data?.data));
        currentPage.current += 1;
        isfistLoading.current = false;
      }
    };
    loadFirstPage();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("remove");
    };
  }, [user]);
  useEffect(() => {
    listPostDispatch(setTitle("PROFILE"));
  }, []);
  return (
    <>
      <div className="left-div">
        <div className="left-div-content">
          <div className="posts-view">
            <div className="main-div-content">
              {listpost.map((post, index) => {
                return <Post key={post.id} {...post} />;
              })}
              {listpost.length === 0 && (
                <center>
                  <br />
                  <strong style={{ fontSize: "1.2em" }}>
                    Sorry! No one have posted anything yet.
                  </strong>
                  <div className="grey" style={{ fontSize: "0.9em" }}>
                    When they do, their posts will show up here.
                  </div>
                </center>
              )}
              {(isApiBeingCalled || isfistLoading) && (
                <center>
                  <i
                    className="fa-solid fa-sync fa-spin"
                    style={{ color: "green", fontSize: "1em" }}
                  ></i>
                </center>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myposts;
