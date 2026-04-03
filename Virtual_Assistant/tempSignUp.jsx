import React, { useContext } from "react";
import bg from "../assets/authBg.png";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, userData,setUserData} = useContext(UserDataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
    const [loading, setLoading]=useState(false)
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    console.log("Form submitted");

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true },
      );

      setUserData(result.data)
      console.log("Response:", result.data);

      setLoading(false)
      navigate("/customize")
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      setErr(error.response.data.message);
      setUserData(null)
      setLoading(false)
    }
  };
  return (
    <div
      className="w-full h-screen bg-cover flex justify-center "
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur mt-32
        shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          {" "}
          Register to
          <span className="text-blue-400"> Virtual Assistant </span>{" "}
        </h1>

        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] px-5
             text-lg outline-none border-2 border-white bg-transparent text-white
              placeholder:text-gray-300 rounded-full"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] px-5
             text-lg outline-none border-2 border-white bg-transparent text-white
              placeholder:text-gray-300 rounded-full"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="w-full h-[60px] border-2  border-white bg-transparent text-white rounded-full text-lg relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="w-full h-full rounded-full outline-none
  placeholder:text-gray-300 px-[20px] py-[10px] "
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {!showPassword && (
            <IoEye
              className="top-[18px] right-[20px] text-[white] absolute  w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOff
              className="top-[18px] right-[20px] text-[white] absolute  w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {err.length > 0 && <p className="text-red-500 text-[17px]">*{err}</p>}

        <button
          type="submit"
          className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full font-semibold text-[19px]"
         disabled={loading}>
           { loading ? "Loading..." : "Sign Up" }
        </button>

        <p
          className="text-[white] text-[18px] cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have account ?
          <span className="text-blue-400 cursor-pointer"> Sign In </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
