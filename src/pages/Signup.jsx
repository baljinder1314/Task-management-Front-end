import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice.js";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });

  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("username", formData.username);
    fd.append("email", formData.email);
    fd.append("password", formData.password);
    fd.append("confirmPassword", formData.confirmPassword);
    fd.append("avatar", formData.photo);

    // Dispatch API
    const resultAction = await dispatch(registerUser(fd));

    // Check if API success
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login"); // ⭐ Redirect to login
    } else {
      navigate("/signup");
    }
  };

  return (
    <FormContainer>
      <center className="capitalize md:text-2xl text-lg font-bold pb-3">
        welcome task Managemant
      </center>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-semibold border border-red-300 animate-pulse">
          ⚠️ {error}
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="capitalize block  font-semibold">username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleOnChange}
            placeholder="Enter User Name"
            className="border w-full py-2 px-3 rounded-sm"
          />
        </div>
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
        <div>
          <label className="capitalize block font-semibold ">
            Confim Password
          </label>
          <input
            type="text"
            name="confirmPassword"
            onChange={handleOnChange}
            value={formData.confirmPassword}
            placeholder="..............."
            className="border w-full py-2 px-3 rounded-sm"
          />
        </div>
        <div>
          <label className="capitalize block font-semibold ">Photo</label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleOnChange}
            required
            name="photo"
            className="border w-full py-2 px-3 rounded-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 font-bold text-lg text-white bg-green-400 w-full py-2 px-3 rounded-sm"
        >
          {loading ? `Loading...` : `Sign Up`}
        </button>
        <p className="capitalize">
          if you have already account{" "}
          <Link className="text-green-400 capitalize font-bold" to={"/login"}>
            Log In
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default Signup;
