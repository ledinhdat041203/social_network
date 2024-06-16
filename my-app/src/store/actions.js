import {
  SET_OPEN_POPUP,
  SET_TEXT_POST,
  SET_IMG_POST,
  SET_ID_POST,
  SET_ISEDIT_POST,
} from "./constants";
export const setOpenPopup = (payload) => ({ type: SET_OPEN_POPUP, payload });

export const setTextPost = (payload) => ({ type: SET_TEXT_POST, payload });

export const setImgPost = (payload) => ({ type: SET_IMG_POST, payload });

export const setIdPost = (payload) => ({ type: SET_ID_POST, payload });

export const setEditPost = (payload) => ({ type: SET_ISEDIT_POST, payload });
