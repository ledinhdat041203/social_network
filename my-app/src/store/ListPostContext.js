import { createContext, useContext, useReducer } from "react";
import { ADD_POSTS_TO_LISTPOST, UPDATE_POST, SET_TITLE } from "./constants";
const initListsPost = {
  allPosts: [],
  followingPosts: [],
  savedPosts: [],
  myPosts: [],
  currentTitle: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_POSTS_TO_LISTPOST: {
      const newListPost = [...state[action.currentListPost], ...action.payload];
      const newState = {
        ...state,
        [action.currentListPost]: newListPost,
      };
      console.log("newState:: ", newState);
      return newState;
    }
    case UPDATE_POST: {
      const updatePostInList = (listPost, newPost) => {
        try {
          return listPost.map((post) =>
            post.id === newPost.id
              ? { ...post, imageUrl: newPost.imageUrl, text: newPost.text }
              : post
          );
        } catch {
          return listPost;
        }
      };

      const newPost = action.payload;
      console.log("newpostupdate DISPATCh:: ", newPost);
      const newState = {};
      for (const listName in state) {
        newState[listName] = updatePostInList(state[listName], newPost);
      }

      return newState;
    }
    case SET_TITLE: {
      return {
        ...state,
        currentTitle: action.payload,
      };
    }
    default:
      throw new Error("Invalid Action");
  }
};

const ListPostContext = createContext();

const ListPostProvider = ({ children }) => {
  const [ListsPosts, dispatch] = useReducer(reducer, initListsPost);
  return (
    <ListPostContext.Provider value={[ListsPosts, dispatch]}>
      {children}
    </ListPostContext.Provider>
  );
};

const useStateListPost = (selector) => {
  const [state, dispatch] = useContext(ListPostContext);
  const currentTitle = state.currentTitle;
  return [currentTitle, selector(state), dispatch];
};
export default ListPostContext;
export { ListPostProvider, useStateListPost };
