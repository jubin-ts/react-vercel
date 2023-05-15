const Clients = require('../Model/NoteModel')
const mongoose = require ('mongoose')

//get all notes 

const getNotes = async (req,res) => {
    const client = await Clients.find({}).sort({createdAt: -1})

    res.status(200).json(client)
}

// get single note 

const getNote = async (req,res) => {
    const {id} = req.params
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no notes found'})
     }
    const client = await Clients.findById(id)

    if (!client) {
        return res.status(404).json({error:'no notes found'})
    }
    res.status(200).json(client)
}


// create a note

const createNote = async (req,res) => {
    const { name,email,mobile} = req.body
// adding doccument to db

    try {
       const client = await Clients.create({name,email,mobile})
       res.status(200).json(client)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete note 
 
const deleteNote = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no notes found'})
     }

    const client = await Clients.findByIdAndDelete({_id:id})

    if (!client) {
        return res.status(404).json({error:'no notes found'})
    }
    res.status(200).json(client)
}



// update a note


const updateNote = async (req,res) => { 
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no notes found'})
     }

     const client = await Clients.findByIdAndUpdate({_id:id}, {
        ...req.body
     })

     if (!client) {
        return res.status(404).json({error:'no notes found'})
    }
    res.status(200).json(client)
} 


module.exports = {
    createNote,
    getNote,
    getNotes,
    deleteNote,
    updateNote
}