import React,{useState} from 'react';
import '../index.css'
import { useSignup } from '../hooks/useSignup';
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google'
//import { GoogleLogin } from '@react-oauth/google';



export default function Signup() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {signup,error,isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email,password)
     }
    // const handleGoogleSuccess = (response) => {
    //   console.log(response);
    //   // TODO: Implement the login logic for Google login
    // };
  
    // // Add this function to handle Google login failure
    // const handleGoogleFailure = (response) => {
    //   console.log(response);
    //   // TODO: Implement the error handling for Google login
    // };

return (
<div className="flex flex-col items-center justify-center h-screen" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1629385359375-886444e67724?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80')` }} >
<h1 className="text-5xl font-bold text-blue-500 text-center fixed top-0 w-full p-8">SignUp</h1>


<form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"  onSubmit={handleSubmit} >
<div className="mb-4">
<label
         className="block text-gray-700 font-bold mb-2"
         htmlFor="email"
       >
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
Sign Up
</button>
</div>
{error && <div>{error}</div>}
</form>
<GoogleOAuthProvider clientId="813109995195-8r4p3qvv6qi7r7hs8olel7q77ugka079.apps.googleusercontent.com" >
<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
  {/* <GoogleLogin
        
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
      /> */}
 </GoogleOAuthProvider>
</div>
);
}