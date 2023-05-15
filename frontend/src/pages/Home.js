import React, { useEffect, useState } from "react";
import "../index.css";
import jubinImage from '../images/Jubin t s.jpg'
import './home.css'
import { useLogout } from "../hooks/useLogout";

export default function Profile() {
  const [note,setNote] = useState('')
  const [name, setName] = useState('')
  const [email,setEmail] = useState('')
  const [ mobile,setMobile] = useState('')
  const [error, setError] = useState(null)
  const {Logout} = useLogout()

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes')
      const json = await response.json()

      if (response.ok) {

        setNote(json); 
      }
    };
    fetchNotes();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    const client = {name,email,mobile}
    
    const response = await fetch('/api/notes',{
      method:'POST',
      body:JSON.stringify(client),
      headers: {
        'Content-Type':'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setName('')
      setEmail('')
      setMobile('')
      setError(null)
      console.log('new note added',json)
    }
  };

  const handleClick = () => {
    Logout()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <div className="header" >
            <h1><img className="image" src={jubinImage} alt="jubin image" /> </h1>
            
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" onClick={handleClick}>Log out</button>
          <h1 className="text-4xl font-bold text-center text-green-500 mt-8">About</h1>
          <p className="about" >
            Hi, I'm Jubin T  S, a web developer with a strong interest in React JS and MERN stack development.

            I have experience creating responsive and dynamic web applications using React JS, JavaScript, and other modern front-end technologies. In addition, my proficiency in back-end technologies like Node.js, Express.js, and MongoDB enables me to develop full-stack applications that meet user needs.

            My passion for web development stems from my desire to create user-friendly and engaging applications that solve real-world problems. I enjoy working in collaborative environments, learning new technologies, and staying up-to-date with the latest industry trends.
          </p>

          <h1 class="text-4xl text-center text-green-500"> My Projects </h1>


          <p className="about" >
          
          1, LinkedIn clone,
          2, YouTube clone
          <a href="https://darling-unicorn-d26c37.netlify.app" class="text-green-500 hover:text-green-700 hover:underline" >  ...........link to project  </a>




          </p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <form onSubmit={handleCommentSubmit}>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
             Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={ name}
            />
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
             Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter email id "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
             <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="contact"
            >
             Contact number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Mobile Number "
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              type="submit"
            >
              Contact Us
            </button>
            {error && <div>{error}</div>}
          </form>
        </div>
        {/* {notes && notes.map((notes) => (
          <p key={notes._id} className="mb-2"> {notes.title} </p>
        ))} */}
      </div>
    </div>
  );
}