// IMPORTS

import { store } from './store.js'
import { showIndex } from './app.js'
import { indexRecords } from './api.js'

// DOM SELECTIONS

// selecting by container
const signUpContainer = document.querySelector('.sign-up-container')
const signInContainer = document.querySelector('.sign-in-container')
const indexRecordContainer = document.querySelector('#index-record-container')
const userMessageContainer = document.querySelector('#user-message-container')
const recordMessageContainer = document.querySelector('#record-message-container')
const showRecordContainer = document.querySelector('#show-record-container')
const playlistContainer = document.querySelector('#playlist-container')

// selecting by forms & form container
const createRecordForm = document.querySelector('#create-record-form')
const userSignInForm = document.querySelector('.user-login-form')
const userSignUpForm = document.querySelector('.user-signup-form')
const userFormContainer = document.querySelector('#user-form-container')
const linerNoteFormContainer = document.querySelector('#liner-note-form-container')
const deleteLinerNoteContainer = document.querySelector('#delete-liner-note-container')

// selecting by page
const playlistPageContainer = document.querySelector('#playlist-page-container')
const authContainer = document.querySelector('#auth-container')
const mainContainer = document.querySelector('#main-container')
const eddieContainer = document.querySelector('#eddie-container')

// selecting by button
const addRecordButton = document.querySelector("#add-record-button")
const reIndexRecordsButton = document.querySelector('#re-index-records-button')
const eddieButton = document.querySelector('.eddie-icon')
const mainIcon = document.querySelector('.main-icon')
const playlistIcon = document.querySelector('.playlist-icon')

// Sign-In Container
const userSignContainer = document.querySelector('#user-sign-container')
const username = document.querySelector('.username')

// Help Modal
const helpModal = document.querySelector('#help-modal')

/* ESSENTIAL UI FUNCTIONS */

// refreshes indexed records and hide any containers that may still be showing
export const refresh = () => {
    navFromEddie()
    navFromPlaylist()
    reIndexRecordSuccess()
    indexRecordContainer.innerHTML = ``
    addRecordButton.classList = `btn btn-dark p-3 collapsed`
    createRecordForm.classList = `col-6 offset-3 collapse`
    showIndex()
}

// RE-INDEXING RECORDS
export const reIndexRecordSuccess = () => {
	reIndexRecordsButton.classList = `d-none btn btn-warning`
	deleteLinerNoteContainer.innerHTML = ``
	deleteLinerNoteContainer.style.display = "none"
	indexRecordContainer.style.display = "block"
    showRecordContainer.style.display = "none"
    showRecordContainer.innerHTML = ``
    linerNoteFormContainer.style.display = "none"
    linerNoteFormContainer.innerHTML = ``
	linerNoteFormContainer.style.display = "block"
}

/* PAGE NAVIGATIONS */

// NAV SIGN-IN to SIGN-UP
signInContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('new-account')) {
        signInContainer.classList.add('d-none')
        signUpContainer.classList.remove('d-none')
        userFormContainer.classList = `card bg-dark text-white`
    }
})

// NAV SIGN-UP to SIGN-IN
signUpContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('existing-account')) {
        signUpContainer.classList.add('d-none')
        signInContainer.classList.remove('d-none')
        userFormContainer.classList = `card bg-warning text-black`
    }
})

// EDDIE PAGE NAVIGATION
const navFromEddie = () => {
    eddieContainer.classList.add('d-none')
    mainContainer.classList.remove('d-none')
}

const navToEddie = () => {
    playlistContainer.innerHTML = ``
    playlistPageContainer.classList.add('d-none')
    mainContainer.classList.add('d-none')
    eddieContainer.classList.remove('d-none')
}

/* PLAYLIST PAGE ACTIONS */

// PLAYLIST PAGE NAVIGATION
const navFromPlaylist = () => {
    playlistContainer.innerHTML = ``
    mainContainer.classList.remove('d-none')
    playlistPageContainer.classList.add('d-none')
}

