// RECORDS

const indexRecordContainer = document.querySelector('#index-record-container')
const recordMessageContainer = document.querySelector('#record-message-container')
const showRecordContainer = document.querySelector('#show-record-container')


// accessing the rating would look like this!!
// record.linerNotes[0].rating


export const onIndexRecordSuccess = (records) => {
    records.forEach(record => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h2 id="show-record">${record.artistName} - ${record.albumTitle}</h2>
            <button id="show-button" data-id="${record._id}" >Show Record</button>
        `
        indexRecordContainer.appendChild(div)
    })
}

export const onRecordFailure = (error) => {
    recordMessageContainer.innerHTML = `
        <h2>You've got a record error! :(</h2>
        <p>${error}</p>
    `
}

export const onCreateRecordSuccess = () => {
    recordMessageContainer.innerText = 'You have created a record!! :)'
}

export const onShowRecordSuccess = (record) => {
    const recordDiv = document.createElement('div')
    recordDiv.innerHTML = `
        <h2 id="show-record">Record Title: <b>"${record.albumTitle}"</b></h2>
        <h5>Artist Name: <b>${record.artistName}</b></h5>
        <h5>Year Released: <b>${record.yearReleased}</b></h5>
        <h5>Comments: <b><i>"${record.comments}"</i></b></h5></br>

        `
/*
        <form data-id="${record._id}">
            <input type="text" name="albumTitle" value="${record.albumTitle}" />
            <input type="text" name="artistName" value="${record.artistName}" />
            <input type="number" name="yearReleased" value="${record.yearReleased}" />
            <input type="text" name="comments" value="${record.comments}" />
            <input type="submit" value="Update Record" />
        </form>

        <button data-id="${record._id}">Delete Record</button></br></br>
    `

*/


    showRecordContainer.appendChild(recordDiv)

    const linerNoteDiv = document.createElement('div')
    linerNoteDiv.innerHTML = `
        <h4 id="show-liner-note"><b><i>Liner Notes:</i></b></h4>
        <h5>Album Rating: <b>${record.linerNotes[0].rating}/10</b></h5>
        <h5>Standout Track: <b>"${record.linerNotes[0].standoutTrack}"</b></h5>
        <h5>Thoughts: <b><i>"${record.linerNotes[0].thoughts}"</i></b></h5>
        `
/*


// UPDATE LINER NOTE FORM
        <form data-id="${record.linerNotes[0]._id}">
            <input type="number" name="rating" value="${record.linerNotes[0].rating}" />
            <input type="text" name="standoutTrack" value="${record.linerNotes[0].standoutTrack}" />
            <input type="text" name="thoughts" value="${record.linerNotes[0].thoughts}" />
            <input type="text" name="recordId" value="${record._id}" disabled /></br></br>
            <input type="submit" value="Update Liner Note" /></br>
        </form>

// DELETE LINER NOTE BUTTON
        <button data-id="${record.linerNotes[0]._id}">Delete Liner Note</button>
    `
*/
    showRecordContainer.appendChild(linerNoteDiv)
}

export const onUpdateRecordSuccess = () => {
    recordMessageContainer.innerText = 'Record update successful :)'
}

export const onDeleteRecordSuccess = () => {
    recordMessageContainer.innerText = 'Record deletion successful! :O'
}



// LINER NOTES

const linerNoteMessageContainer = document.querySelector('#liner-note-message-container')
const showLinerNoteContainer = document.querySelector('#show-liner-note-container')

export const onLinerNoteFailure = (error) => {
    recordMessageContainer.innerHTML = `
        <h2>You've got a liner note error! :(</h2>
        <p>${error}</p>
    `
}

export const onCreateLinerNoteSuccess = () => {
    linerNoteMessageContainer.innerText = `You've just created a liner note!! :)`
}

// export const onShowLinerNoteSuccess = (record) => {
//     const linerNoteDiv = document.createElement('div')
//     linerNoteDiv.innerHTML = `
//         <h2 id="show-liner-note">${record.linerNote.rating}</h2>
//         <p>${record.linerNote.rating}</p>
//         <p>${record.linerNote.standoutTrack}</p>
//         <p>${record.linerNote.thoughts}</p>
//         <p>${record.linerNote.edited}</p>

//         <form data-id="${record._id}">
//             <input type="text" name="rating" value="${record.linerNote.rating}" />
//             <input type="text" name="standoutTrack" value="${record.linerNote.standoutTrack}" />
//             <input type="number" name="thoughts" value="${record.linerNote.thoughts}" />
//             <input type="submit" value="Update Liner Note" />
//         </form>

//         <button data-id="${record.linerNote._id}">Delete Liner Note</button>
//     `
//     showLinerNoteContainer.appendChild(linerNoteDiv)
// }

export const onUpdateLinerNoteSuccess = () => {
    linerNoteMessageContainer.innerText = `You've edited a liner note! :)`
}

export const onDeleteLinerNoteSuccess = () => {
    linerNoteMessageContainer.innerText = `You just deleted a liner note! :O`
}