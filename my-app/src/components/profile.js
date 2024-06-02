import "../styles/style_Newsfeed.css";
import React, { useEffect, useState } from "react";
import { profileApi } from "../services/userService";
import Myposts from "./mypost";
import EditProfile from "./editprofile";

const Profile = ({ user_id }) => {
  const [fullname, setFullname] = useState("");
  const [avata, setAvata] = useState("");
  const [address, setAddress] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [phone, setPhone] = useState("");
  const [isEdit, setIsEdit] = useState(0);

  const handleChildSignal = () => {
    setIsEdit(0);
    fetchData();
  };
  const fetchData = async () => {
    try {
      const res = await profileApi(user_id);
      if (res && res.data.status === 200) {
        const data = res.data.data[0];
        console.log("data: ", data);
        setFullname(data.fullname);
        setAddress(data.city + " - " + data.country);
        setAvata(data.avata);
        setFollowers(data.followers);
        setFollowing(data.following);
        setPhone(data.phone);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    console.log("id", user_id);

    fetchData();
  }, []);
  const editProfile = () => {
    setIsEdit(1);
  };

  return !isEdit ? (
    <>
      <div className="main-div">
        <div className="profile-view">
          <div
            className="cover-image"
            style={{ backgroundImage: `url(${avata})` }}
          ></div>
          <div
            className="profile-image"
            style={{ backgroundImage: `url(${avata})` }}
          ></div>
          <div className="profile-details">
            <button
              class="btn btn-outline-success float-right"
              id="edit-profile-btn"
              onClick={editProfile}
            >
              Edit Profile
            </button>
            <div className="details-data">
              <h5>{fullname}</h5>
              <div className="grey">{address}</div>
              <div className="bio"></div>
              <div className="grey" style={{ padding: "8px 0px" }}>
                <svg
                  className="w-[22px] h-[22px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                </svg>
                &nbsp;{phone}
              </div>
              <div>
                <a href="#">
                  <strong id="following__count">{following}</strong>
                  &nbsp;<span className="grey">Following</span>
                </a>
                &ensp;
                <a href="#">
                  <strong id="follower__count">{followers}</strong>
                  &nbsp;<span className="grey">Followers</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Myposts />
      </div>
    </>
  ) : (
    <div className="main-div_edit">
      <EditProfile user_id={user_id} onSignal={handleChildSignal} />
    </div>
  );
};
export default Profile;
