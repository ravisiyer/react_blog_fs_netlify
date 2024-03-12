import { useParams } from "react-router-dom";
import NewnEditForm from "./NewnEditForm";
import NotFound from "./NotFound";
import axiosAPI from "./api/api";
import { useStoreActions, useStoreState } from "easy-peasy";

const EditPost = () => {
  const posts = useStoreState((state) => state.posts);
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { id } = useParams();
  const post = posts.find((post) => post._id.toString() === id);

  async function savePost(postTitle, postBody, postId) {
    try {
      const axiosResp = await axiosAPI.put(`/${postId}`, {
        title: postTitle,
        body: postBody,
      });
      const tmpPosts = posts.map((post) => {
        return post._id === postId ? axiosResp.data.data : post;
      });
      setPosts(tmpPosts);
    } catch (error) {
      console.log(error);
    }
  }

  return post ? (
    <NewnEditForm
      postId={post._id}
      postTitle={post.title}
      postBody={post.body}
      newPostChosen={false}
      addOrSavePost={savePost}
    />
  ) : (
    <NotFound />
  );
};

export default EditPost;
