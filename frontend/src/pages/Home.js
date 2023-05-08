import React, { useEffect, useState } from "react";
import "../index.css";
import jubinImage from '../images/Jubin t s.jpg'
import './home.css'
import { useLogout } from "../hooks/useLogout";

export default function Profile() {
  const [notes, setNotes] = useState(null)
  const [title,setTitle] = useState('')
  const [ description,setDescription] = useState('')
  const [error, setError] = useState(null)
  const {Logout} = useLogout()

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes')
      const json = await response.json()

      if (response.ok) {

        setNotes(json); 
      }
    };
    fetchNotes();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    const note = {title,description}
    
    const response = await fetch('/api/notes',{
      method:'POST',
      body:JSON.stringify(note),
      headers: {
        'Content-Type':'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setTitle('')
      setDescription('')
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
          <p className="about" >
            Hi, I'm Jubin T  S, a web developer with a strong interest in React JS and MERN stack development.

            I have experience creating responsive and dynamic web applications using React JS, JavaScript, and other modern front-end technologies. In addition, my proficiency in back-end technologies like Node.js, Express.js, and MongoDB enables me to develop full-stack applications that meet user needs.

            My passion for web development stems from my desire to create user-friendly and engaging applications that solve real-world problems. I enjoy working in collaborative environments, learning new technologies, and staying up-to-date with the latest industry trends.
          </p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <form onSubmit={handleCommentSubmit}>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter note title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter note description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              type="submit"
            >
              Add Note
            </button>
            {error && <div>{error}</div>}
          </form>
        </div>
        {notes && notes.map((notes) => (
          <p key={notes._id} className="mb-2"> {notes.title} </p>
        ))}
      </div>
    </div>
  );
}