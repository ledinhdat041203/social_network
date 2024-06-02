import React, { useEffect, useState } from "react";
import { followsApi } from "../services/userService";
import { toast } from "react-toastify";

const Suggestion_user = ({ id, fullname, avata }) => {
  const [followed, setFollowed] = useState(false);
  const follow_user = async () => {
    const res = followsApi(id);
    if (res && (await res).data.status === 200) {
      toast.success((await res).data.message);
      setFollowed(true);
    }
  };

  return (
    <>
      {!followed ? (
        <div className="suggestion-user">
          <div>
            <a
              href="{% url 'profile' suggestion.username %}"
              onClick={(e) => e.preventDefault()}
            >
              <div
                className="small-profilepic"
                style={{ backgroundImage: `url(${avata})` }}
              ></div>
            </a>
          </div>
          <div className="user-details">
            <a
              href="{% url 'profile' suggestion.username %}"
              onClick={(e) => e.preventDefault()}
            >
              <div id="user-name">
                <strong>{fullname}</strong>
              </div>
              {/* <div className="grey">ten</div> */}
            </a>
          </div>
          <div>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={follow_user}
            >
              Follow
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Suggestion_user;
