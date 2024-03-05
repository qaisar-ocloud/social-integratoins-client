import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError } = useSelector((state) => state.auth);

  const { password, email } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      toast.success(`Welcome`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (isError) {
      toast.error("Wrong Credentials, Retry", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isSuccess, isError, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Password or Email does not match");
    } else {
      dispatch(login(formData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Please Login Your Account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <Link to="/forgotPassword"> Forgot Password ?</Link>
          </div>
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
