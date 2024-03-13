import { useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import dayjs from "dayjs";
const SinglePost = () => {
  const posts = useStoreState((state) => state.posts);
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const { id } = useParams();
  const post = posts.find((post) => post._id.toString() === id);
  const navigate = useNavigate();

  const postBodyDiv = useRef();
  useEffect(() => {
    if (postBodyDiv.current !== undefined) {
      const sharedLayoutMainDiv = postBodyDiv.current.parentElement;
      if (sharedLayoutMainDiv !== undefined) {
        sharedLayoutMainDiv.scrollTo({
          top: 0,
        });
      }
    }
  }, []);

  function handleDelete() {
    deletePost(id);
    navigate("/");
  }
  return (
    <div ref={postBodyDiv} className="SinglePost">
      {post ? (
        <>
          <h3>{post.title}</h3>
          <p>Created: {dayjs(post.datetime).format("MMM DD, YYYY")}</p>
          <pre style={{ border: "1px solid", padding: "0.5rem" }}>
            {post.body}
          </pre>
          <Link to={`/editpost/${post._id}`}>
            <button>Edit Post</button>
          </Link>

          <button onClick={handleDelete}>Delete Post</button>
        </>
      ) : (
        <h3>Post Not Found</h3>
      )}
      <Link to="/" style={{ display: "block" }}>
        Back to Posts
      </Link>
    </div>
  );
};
export default SinglePost;
