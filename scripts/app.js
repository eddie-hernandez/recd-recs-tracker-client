import { 
	indexRecords,
	createRecord,
	showRecord,
	updateRecord,
	deleteRecord,
	createLinerNote,
	showLinerNote,
	updateLinerNote,
	deleteLinerNote,
} from './api.js'


import { 
	onRecordFailure,
	onIndexRecordSuccess,
	onCreateRecordSuccess,
	onShowRecordSuccess, 
	onUpdateRecordSuccess,
	onDeleteRecordSuccess,
	onLinerNoteFailure,
	onCreateLinerNoteSuccess,
	// onShowLinerNoteSuccess,
	onUpdateLinerNoteSuccess,
	onDeleteLinerNoteSuccess,
} from './ui.js'

const createRecordForm = document.querySelector('#create-record-form')
const indexRecordContainer = document.querySelector('#index-record-container')
const showRecordContainer = document.querySelector('#show-record-container')


// RECORDS

// INDEX
indexRecords()
    .then(res => res.json())
    .then(res => {
        console.log(res)
        onIndexRecordSuccess(res.records)
    })
    .catch(onRecordFailure)


// embed in "add album button"
// CREATE
// createRecordForm.addEventListener('submit', (event) => {
//     event.preventDefault()

//     const recordData = {
// 			record: {
// 				albumTitle: event.target['albumTitle'].value,
// 				artistName: event.target['artistName'].value,
// 				yearReleased: event.target['yearReleased'].value,
// 				comments: event.target['comments'].value,
// 			},
// 		}

//     console.log(recordData)
//     createRecord(recordData)
// 			.then(onCreateRecordSuccess)
// 			.catch(onRecordFailure)
// })

// SHOW
indexRecordContainer.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-id')
    console.log(id)

    if (!id) return

    showRecord(id)
			.then((res) => res.json())
			.then((res) => onShowRecordSuccess(res.record))
			.catch(onRecordFailure)
})

// UPDATE
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

// DELETE
showRecordContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

    if (!id) return

	deleteRecord(id)
		.then(onDeleteRecordSuccess)
		.catch(onRecordFailure)
})

// LINER NOTES

const createLinerNoteForm = document.querySelector('#create-liner-note-form')
const showLinerNoteContainer = document.querySelector('#show-liner-note-container')

// Create liner note form will only show when an album is selected and the
// "add liner note button is clicked"

// CREATE
// createLinerNoteForm.addEventListener('submit', (event) => {
//     event.preventDefault()
// 	const id = event.target.getAttribute('data-id')

//     const linerNoteData = {
// 			linerNote: {
// 				rating: event.target['rating'].value,
// 				standoutTrack: event.target['standoutTrack'].value,
// 				thoughts: event.target['thoughts'].value,
// 				recordId: id
// 			},
// 		}

//     console.log(linerNoteData)
//     createLinerNote(linerNoteData)
// 			.then(onCreateLinerNoteSuccess)
// 			.catch(onLinerNoteFailure)
// })

// SHOW
// showLinerNoteContainer.addEventListener('submit', (event) => {
//     const id = event.target.getAttribute('data-id')
//     console.log(id)

//     if (!id) return

//     showLinerNote(id)
// 			.then((res) => res.json())
// 			.then((res) => onShowLinerNoteSuccess(res.linerNote))
// 			.catch(onRecordFailure)
// })

// UPDATE LINER NOTE
showRecordContainer.addEventListener('submit', (event) => {
	event.preventDefault()

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
})

// // DELETE
// showLinerNoteContainer.addEventListener('click', (event) => {
// 	const id = event.target.getAttribute('data-id')

//     if (!id) return

// 	deleteLinerNote(id)
// 		.then(onDeleteLinerNoteSuccess)
// 		.catch(onLinerNoteFailure)
// })


/*

const d = new Date();
document.getElementById("demo").innerHTML = d.toDateString();


*/