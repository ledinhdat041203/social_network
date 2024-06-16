import "../styles/style_Newsfeed.css";
import React, { useEffect, useRef, useState } from "react";
import Post from "./post";
import { findAllPostPageApi } from "../services/userService";
import { UserContext } from "../store/UserContext";
import { useContext } from "react";

const Newsfeed = () => {
  const [listpost, setListpost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isfistLoading, setIsfistloading] = useState(false);
  const [title, setTitle] = useState("All Posts");

  const currentPage = useRef(0);
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log("find page: ", currentPage.current);
      const res = await findAllPostPageApi(currentPage.current);
      if (res && res.data.status === 200 && Array.isArray(res?.data?.data)) {
        setListpost((prev) => [...prev, ...res?.data?.data]);
        currentPage.current += 1;
        setIsLoading(false);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10 &&
      !isLoading
    ) {
      // setIsLoading(true);
      fetchData();
      console.log("load");
    }
  };
  useEffect(() => {
    const loadFirstPage = async () => {
      const res = await findAllPostPageApi(0);
      if (Array.isArray(res?.data?.data)) {
        setListpost(res?.data?.data);
        currentPage.current += 1;
      }
    };
    if (!user || !user.auth) return;
    setIsfistloading(true);
    loadFirstPage();
    setIsfistloading(false);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("remove");
    };
  }, [user]);

  // useEffect(() => {
  //   console.log("useEffect:", isLoading);
  //   if (isLoading) {
  //     fetchData();
  //   }
  // }, [isLoading]);

  return (
    <>
      <div className="main-div">
        <div className="left-div">
          <nav className="head heading">{title}</nav>
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
                {(isLoading || isfistLoading) && (
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
      </div>
    </>
  );
};

export default Newsfeed;
