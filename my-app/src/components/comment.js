import React from "react";
const Comment = ({ id, content, time, fullname, avata }) => {
  return (
    <>
      <div>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <div
            class="small-profilepic"
            style={{ backgroundImage: `url(${avata})` }}
          ></div>
        </a>
      </div>
      <div style={{ flex: "1" }}>
        <div class="comment-text-div">
          <div class="comment-user">
            <a href="#" onClick={(e) => e.preventDefault()}>
              {fullname}
            </a>
          </div>
          {content}
        </div>
      </div>
    </>
  );
};

export default Comment;
