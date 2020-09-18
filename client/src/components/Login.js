import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialcredentials = {
  username: "",
  password: "",
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialcredentials);
  const history = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const change = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", credentials)
      .then((res) => {
        console.log(res)
        window.localStorage.setItem("token", res.data.payload)
        history.push("/protected")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login} >
        <label>
          Username:
          <input type="text" name="username" onChange={change} />
        </label>
        <label>
          <label>
            Password:
            <input type="password" name="password" onChange={change} />
          </label>
        </label>
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
