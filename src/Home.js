import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PostsList from "./PostsList";

const Home = ({ displayPosts, arePostsLoading, axiosGetError }) => {
  const homePageDiv = useRef();
  useEffect(() => {
    if (homePageDiv.current !== undefined) {
      const sharedLayoutMainDiv = homePageDiv.current.parentElement;
      if (sharedLayoutMainDiv !== undefined) {
        sharedLayoutMainDiv.scrollTo({
          top: 0,
        });
      }
    }
  }, []);

  return (
    <div ref={homePageDiv} className="posts-list">
      {arePostsLoading ? (
        <p>Loading ...</p>
      ) : axiosGetError.message !== "" ? (
        <>
          <p>Get Data error. Details: {axiosGetError.message}</p>
          {axiosGetError.unauthorized ? (
            <>
              <span>Unauthorized user! Try </span>
              <Link to="/setuser">changing user credentials</Link>
            </>
          ) : null}
        </>
      ) : (
        <PostsList displayPosts={displayPosts} />
      )}
    </div>
  );
};
export default Home;
