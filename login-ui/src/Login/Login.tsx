import React, { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [submitError, setSubmitError] = useState('');
  const [successMassage, setSuccessMassage] = useState('');

  const nameRegx = /([a-zA-Z]{3,30}\s*)+/;
  const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);

    const value = e.target.value;

    if (!value.trim()) {
      setNameError("Name is require");
    } else if (!nameRegx.test(value)) {
      setNameError("Invalid name");
    } else {
      setNameError(" ");
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);

    const value = e.target.value;

    if (!value.trim()) {
      setEmailError("Email is require");
    }
    else if(!emailRegx.test(value)){
        setEmailError("Invalid email");
    } else{
        setNameError('');
    }
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);

    const value = e.target.value;

    if (!value.trim()) {
      setPasswordError("Password require");
    }
    else if(passwordRegx.test(value)){
        setPasswordError("Invalid password");
    }else {
        setPasswordError("");
    }
  }

  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
    setSubmitError('');
    setSuccessMassage('');

    if (!name) setNameError("name require");
    if (!email) setEmailError("email require");
    if (!password) setPasswordError("password require");

    if (nameError || emailError || passwordError || !name || !email || !password){
        console.log("Can't submit form has an error, fix it and go foward");
        return;
    }

    const formData = {name, email, password};

    try {
      const response = await fetch("http://localhost:5050/app/login", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });

      if (response.ok){
          const data = await response.json();
          setSuccessMassage('Login Successful!');
          console.log('success', data);
      }else {
          const errorData = await response.json();
          setSubmitError(errorData.message || 'Login Failed!');
      }
    } catch(error) {
      console.error('error', error);
      setSubmitError("An error occured while communicate with the server");
    }
  }

  return (
    <div className="hi">
      <div className="base">
        <div className="head">
          <h1>Log In</h1>
        </div>
        <form className="wrapper" onSubmit={handleSubmit}>
          <div className="inputs-wrapper">
            <div className="name-wrapper">
              <label htmlFor="name" className="label1">
                Name{" "}
              </label>
              <input
                type="text"
                value={name}
                className="form-control"
                id="name"
                placeholder="sachith"
                onChange={handleName}
              />
              {nameError && <div className="error-pop">{nameError}</div>}
            </div>
            <div className="email-wrapper">
              <label htmlFor="email" className="label1">
                Email{" "}
              </label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="email"
                placeholder="name@example.com"
                onChange={handleEmail}
              />
              {emailError && <div className="error-pop">{emailError}</div>}
            </div>
            <div className="password-wrapper">
              <label htmlFor="password" className="label">
                Password{" "}
              </label>
              <input
                type="password"
                value={password}
                id="password"
                className="form-control"
                placeholder="Password%6gss"
                onChange={handlePassword}
              />
              {passwordError && (<div className="error-pop">{passwordError}</div>
              )}
            </div>
          </div>
          <div className="btn-wrapper">
            <button type="submit" className="btn btn-primary"
            disabled={!!nameError || !!emailError || !!passwordError}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
