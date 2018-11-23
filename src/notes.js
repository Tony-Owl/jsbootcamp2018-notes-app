import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = []

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

// Save notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes


// Manipulate notes using 3rd party lib (moment, uuidv4)
const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()

    return id
}


// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}


// Sort notes by one of 3 ways
const sortNotes = (sortBy) => {

    // Sorting by last edited note:
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })

        // Sorting by last created
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })

        // Sorting alphabeticaly
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })

        // Just a default return value
    } else {
        return notes
    }
}


const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()

    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote, saveNotes }