const navToPlaylist = () => {
    eddieContainer.classList.add('d-none')
    mainContainer.classList.add('d-none')
    playlistPageContainer.classList.remove('d-none')
}

// SHOW PLAYLIST
const onShowPlaylist = (records) => {
    records.forEach(record => {
        if (record.linerNotes[0].standoutTrack !== "") {
        const playlistDiv = document.createElement('div')
        playlistDiv.innerHTML = `
            <h2 id="show-song">&#10038; ${record.artistName} - "${record.linerNotes[0].standoutTrack}"</h2>
        `
        playlistContainer.appendChild(playlistDiv)
        }
    })
}

// CREATE PLAYLIST
const activatePlaylist = () => {
    navToPlaylist()
    indexRecords()
        .then(res => res.json())
        .then(res => {
            onShowPlaylist(res.records)
        })
        .catch(onRecordFailure)
}

/* RECORDS SUCCESS / FAILURE EXPORTS */

export const onIndexRecordSuccess = (records) => {
    indexRecordContainer.style.display = "block"
    records.forEach(record => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h2 id="show-record">&#10038; ${record.artistName} - "${record.albumTitle}"</h2>
            <button type="button" class="show-button btn btn-secondary" data-id="${record._id}">Show Record</button></br></br>
        `
        indexRecordContainer.appendChild(div)
    })
}

export const onShowRecordSuccess = (record) => {
    deleteLinerNoteContainer.style.display = "block"
    reIndexRecordsButton.classList = `btn btn-warning`
    indexRecordContainer.style.display = "none"
    showRecordContainer.style.display = "block"
    const recordDiv = document.createElement('div')
    recordDiv.innerHTML = `
    <h2 id="show-record-title"><u>Selected Album</u></h2>
    <h3 class="record-title"><b>"${record.albumTitle}"</b></h3>
    <h4>Artist Name: <b>${record.artistName}</b></h4>
    <h4>Year Released: <b>${record.yearReleased}</b></h4>
    <h4>Comments: <b><i>"${record.comments}"</i></b></h4></br>
    
    <div class="record-form-container">
        <button class="btn btn-light" data-bs-toggle="collapse" data-bs-target="#record-form" aria-expanded="false" aria-controls="row" id="edit-record-button">Edit Record Info</button></br></br>
        <form id="record-form" class="collapse" data-id="${record._id}">
        <div class="form-floating">
            <input type="text" name="albumTitle" id="albumTitle" value="${record.albumTitle}" class="user-input form-control" />
            <label for="albumTitle" class="form-label">Album Title</label>
        </div>
            <div class="form-floating">
            <input type="text" name="artistName" id="artistName" value="${record.artistName}" class="user-input form-control" />
            <label for="artistName" class="form-label">Artist Name</label>
        </div>
        <div class="form-floating">
            <input type="number" name="yearReleased" id="yearReleased" value="${record.yearReleased}" class="user-input form-control" />
            <label for="yearReleased" class="form-label">Year Released</label>
        </div>
        <div class="form-floating">
            <input type="text" name="comments" id="comments" value="${record.comments}" class="user-input form-control" />
            <label for="comments" class="form-label">Comments (if any)</label>
        </div></br>
        <button type="submit" class="btn btn-success" value="Update Record Info" />Update Record Info</button></br></br>
        </form>
        </div>
        <button type="button" class="delete-record btn btn-danger" value="Delete Record" data-id="${record._id}" />Delete Record</button></br>
    </div>
    `
    
    showRecordContainer.appendChild(recordDiv)
        
    // if the record has a liner note already, show the update / delete options
    if (record.linerNotes.length == 1) {
        deleteLinerNoteContainer.style.display = "block"
        const linerNoteDiv = document.createElement('div')
        linerNoteDiv.innerHTML = `
        <h2 id="show-liner-note"><i><u>Liner Notes</u>:</i></h2>
        <h4>Album Rating: <b>${record.linerNotes[0].rating}/10</b></h4>
        <h4>Standout Track: <b>"${record.linerNotes[0].standoutTrack}"</b></h4>
        <h4>Thoughts: <b><i>"${record.linerNotes[0].thoughts}"</i></b></h4></br>
        
        <button class="btn btn-light" data-bs-toggle="collapse" data-bs-target=".update-liner-note-form" aria-expanded="false" aria-controls="row" id="edit-liner-note-button">Edit Liner Note Info</button></br></br>
        <form class="update-liner-note-form collapse" data-id="${record.linerNotes[0]._id}">
        <div class="form-floating">
            <input type="number" name="rating" id="rating" value="${record.linerNotes[0].rating}" class="user-input form-control" />
            <label for="rating" class="form-label">Record Rating (1-10)</label>
        </div>
        <div class="form-floating">
            <input type="text" name="standoutTrack" id="standoutTrack" value="${record.linerNotes[0].standoutTrack}" class="user-input form-control" />
            <label for="standoutTrack" class="form-label">Standout Track</label>
        </div>
        <div class="form-floating">
            <input type="text" name="thoughts" id="thoughts" value="${record.linerNotes[0].thoughts}" class="user-input form-control" />
            <label for="thoughts" class="form-label">Thoughts? (if any)</label>
        </div>
        <div class="form-floating">
            <input type="text" name="recordId" id="recordId" value="${record._id}" class="form-control d-none" disabled />
        </div></br>
        <button type="submit" class="btn btn-success" value="Update Liner Note" />Update Liner Note Info for "${record.albumTitle}"</button>
        </form>
        `
        linerNoteFormContainer.appendChild(linerNoteDiv)
        
        const deleteLinerNoteDiv = document.createElement('div')
        deleteLinerNoteDiv.innerHTML = `
        <div data-id="${record._id}" id="delete-container">
            <button type="button" class="delete-liner-note btn btn-danger" value="Delete Liner Note" data-id="${record.linerNotes[0]._id}" />Delete Liner Note</button></br>
        </div>
        `
        deleteLinerNoteContainer.appendChild(deleteLinerNoteDiv)
        
    }
        
    // if the record does NOT yet have a liner note, show create liner note option
    else {
        deleteLinerNoteContainer.style.display = "none"
        const linerNoteDiv = document.createElement('div')
        linerNoteDiv.innerHTML = `
        <h3 id="show-liner-note"><b><i>Finished Listening?</i></b></h3></br>
        <button class="btn btn-light" data-bs-toggle="collapse" data-bs-target=".create-liner-note-form" aria-expanded="false" aria-controls="row" id="create-liner-note-button">Create New Liner Note</button></br></br>
        <form class="create-liner-note-form collapse">
        <div class="form-floating">
            <input type="number" name="rating" id="rating" placeholder="add rating here" class="user-input form-control" />
            <label for="rating" class="form-label">Record Rating (1-10)</label>
        </div>
        <div class="form-floating">
            <input type="text" name="standoutTrack" id="standoutTrack" placeholder="add standout track here" class="user-input form-control" />
            <label for="standoutTrack" class="form-label">Standout Track</label>
        </div>
        <div class="form-floating">
            <input type="text" name="thoughts" id="thoughts" placeholder="add any thoughts on the record here" class="user-input form-control" />
            <label for="thoughts" class="form-label">Thoughts? (if any)</label>
        </div>
        <div class="form-floating">
            <input type="text" name="recordId" id="recordId" value="${record._id}" class="form-control d-none" disabled />
        </div></br>
        <button type="submit" class="btn btn-success" value="Add Liner Note" />Add Liner Note to "${record.albumTitle}"</button></br>
        </form>
        `
        
        linerNoteFormContainer.appendChild(linerNoteDiv)
    }
}
    
export const onCreateRecordSuccess = () => {
    recordMessageContainer.innerHTML = `
        <h3 id="record-message"><i>now THAT'S a record!</i></h3>
    `
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
}

export const onUpdateRecordSuccess = () => {
    refresh()
    recordMessageContainer.innerHTML = `
        <h3 id="record-message"><i>record successfully updated!</i></h3>
    `
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
}

export const onDeleteRecordSuccess = () => {
    refresh()
    recordMessageContainer.innerHTML = `
        <h3 id="record-message"><i>record deletion successful!</i></h3>
    `
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 1500)
}

export const onRecordFailure = (error) => {
    recordMessageContainer.innerHTML = `
        <h3 id="record-message">woah! you've got a record error!</h3>
        <p id="error">${error}</p>
    `
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 2500)
}
    
    
/* LINER NOTE SUCCESS / FAILURE EXPORTS */

export const onCreateLinerNoteSuccess = () => {
    refresh()
    recordMessageContainer.innerHTML = `
    <h3 id="record-message"><i>incredible...you've just created a liner note!!</i></h3>
    `
    setTimeout(() => {recordMessageContainer.innerText = ``}, 1500)
}

export const onUpdateLinerNoteSuccess = () => {
    refresh()
    recordMessageContainer.innerHTML = `
        <h3 id="record-message"><i>amazing...you've just edited a liner note!</i></h3>
    `
    setTimeout(() => {recordMessageContainer.innerText = ``}, 1500)
    
}

export const onDeleteLinerNoteSuccess = () => {
    refresh()
    recordMessageContainer.innerHTML = `
        <h3 id="record-message"><i>you've just deleted a liner note! :0</i></h3>
    `
    setTimeout(() => {recordMessageContainer.innerText = ``}, 1500)
}

export const onLinerNoteFailure = (error) => {
    recordMessageContainer.innerHTML = `
        <h3 id="record-message">woah! you've got a liner note error!</h3>
        <p id="error">${error}</p>
    `
    setTimeout(() => {recordMessageContainer.innerHTML = ``}, 2500)
}

/* USER SUCCESS / FAILURE EXPORTS */

export const onSignUpSuccess = () => {
    userMessageContainer.innerHTML = `
        <h3>you've created a new user!</h3>
        <h3>sign-in to your new account.</h3>
    `
    userSignUpForm.reset()
    setTimeout(() => {userMessageContainer.innerHTML = ``}, 1500)
}

export const onSignInSuccess = (userToken) => {
    indexRecordContainer.innerHTML = ``
    userMessageContainer.innerHTML = ''
    userSignInForm.reset()
    store.userToken = userToken
    localStorage.setItem('token', userToken)
    // saying hello to the user!
    userSignContainer.classList.remove('invisible')
    helpModal.classList.remove('invisible')
    username.innerText = JSON.parse(atob(userToken.split('.')[1])).username
    authContainer.classList.add('d-none')
    mainContainer.classList.remove('d-none')
    eddieButton.addEventListener('click', navToEddie)
    playlistIcon.addEventListener('click', activatePlaylist)
    mainIcon.addEventListener('click', refresh)
}

export const onUserFailure = () => {
    userMessageContainer.innerHTML = `
        <h3 id="error">the email and/or password provided is not correct.</h3>
        <h3 id="error">please sign in again.</h3>
    `
setTimeout(() => {userMessageContainer.innerHTML = ``}, 2500)
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    if(!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    }
    return token
}

export const getUser = () => {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).id : null
}

export const logOut = () => {
    localStorage.removeItem('token')
}

export const onSignOutSuccess = () => {
    username.innerHTML = ``
    refresh()
    userSignContainer.classList.add('invisible')
    helpModal.classList.add('invisible')
    mainContainer.classList.add('d-none')
    authContainer.classList.remove('d-none')
    playlistContainer.innerHTML = ``
    indexRecordContainer.innerHTML = ``
}