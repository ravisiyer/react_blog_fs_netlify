import { Link, useLocation } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const Navbar = () => {
  const searchPosts = useStoreState((state) => state.searchPosts);
  const setSearchPosts = useStoreActions((actions) => actions.setSearchPosts);
  const unauthorized = useStoreState((state) => state.unauthorized);
  const networkError = useStoreState((state) => state.networkError);
  const arePostsLoading = useStoreState((state) => state.arePostsLoading);

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="Navbar">
      <Link style={unauthorized ? { visibility: "hidden" } : null} to="/">
        Posts
      </Link>
      <Link
        style={
          unauthorized || networkError || arePostsLoading
            ? { visibility: "hidden" }
            : null
        }
        to="/newpost"
      >
        New
      </Link>
      <form
        className="SearchPostsForm"
        style={
          pathname !== "/" || unauthorized || networkError || arePostsLoading
            ? { visibility: "hidden" }
            : null
        }
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          id="searchPosts"
          placeholder="Search by post title or body"
          value={searchPosts}
          onChange={(e) => {
            setSearchPosts(e.target.value);
          }}
        />
      </form>
      <Link to="/setuser">User</Link>
    </div>
  );
};
export default Navbar;
