import React, { useState } from "react";
import logo from "../assets/images/Logo1.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerApi } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { uploadImageToStorage } from "../services/firebase_connect";
import { useEffect } from "react";
import { profileApi } from "../services/userService";
import { editProfileApi } from "../services/userService";

const EditProfile = ({ user_id, onSignal }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmpass, setCfmpass] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadimg, setLoadimg] = useState(false);
  const [imgsuccess, setImgsuccess] = useState(false);
  const [dummyState, setDummyState] = useState(0);

  const [avata, setAvata] = useState("");
  const [coverimg, setCoverimg] = useState("");

  const handleEdit = async () => {
    setLoading(true);
    const fullname = lname + " " + fname;
    if (fullname === " ") {
      toast.error("missing data!");
      setLoading(false);
      return;
    }

    try {
      const res = await editProfileApi(
        fullname,
        mail,
        password,
        city,
        country,
        gender,
        phone,
        avata
      );
      if (res && res.data && res.data.status === 200) {
        toast.success(res.data.message);
        onSignal();
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    setLoadimg(true);
    const file = e.target.files[0];
    uploadImageToStorage(file)
      .then((imageUrl) => {
        setAvata(imageUrl);
        setLoadimg(false);
        setImgsuccess(true);
      })
      .catch((error) => {
        console.error("Error handling file change:", error);
        // Handle error if necessary
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await profileApi(user_id);
        if (res && res.data.status === 200) {
          const data = res.data.data[0];
          console.log("data: ", data);

          const fullNameArray = data.fullname.split(" ");
          setFname(fullNameArray[fullNameArray.length - 1]);
          setLname(fullNameArray[0]);

          setCity(data.city);
          setCountry(data.country);
          setAvata(data.avata);
          setPhone(data.phone);
          setGender(data.gender);
          setBirthday(data.birthday);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="user-box" style={{ marginTop: "6vh" }}>
        <div>
          <center>
            <img src={logo} height="60em" style={{ marginBottom: "2vh" }} />
            <h2>EDIT PROFILE</h2>
            <br />
          </center>
        </div>

        <div className="form-group">
          <div className="form-row align-items-center">
            <div className="col-sm-6 my-1">
              <input
                className="form-control inp fname"
                type="text"
                name="firstname"
                placeholder="First Name *"
                autoComplete="off"
                autoFocus
                value={fname}
                onChange={(event) => {
                  setFname(event.target.value);
                }}
              />
              <span className="star small"></span>
            </div>
            <div className="col-sm-6 my-1">
              <input
                className="form-control inp lname"
                type="text"
                name="lastname"
                placeholder="Last Name *"
                autoComplete="off"
                value={lname}
                onChange={(event) => {
                  setLname(event.target.value);
                }}
              />
              <span className="star small"></span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="form-row align-items-center">
            <div className="col-sm-6 my-1">
              <input
                className="form-control inp city"
                type="text"
                name="city"
                placeholder="City"
                autoComplete="off"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
              <span className="star small"></span>
            </div>
            <div className="col-sm-6 my-1">
              <input
                className="form-control inp country"
                type="text"
                name="country"
                placeholder="Country"
                autoComplete="off"
                value={country}
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-row align-items-center">
            <div className="col-sm-8 my-1">
              <input
                className="form-control inp fname"
                type="date"
                name="birthday"
                placeholder="Birthday *"
                autoComplete="off"
                value={birthday}
                onChange={(event) => {
                  setBirthday(event.target.value);
                }}
              />
              <span className="star small"></span>
            </div>
            <div className="col-sm-4 my-1">
              <input
                className="form-control inp lname"
                type="text"
                name="gender"
                placeholder="gender "
                autoComplete="off"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <input
            className="form-control inp phone"
            type="text"
            name="phone"
            placeholder="Phone"
            autoComplete="off"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <span className="star small"></span>
        </div>

        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              name="profile"
              className="form-control custom-file-input"
              id="profile"
              accept="image/jpeg,image/png,image/webp,image/gif"
              data-focusable="true"
              aria-describedby="inputGroupFileAddon01"
              onChange={handleFileChange}
            />
            {/* {avata && (
              <center>
                <img
                  src={avata}
                  alt="Uploaded"
                  className="img-fluid rounded"
                  style={{ height: "6em" }}
                />
              </center>
            )} */}
            <label className="custom-file-label" htmlFor="profile">
              <span style={{ color: "#6c757d" }}>
                Choose profile picture{" "}
                {loadimg && <i className="fa-solid fa-sync fa-spin"></i>}
                {imgsuccess && (
                  <i
                    className="fa fa-check"
                    aria-hidden="true"
                    style={{ color: "green" }}
                  ></i>
                )}
              </span>{" "}
            </label>

            <span className="star small"></span>
          </div>
        </div>
        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              name="cover"
              className="form-control custom-file-input"
              id="cover"
              accept="image/jpeg,image/png,image/webp,image/gif"
              data-focusable="true"
              aria-describedby="inputGroupFileAddon01"
            />
            <label className="custom-file-label" htmlFor="cover">
              <span style={{ color: "#6c757d" }}>Choose cover picture</span>
            </label>
            <span className="star small"></span>
          </div>
        </div>

        <center>
          <button
            className="btn btn-primary"
            style={{ marginTop: "10px", width: "95%" }}
            onClick={() => handleEdit()}
          >
            SAVE
          </button>
        </center>
        <br />
        <div>
          <center>{loading && <div class="loader"></div>}</center>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default EditProfile;
