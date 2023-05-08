const Note = require('../Model/NoteModel')
const mongoose = require ('mongoose')

//get all notes 

const getNotes = async (req,res) => {
    const notes = await Note.find({}).sort({createdAt: -1})

    res.status(200).json(notes)
}

// get single note 

const getNote = async (req,res) => {
    const {id} = req.params
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no notes found'})
     }
    const note = await Note.findById(id)

    if (!note) {
        return res.status(404).json({error:'no notes found'})
    }
    res.status(200).json(note)
}


// create a note

const createNote = async (req,res) => {
    const { title,description} = req.body
// adding doccument to db

    try {
       const note = await Note.create({title,description})
       res.status(200).json(note)
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

    const note = await Note.findByIdAndDelete({_id:id})

    if (!note) {
        return res.status(404).json({error:'no notes found'})
    }
    res.status(200).json(note)
}



// update a note


const updateNote = async (req,res) => { 
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'no notes found'})
     }

     const note = await Note.findByIdAndUpdate({_id:id}, {
        ...req.body
     })

     if (!note) {
        return res.status(404).json({error:'no notes found'})
    }
    res.status(200).json(note)
} 


module.exports = {
    createNote,
    getNote,
    getNotes,
    deleteNote,
    updateNote
}