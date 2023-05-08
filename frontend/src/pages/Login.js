import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import '../index.css'

export default function Login() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {login,error,isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email,password)
    }

return (
<div className="flex flex-col items-center justify-center h-screen">
<h1 className="text-5xl font-bold text-blue-500 text-center fixed top-0 w-full p-8"> Login to the Page and Add a Note</h1>


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
Sign In
</button>
<div><p> not a user ?</p> <Link to={'/signup'}  > Signup </Link>  </div>
</div>
{error && <div>{error}</div>}
</form>

</div>
);
}