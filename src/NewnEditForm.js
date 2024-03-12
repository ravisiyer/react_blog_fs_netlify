import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const NewnEditForm = ({
  postId = null,
  postTitle,
  postBody,
  newPostChosen,
  addOrSavePost,
}) => {
  const [newnEditPostTitle, setNewnEditPostTitle] = useState(postTitle);
  const [newnEditPostBody, setNewnEditPostBody] = useState(postBody);

  const navigate = useNavigate();

  return (
    <form
      className="NewnEditPostForm"
      onSubmit={(e) => {
        e.preventDefault();
        addOrSavePost(newnEditPostTitle, newnEditPostBody, postId);
        navigate("/");
      }}
    >
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        id="title"
        required
        autoFocus
        value={newnEditPostTitle}
        onChange={(e) => setNewnEditPostTitle(e.target.value)}
      />
      <label htmlFor="body">Post Body: </label>
      <textarea
        id="body"
        value={newnEditPostBody}
        onChange={(e) => setNewnEditPostBody(e.target.value)}
      />
      <p>
        {newPostChosen ? (
          <button type="submit">Create Post</button>
        ) : (
          <button type="submit">Save Post</button>
        )}
        <Link to="/">
          <button type="button">Cancel</button>
        </Link>
      </p>
      {/* <Link to="/" style={{ display: "block" }}>
        Back to Posts
      </Link>
      <Link to="/">
        <button type="button">Back to Posts</button>
      </Link>{" "} */}
    </form>
  );
};
export default NewnEditForm;
