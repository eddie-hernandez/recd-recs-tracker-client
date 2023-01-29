// RECORDS

const indexRecordContainer = document.querySelector('#index-record-container')
const recordMessage = document.querySelector('#record-message')
const showRecordContainer = document.querySelector('#show-record-container')


// accessing the rating would look like this!!
// record.linerNotes[0].rating


export const onIndexRecordSuccess = (records) => {
    indexRecordContainer.style.display = "block"
    records.forEach(record => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h2 id="show-record">${record.artistName} - ${record.albumTitle}</h2>
            <button id="show-button" data-id="${record._id}">Show Record</button>
        `
        indexRecordContainer.appendChild(div)
    })
}

export const onHideRecordSuccess = () => {
    indexRecordContainer.style.display = "none"
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
        <h2 id="show-record"><b>"${record.albumTitle}"</b></h2>
        <h5>Artist Name: <b>${record.artistName}</b></h5>
        <h5>Year Released: <b>${record.yearReleased}</b></h5>
        <h5>Comments: <b><i>"${record.comments}"</i></b></h5></br>

        <div class="record-form-container">
            <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#record-form" aria-expanded="false" aria-controls="row" id="edit-record-button">Edit Record Info</button></br></br>
                <form id="record-form" class="collapse" data-id="${record._id}">
                    <div class="form-floating">
                        <input type="text" name="albumTitle" id="albumTitle" value="${record.albumTitle}" class="form-control" />
                        <label for="albumTitle" class="form-label" class="form-control">Album Title</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="artistName" id="artistName" value="${record.artistName}" class="form-control" />
                        <label for="artistName" class="form-label" class="form-control">Artist Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="number" name="yearReleased" id="yearReleased" value="${record.yearReleased}" class="form-control" />
                        <label for="yearReleased" class="form-label" class="form-control">Year Released</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="comments" id="comments" value="${record.comments}" class="form-control" />
                        <label for="comments" class="form-label" class="form-control">Comments (if any)</label>
                    </div></br>
                        <input type="submit" value="Update Record Info" /></br></br>
                </form>
        </div>
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

    if (record.linerNotes.length == 1) {

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

    else {
        const linerNoteDiv = document.createElement('div')
        linerNoteDiv.innerHTML = `
            <h4 id="show-liner-note"><b><i>Finished Listening?</i></b></h4></br>
            <div class="liner-note-form-container">
            <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#create-liner-note-form" aria-expanded="false" aria-controls="row" id="edit-record-button">Add Liner Note</button></br></br>
                <form id="create-liner-note-form" class="collapse">
                    <div class="form-floating">
                        <input type="number" name="rating" id="rating" placeholder="add rating here" class="form-control" />
                        <label for="rating" class="form-label" class="form-control">Record Rating (1-10)</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="standoutTrack" id="standoutTrack" placeholder="add standout track here" class="form-control" />
                        <label for="standoutTrack" class="form-label" class="form-control">Standout Track</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="thoughts" id="thoughts" placeholder="add any thoughts on the record here" class="form-control" />
                        <label for="thoughts" class="form-label" class="form-control">Thoughts? (if any)</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="recordId" id="recordId" value="${record._id}" class="form-control" disabled />
                        <label for="recordId" class="form-label" class="form-control">Record ID</label>
                    </div></br>
                        <input type="submit" value="Add Liner Note" /></br></br>
                </form>
            </div>
        `

/*

// UPDATE LINER NOTE FORMAT
            <form data-id="${record.linerNotes[0]._id}">
                <input type="number" name="rating" value="${record.linerNotes[0].rating}" />
                <input type="text" name="standoutTrack" value="${record.linerNotes[0].standoutTrack}" />
                <input type="text" name="thoughts" value="${record.linerNotes[0].thoughts}" />
                <input type="text" name="recordId" value="${record._id}" disabled /></br></br>
                <input type="submit" value="Update Liner Note" /></br>
            </form>
*/
        showRecordContainer.appendChild(linerNoteDiv)
    }
}


export const onUpdateRecordSuccess = () => {
    recordMessage.innerHTML = `<b><i>Record Successfully Updated!</i></b>`
}

export const onDeleteRecordSuccess = () => {
    recordMessage.innerHTML = `<b><i>Record deletion successful!</i></b>`
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