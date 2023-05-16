import React, { useState } from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import React, { useState } from "react"

const Login = () => {
  let [authMode, setAuthMode] = useState('signin');


  const changeAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const [dataSignUp, setDataSignUp] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [login, { error: loginError, data: loginData }] = useMutation(LOGIN_USER);


  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();
    console.log(dataSignUp);

    try {
      const { data } = await addUser({
        variables: { ...dataSignUp },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    console.log(loginState);

    try {
      const { data } = await login({
        variables: { ...loginState },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }

    setLoginState({
      email: '',
      password: '',
    });
  };

  const handleSignupFormChange = (event) => {
    const { name, value } = event.target;

    setDataSignUp({
      ...dataSignUp,
      [name]: value,
    });
  };

  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;

    setLoginState({
      ...loginState,
      [name]: value,
    });
  };
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

 


return (
  <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handleLoginFormSubmit}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
        <div className="text-center">
          Not registered yet?{" "}
          <span className="link-primary" onClick={changeAuthMode}>
            Sign Up
          </span>
        </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control mt-1"
            placeholder="Enter email"
            value={loginState.email}
            onChange={handleLoginFormChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control mt-1"
            placeholder="Enter password"
            value={loginState.password}
            onChange={handleLoginFormChange}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="text-center mt-2">
          Forgot <a href="#">password?</a>
        </p>
      </div>
    </form>
  </div>
);


export default Login;
  