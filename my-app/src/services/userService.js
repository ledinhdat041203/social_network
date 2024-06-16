import axios from "./customize_axios";

const loginApi = (email, password) => {
  return axios.post("/user/login", { email, password });
};

const registerApi = (
  fullname,
  email,
  password,
  city,
  country,
  gender,
  phone,
  profileImageUrl
) => {
  return axios.post("/user/register", {
    fullname,
    email,
    password,
    city,
    country,
    gender,
    phone,
    profileImageUrl,
  });
};

const getInfoUserApi = () => {
  return axios.get("/user/getinfouser");
};
const createPostApi = (text, imageURL) => {
  return axios.post("/post/create-post", { text, imageURL });
};

const findAllPostPageApi = (page) => {
  return axios.get(`/post/newsfeed/${page}`);
};
const likePostApi = (post_id) => {
  return axios.post(`post/like/${post_id}`);
};
const commentApi = (post_id, content) => {
  return axios.post(`/post/create_comment/${post_id}`, { content });
};

const loadAllCmtApi = (post_id) => {
  return axios.get(`/post/loadcomments/${post_id}`);
};
const suggestionUserApi = () => {
  return axios.get("/user/suggestion");
};
const followsApi = (userid) => {
  return axios.post(`/user/follow/${userid}`);
};
const findPostFollowing = (page) => {
  return axios.get(`/post/findPostFollowing/${page}`);
};

const savepostApi = (postid) => {
  return axios.post(`/user/savepost/${postid}`);
};
const findsavepost = (page) => {
  return axios.get(`/post/findsavepost/${page}`);
};
const profileApi = (userid) => {
  return axios.get(`/user/profile/${userid}`);
};

const findMyPostApi = (page) => {
  return axios.get(`/post/findmypost/${page}`);
};

const editProfileApi = (
  fullname,
  email,
  password,
  city,
  country,
  gender,
  phone,
  profileImageUrl
) => {
  return axios.post("/user/editprofile", {
    fullname,
    email,
    password,
    city,
    country,
    gender,
    phone,
    profileImageUrl,
  });
};

const editPostAPI = (id, text, imageURL) => {
  return axios.post("/post/eidtPost", { id, text, imageURL });
};
export {
  loginApi,
  registerApi,
  getInfoUserApi,
  createPostApi,
  findAllPostPageApi,
  likePostApi,
  commentApi,
  loadAllCmtApi,
  suggestionUserApi,
  followsApi,
  findPostFollowing,
  savepostApi,
  findsavepost,
  profileApi,
  findMyPostApi,
  editProfileApi,
  editPostAPI,
};
