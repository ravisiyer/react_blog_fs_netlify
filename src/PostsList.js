import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import dayjs from "dayjs";
const PostsList = ({ displayPosts }) => {
  const searchPosts = useStoreState((state) => state.searchPosts);
  return (
    <div>
      {displayPosts.length > 0 ? (
        displayPosts.map((post) => {
          return (
            <div className="posts-list-item" key={post._id}>
              <Link to={`posts/${post._id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>Created: {dayjs(post.datetime).format("MMM DD, YYYY")}</p>
              <p>
                {post.body.length > 25 ? post.body.slice(0, 25) : post.body}
              </p>
            </div>
          );
        })
      ) : (
        <p style={{ marginTop: "2rem", fontSize: "2rem" }}>
          No {searchPosts && "matching "}posts
        </p>
      )}
    </div>
  );
};
export default PostsList;
