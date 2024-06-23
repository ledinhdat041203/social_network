import "../styles/style_Newsfeed.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Post from "./post";
import { findAllPostPageApi } from "../services/userService";
import { UserContext } from "../store/UserContext";
import { useContext } from "react";
import { useStateListPost } from "../store/ListPostContext";
import { addPostToListPost, setTitle } from "../store/actions";

const Newsfeed = () => {
  const isfistLoading = useRef(true);

  const [currentTitle, listpost, listPostDispatch] = useStateListPost(
    (state) => state.allPosts
  );
  const currentPage = useRef(Math.floor(listpost.length / 4));
  const { user } = useContext(UserContext);
  const isApiBeingCalled = useRef(false);

  const fetchData = useCallback(async () => {
    if (!isApiBeingCalled.current && !isfistLoading.current) {
      try {
        console.log("load data");
        isApiBeingCalled.current = true;
        console.log("find page: ", currentPage.current);
        const res = await findAllPostPageApi(currentPage.current);
        if (res && res.data.status === 200 && Array.isArray(res?.data?.data)) {
          listPostDispatch(addPostToListPost("allPosts", res?.data?.data));
          currentPage.current += 1;
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isApiBeingCalled.current = false;
      }
    } else {
      console.log("isfistLoading::", isfistLoading);
    }
  }, [currentTitle, listPostDispatch, listpost]);
  const handleScroll = useCallback(() => {
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
  }, [currentTitle, listPostDispatch]);
  useEffect(() => {
    if (!user || !user.auth) return;
    const loadFirstPage = async () => {
      if (currentPage.current <= 0) {
        currentPage.current = 0;
        const res = await findAllPostPageApi(0);
        if (Array.isArray(res?.data?.data)) {
          listPostDispatch(addPostToListPost("allPosts", res?.data?.data));
          currentPage.current += 1;
          isfistLoading.current = false;
          console.log("isfistLoading_effec::", isfistLoading);
        }
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
    listPostDispatch(setTitle("ALL POSTS"));
    if (currentPage.current > 0) isfistLoading.current = false;
  }, []);
  return (
    <>
      <div className="main-div">
        <div className="left-div">
          <nav className="head heading">{currentTitle}</nav>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "60px",
                    }}
                  >
                    <i
                      className="fa-solid fa-sync fa-spin"
                      style={{ color: "green", fontSize: "2em" }}
                    ></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsfeed;
