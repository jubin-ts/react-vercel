const express = require ('express')
const {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote
} = require ('../controllers/notesController')


const router = express.Router()
//get all notes

router.get('/',getNotes )

// get single note

router.get('/:id',getNote)

// post a new note 

router.post ('/', createNote)

// delete a new note 

router.delete ('/:id',deleteNote)

// update a  note 

router.patch ('/:id',updateNote)

module.exports = router