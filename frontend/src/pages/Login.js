import React, { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import "../index.css";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
//import { token } from "morgan";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  const handleGoogleSuccess = (response) => {
    //  Implementing the login logic for Google login
    var decodedHeader = jwt_decode(response.credential);
    console.log(decodedHeader);
    //const { email, password } = decodedHeader;
    // const doc = {
    //   _type: "user",
    //   email: email,
    //   password: password,
    // };
    const Email= decodedHeader.email
    const Password=decodedHeader.jti
    
    localStorage.setItem("user", JSON.stringify(decodedHeader));

    if (localStorage.getItem("user")) {
       navigate("/home");
      setIsLoggedIn(true)  
    }
    fetch('/api/user/login',{
      method:"POST",
      body:JSON.stringify({
        email:Email,
        password:Password})
  })
  
  // .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
  console.log(Email,Password);
};



  // Add this function to handle Google login failure
  const handleGoogleFailure = (response) => {
    console.log(response);
    // TODO: Implement the error handling for Google login
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && isLoggedIn) {
      navigate('/home');
    }
  },)

  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1629385359375-886444e67724?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80')` }} >
      <h1 className="text-5xl font-bold text-blue-500 text-center fixed top-0 w-full p-8">
        {" "}
       Login
      </h1>

      <form
        className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            Sign In
          </button>
          <div>
            <p> not a user ?</p> <Link to={"/signup"}> Signup </Link>{" "}
          </div>
        </div>
        {error && <div>{error}</div>}
      </form>
<GoogleOAuthProvider clientId="813109995195-8r4p3qvv6qi7r7hs8olel7q77ugka079.apps.googleusercontent.com" >
  <GoogleLogin
        
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        render={(renderProps) => (
          <button
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign in with Google
          </button>
        )}
      />
 </GoogleOAuthProvider>
</div>
);
}