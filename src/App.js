import "./App.css";
import { useEffect } from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./SharedLayout";
import SinglePost from "./SinglePost";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import NotFound from "./NotFound";
import useAxiosGet from "./hooks/useAxiosGet";
import { useStoreActions, useStoreState } from "easy-peasy";

function App() {
  const posts = useStoreState((state) => state.posts);
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const searchPosts = useStoreState((state) => state.searchPosts);
  const arePostsLoading = useStoreState((state) => state.arePostsLoading);
  const setArePostsLoading = useStoreActions(
    (actions) => actions.setArePostsLoading
  );
  const setPostsLoadingError = useStoreActions(
    (actions) => actions.setPostsLoadingError
  );

  const {
    data,
    isLoading: isDataLoading,
    axiosGetError,
  } = useAxiosGet(process.env.REACT_APP_API_URL);

  useEffect(() => {
    if (axiosGetError !== "") {
      setPosts([]);
      setArePostsLoading(false);
      setPostsLoadingError(axiosGetError);
    } else if (!isDataLoading) {
      setPosts(data.data);
      setArePostsLoading(false);
      setPostsLoadingError("");
    }
    const cleanup = () => {
      setPosts([]);
      setArePostsLoading(true);
      setPostsLoadingError("");
    };
    return cleanup;
  }, [
    isDataLoading,
    axiosGetError,
    data,
    setPosts,
    setArePostsLoading,
    setPostsLoadingError,
  ]);

  // console.log(process.env.REACT_APP_API_URL);

  const displayPosts =
    searchPosts.trim().length === 0
      ? [...posts]
      : posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(searchPosts.toLowerCase()) ||
            post.body.toLowerCase().includes(searchPosts.toLowerCase())
          );
        });
  displayPosts.reverse();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <Home
                displayPosts={displayPosts}
                arePostsLoading={arePostsLoading}
                axiosGetError={axiosGetError}
              />
            }
          />
          <Route path="posts/:id" element={<SinglePost />} />
          <Route path="newpost" element={<NewPost />}></Route>
          <Route path="editpost/:id" element={<EditPost />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
