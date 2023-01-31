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
	onHideIndexSuccess,
	onCreateRecordSuccess,
	onShowRecordSuccess, 
	onHideRecordSuccess,
	onUpdateRecordSuccess,
	onDeleteRecordSuccess,
	onLinerNoteFailure,
	onCreateLinerNoteSuccess,
	onUpdateLinerNoteSuccess,
	onDeleteLinerNoteSuccess,
	onHideLinerNoteSuccess,
	onSignUpSuccess,
	onSignInSuccess,
	onUserFailure
} from './ui.js'

const createRecordForm = document.querySelector('#create-record-form')
const indexRecordContainer = document.querySelector('#index-record-container')
const showRecordContainer = document.querySelector('#show-record-container')
const reIndexRecordsButton = document.querySelector('#re-index-records-button')
const linerNoteFormContainer = document.querySelector('#liner-note-form-container')
const deleteLinerNoteContainer = document.querySelector('#delete-liner-note-container')
const signUpContainer = document.querySelector('.sign-up-container')
const signInContainer = document.querySelector('.sign-in-container')
const userFormContainer = document.querySelector('#user-form-container')
const userSignInForm = document.querySelector('.user-login-form')
const userSignUpForm = document.querySelector('.user-signup-form')
const recordFormContainer = document.querySelector('.record-form-container')
const recordCollection = document.querySelector('#record-collection')

// User Actions

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
		userFormContainer.classList = `card bg-secondary text-white`
	}
})

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
		.then(indexRecords)
		.then(reIndexRecordsButton.style.display = "none")
		.then(res => res.json())
		.then(res => {
			console.log(res)
			onIndexRecordSuccess(res.records)
		})
		.then(recordFormContainer.classList = 'record-form-container')
		.catch(onRecordFailure)
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

// RE-INDEXING RECORDS
const reIndexRecords = () => {
	reIndexRecordsButton.style.display = "none"
	deleteLinerNoteContainer.innerHTML = ``
	deleteLinerNoteContainer.style.display = "none"
	indexRecordContainer.style.display = "block"
	onHideRecordSuccess()
	onHideLinerNoteSuccess()
	linerNoteFormContainer.style.display = "block"
}

// Event Listener on Record Collection Title to refresh indexed records
// and hide any containers still showing
recordCollection.addEventListener('click', () => {
	reIndexRecords()
	indexRecordContainer.innerHTML = ``
	indexRecords()
		.then(reIndexRecordsButton.style.display = "none")
		.then(res => res.json())
		.then(res => {
			console.log(res)
			onIndexRecordSuccess(res.records)
		})
		.catch(onRecordFailure)
})

// embed in "add album button"
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
			.catch(onRecordFailure)
})

// SHOW RECORD
indexRecordContainer.addEventListener('click', (event) => {
	if (event.target.classList.contains('show-button')) {
		reIndexRecordsButton.addEventListener('click', reIndexRecords)
		deleteLinerNoteContainer.style.display = "block"
		reIndexRecordsButton.style.display = "block"
		const id = event.target.getAttribute('data-id')
		console.log(id)

		if (!id) return

		showRecord(id)
				.then((res) => res.json())
				.then((res) => onShowRecordSuccess(res.record))
				.then(onHideIndexSuccess)
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

// Create liner note form will only show when an album is selected and the
// "add liner note button is clicked"


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


/*

const d = new Date();
document.getElementById("demo").innerHTML = d.toDateString();


*/