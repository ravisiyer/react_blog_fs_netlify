import { createStore, action, computed, thunk } from "easy-peasy";
import axiosAPI from "./api/api";

const store = createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  searchPosts: "",
  setSearchPosts: action((state, payload) => {
    state.searchPosts = payload;
  }),
  arePostsLoading: true,
  setArePostsLoading: action((state, payload) => {
    state.arePostsLoading = payload;
  }),
  postsLoadingError: "",
  setPostsLoadingError: action((state, payload) => {
    state.postsLoadingError = payload;
  }),
  countPosts: computed((state) => state.posts.length),
  deletePost: thunk(async (actions, payload, helpers) => {
    try {
      await axiosAPI.delete(`/${payload}`);
      const posts = helpers.getState().posts;
      const setPosts = actions.setPosts;
      const tmpPosts = posts.filter((post) => post._id.toString() !== payload);
      setPosts(tmpPosts);
    } catch (error) {
      console.log(error);
    }
  }),
});

export default store;
