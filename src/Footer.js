import { useStoreState } from "easy-peasy";

const Footer = () => {
  const countPosts = useStoreState((state) => state.countPosts);
  const arePostsLoading = useStoreState((state) => state.arePostsLoading);
  const postsLoadingError = useStoreState((state) => state.postsLoadingError);
  return (
    <footer>
      {arePostsLoading || postsLoadingError ? null : (
        <h4>
          {countPosts} blog
          {countPosts === 1 ? ` post` : ` posts`}
        </h4>
      )}
      <p
        style={{
          marginTop: "0.25rem",
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: "red",
          color: "black",
        }}
      >
        {process.env.REACT_APP_SHOW_FOOTER_NOTE === "Y"
          ? process.env.REACT_APP_FOOTER_NOTE ||
            "Data may be deleted anytime by administrator!"
          : null}
      </p>
    </footer>
  );
};

export default Footer;
