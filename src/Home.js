import { useRef, useEffect } from "react";
import PostsList from "./PostsList";

const Home = ({ displayPosts, arePostsLoading, axiosGetError }) => {
  const homePageDiv = useRef();
  useEffect(() => {
    // console.log(homePageDiv);
    if (homePageDiv.current !== undefined) {
      const sharedLayoutMainDiv = homePageDiv.current.parentElement;
      // console.log(sharedLayoutMainDiv);
      if (sharedLayoutMainDiv !== undefined) {
        sharedLayoutMainDiv.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <div ref={homePageDiv} className="posts-list">
      {arePostsLoading ? (
        <p>Loading ...</p>
      ) : axiosGetError !== "" ? (
        <p>Get Data error. Details: {axiosGetError}</p>
      ) : (
        <PostsList displayPosts={displayPosts} />
      )}
    </div>
  );
};
export default Home;
