import { createContext } from "react";
import { useReducer } from "react";
import {
  SET_OPEN_POPUP,
  SET_TEXT_POST,
  SET_IMG_POST,
  SET_ID_POST,
  SET_ISEDIT_POST,
} from "./constants";

const initPost = {
  id: "",
  textpost: "",
  imgpost: "",
  isEdit: false,
  openPopup: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_OPEN_POPUP:
      return {
        ...state,
        openPopup: action.payload,
      };
    case SET_TEXT_POST:
      return {
        ...state,
        textpost: action.payload,
      };
    case SET_IMG_POST:
      return {
        ...state,
        imgpost: action.payload,
      };
    case SET_ID_POST:
      return {
        ...state,
        id: action.payload,
      };
    case SET_ISEDIT_POST:
      return {
        ...state,
        isEdit: action.payload,
      };
    default:
      throw new Error("Invalid Action");
  }
};

const PostContext = createContext();
const PostProvider = ({ children }) => {
  const [currentPost, dispatch] = useReducer(reducer, initPost);

  return (
    <PostContext.Provider value={[currentPost, dispatch]}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContext;
export { PostProvider };
