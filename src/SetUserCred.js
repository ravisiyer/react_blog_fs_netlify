import { useState, useEffect } from "react";
import axiosAPI from "./api/api";
import { useStoreActions, useStoreState } from "easy-peasy";

const SetUserCred = ({ isDataLoading, axiosGetError }) => {
  const user = useStoreState((state) => state.user);
  const [formUsername, setFormUsername] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const setUser = useStoreActions((actions) => actions.setUser);
  const setArePostsLoading = useStoreActions(
    (actions) => actions.setArePostsLoading
  );
  const [userCredStatus, setUserCredStatus] = useState("");

  useEffect(() => {
    if (axiosGetError.message !== "") {
      if (axiosGetError.unauthorized) {
        setUserCredStatus(
          "Backend API failure with status code 401 (Unauthorized)! Backend API is up but authentication " +
            "seems to be enabled and user credentials are invalid."
        );
      } else {
        setUserCredStatus(
          "Backend API failure! " +
            axiosGetError.message +
            ". Backend API seems to be down."
        );
      }
    } else if (!isDataLoading) {
      setUserCredStatus(
        "Backend API success! Either backend authentication is disabled or " +
          "backend authentication is enabled and user credentials are valid."
      );
    }
    const cleanup = () => {
      setUserCredStatus("");
    };
    return cleanup;
  }, [axiosGetError, isDataLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const authdata = btoa(formUsername + ":" + password);
    axiosAPI.defaults.headers.common["Authorization"] = `Basic ${authdata}`;
    // Below code will trigger useEffect in useAxiosGet which will get posts
    setUser({ name: formUsername, password: password, authdata: authdata });
    setArePostsLoading(true);
  };

  return (
    <form className="SetUserCredForm" onSubmit={handleSubmit}>
      <h2>Set and Test User Credentials</h2>
      <br />
      <div className="SetUserCredRow">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="username"
          value={formUsername}
          onChange={(e) => setFormUsername(e.target.value)}
        />
      </div>
      <div className="SetUserCredRow">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Set & Test User Credentials</button>
      <p>Test result: {userCredStatus ? userCredStatus : null} </p>
      <br />
      <p>Backend API URL: {process.env.REACT_APP_API_URL}</p>
      <br />
      <p>
        Note that posts are common to (shared by) all users (to simplify
        program).
      </p>
    </form>
  );
};
export default SetUserCred;
