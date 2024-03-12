import NewnEditForm from "./NewnEditForm";
import axiosAPI from "./api/api";
import { useStoreActions, useStoreState } from "easy-peasy";

const NewPost = () => {
  const posts = useStoreState((state) => state.posts);
  const setPosts = useStoreActions((actions) => actions.setPosts);
  async function addNewPost(postTitle, postBody) {
    const datetime = Date();
    try {
      const axiosResp = await axiosAPI.post("/", {
        datetime: datetime,
        title: postTitle,
        body: postBody,
      });
      const tmpPosts = [...posts];
      tmpPosts[posts.length] = axiosResp.data.data;
      setPosts(tmpPosts);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <NewnEditForm
      postTitle={""}
      postBody={""}
      newPostChosen={true}
      addOrSavePost={addNewPost}
    />
  );
};
export default NewPost;
