import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../features/auth/authSlice";

function LoggedIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    const logInUser = await dispatch(logIn(data));

    if (logIn.fulfilled.match(logInUser)) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <FormContainer>
      <center className="capitalize md:text-2xl text-lg font-bold pb-3">
        welcome back Friend
      </center>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-semibold border border-red-300 animate-pulse">
          ⚠️ {error}
        </div>
      )}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="capitalize block  font-semibold">email</label>
          <input
            type="text"
            name="email"
            onChange={handleOnChange}
            value={formData.email}
            placeholder="xyz@gmail.com"
            className="border w-full py-2 px-3 rounded-sm"
          />
        </div>
        <div>
          <label className="capitalize block font-semibold ">Password</label>
          <input
            type="text"
            onChange={handleOnChange}
            name="password"
            value={formData.password}
            placeholder="..............."
            className="border w-full py-2 px-3 rounded-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 font-bold text-lg text-white bg-green-400 w-full py-2 px-3 rounded-sm"
        >
          {loading ? `Loading...` : `Log In`}
        </button>
        <p className="capitalize">
          if you have already account{" "}
          <Link className="text-green-400 capitalize font-bold" to={"/signup"}>
            Sign up
          </Link>
        </p>
      </form>
    </FormContainer>
  );
}

export default LoggedIn;
