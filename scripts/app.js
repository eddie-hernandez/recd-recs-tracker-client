import { 
	indexRecords,
	seedRecords,
	createRecord,
	showRecord,
	updateRecord,
	deleteRecord,
	createLinerNote,
	updateLinerNote,
	deleteLinerNote,
	signUp,
	signIn,
} from './api.js'


import { 
	onRecordFailure,
	onIndexRecordSuccess,
	reIndexRecordSuccess,
	onCreateRecordSuccess,
	onShowRecordSuccess,
	onUpdateRecordSuccess,
	onDeleteRecordSuccess,
	onLinerNoteFailure,
	onCreateLinerNoteSuccess,
	onUpdateLinerNoteSuccess,
	onDeleteLinerNoteSuccess,
	onSignUpSuccess,
	onSignInSuccess,
	onUserFailure,
	refresh,
} from './ui.js'

// DOM DECLARATIONS

// SELECTING BY CONTAINER
const indexRecordContainer = document.querySelector('#index-record-container')
const showRecordContainer = document.querySelector('#show-record-container')
const linerNoteFormContainer = document.querySelector('#liner-note-form-container')
const deleteLinerNoteContainer = document.querySelector('#delete-liner-note-container')
const emptyLibraryContainer = document.querySelector('#empty-library-container')

// SELECTING BY FORM
const createRecordForm = document.querySelector('#create-record-form')
const userSignInForm = document.querySelector('.user-login-form')
const userSignUpForm = document.querySelector('.user-signup-form')
const eddieForm = document.querySelector('#eddie-form')


// SELECTING BY BUTTON 'TYPE'
const recordCollection = document.querySelector('#record-collection')
const reIndexRecordsButton = document.querySelector('#re-index-records-button')


// INDEX Records (for user sign-in)
export const showIndex = () => {
	indexRecords()
			.then(res => res.json())
			.then(res => {
				console.log(res)
				onIndexRecordSuccess(res.records)
				if (res.records.length === 0) {
					emptyLibraryContainer.innerHTML = 
					`<h4>There are currently no albums in your collection.</br>
					We should change that. Add a record maybe?</h4>
					`
				}
				else {
					emptyLibraryContainer.innerHTML = ``
				}
			})
			.catch(onRecordFailure)
}


// refreshable event listener
recordCollection.addEventListener('click', refresh)


// re-index event listener
reIndexRecordsButton.addEventListener('click', reIndexRecordSuccess)



// User Actions

// SIGN-IN
userSignInForm.addEventListener('submit', (event) => {
	console.log(event.target)
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target['email'].value,
			password: event.target['password'].value,
		},
	}
	signIn(userData)
		.then((res) => res.json())
		.then((res) => onSignInSuccess(res.token))
		.then(showIndex)
		.catch(onUserFailure)
})

// SIGN-UP
userSignUpForm.addEventListener('submit', (event) => {
	console.log(event.target)
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target['email'].value,
			password: event.target['password'].value,
		},
	}
	signUp(userData)
	.then(onSignUpSuccess)
	.then(seedRecords)
	.catch(onUserFailure)
})

// RECORDS

// embedded in "add album button"
// CREATE RECORD
createRecordForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const recordData = {
			record: {
				albumTitle: event.target['albumTitle'].value,
				artistName: event.target['artistName'].value,
				yearReleased: event.target['yearReleased'].value,
				comments: event.target['comments'].value,
			},
		}

    console.log(recordData)
    createRecord(recordData)
			.then(onCreateRecordSuccess)
			.then(refresh)
			.catch(onRecordFailure)
})

// ADD EDDIE RECORD TO COLLECTION
eddieForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const recordData = {
			record: {
				albumTitle: event.target['albumTitle'].value,
				artistName: event.target['artistName'].value,
				yearReleased: event.target['yearReleased'].value,
				comments: event.target['comments'].value,
			},
		}

    console.log(recordData)
    createRecord(recordData)
			.then(onCreateRecordSuccess)
			.then(refresh)
			.catch(onRecordFailure)
})


// SHOW RECORD
indexRecordContainer.addEventListener('click', (event) => {
	if (event.target.classList.contains('show-button')) {
		const id = event.target.getAttribute('data-id')
		console.log(id)

		if (!id) return

		showRecord(id)
				.then((res) => res.json())
				.then((res) => onShowRecordSuccess(res.record))
				.catch(onRecordFailure)
	}
})


// UPDATE RECORD
showRecordContainer.addEventListener('submit', (event) => {
	event.preventDefault()

	const id = event.target.getAttribute('data-id')

	const recordData = {
		record: {
			albumTitle: event.target['albumTitle'].value,
			artistName: event.target['artistName'].value,
			yearReleased: event.target['yearReleased'].value,
			comments: event.target['comments'].value,
		},
	}

    if (!id) return

	updateRecord(recordData, id)
		.then(onUpdateRecordSuccess)
		.catch(onRecordFailure)
})

// DELETE RECORD
showRecordContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

    if (!id) return

	deleteRecord(id)
		.then(onDeleteRecordSuccess)
		.catch(onRecordFailure)
})

// LINER NOTES

// Create liner note form will only show when an album is selected and the "add liner note button is clicked"


linerNoteFormContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	console.log(event.target)

	// CREATE LINER NOTE
	if (event.target.classList.contains("create-liner-note-form")) {
	const linerNoteData = {
			linerNote: {
				rating: event.target['rating'].value,
				standoutTrack: event.target['standoutTrack'].value,
				thoughts: event.target['thoughts'].value,
				recordId: event.target['recordId'].value
			},
		}

	console.log(linerNoteData)
	createLinerNote(linerNoteData)
			.then(onCreateLinerNoteSuccess)
			.catch(onLinerNoteFailure)
}

	// UPDATE LINER NOTE
	else if (event.target.classList.contains("update-liner-note-form")) {

		const linerNoteId = event.target.getAttribute('data-id')
		console.log(linerNoteId)

		const linerNoteData = {
			linerNote: {
				rating: event.target['rating'].value,
				standoutTrack: event.target['standoutTrack'].value,
				thoughts: event.target['thoughts'].value,
				recordId: event.target['recordId'].value
			},
		}

		if (!linerNoteId) return

		updateLinerNote(linerNoteData, linerNoteId)
			.then(onUpdateLinerNoteSuccess)
			.catch(onLinerNoteFailure)
	}


})

// DELETE LINER NOTE
deleteLinerNoteContainer.addEventListener('click', (event) => {
	event.preventDefault()
	console.log(event.target)

	if (event.target.classList.contains("delete-liner-note")) {
		const linerNoteId = event.target.getAttribute('data-id')
		const deleteDiv = document.querySelector('#delete-container')
		const recordId = deleteDiv.getAttribute('data-id')

		const linerNoteData = {
			linerNote: {
				recordId: recordId
			},
		}

    	if (!linerNoteId) return

		deleteLinerNote(linerNoteData, linerNoteId)
			.then(onDeleteLinerNoteSuccess)
			.catch(onLinerNoteFailure)
	}
})