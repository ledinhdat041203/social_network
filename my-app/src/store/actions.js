import {
  SET_OPEN_POPUP,
  SET_TEXT_POST,
  SET_IMG_POST,
  SET_ID_POST,
  SET_ISEDIT_POST,
  ADD_POSTS_TO_LISTPOST,
  UPDATE_POST,
  SET_TITLE,
} from "./constants";
export const setOpenPopup = (payload) => ({ type: SET_OPEN_POPUP, payload });

export const setTextPost = (payload) => ({ type: SET_TEXT_POST, payload });

export const setImgPost = (payload) => ({ type: SET_IMG_POST, payload });

export const setIdPost = (payload) => ({ type: SET_ID_POST, payload });

export const setEditPost = (payload) => ({ type: SET_ISEDIT_POST, payload });

//ACTION TO LISTS POSTS REDUCER
export const addPostToListPost = (currentListPost, payload) => ({
  type: ADD_POSTS_TO_LISTPOST,
  currentListPost,
  payload,
});

export const updatePost = (payload) => ({
  type: UPDATE_POST,
  payload,
});

export const setTitle = (payload) => ({
  type: SET_TITLE,
  payload,
});
