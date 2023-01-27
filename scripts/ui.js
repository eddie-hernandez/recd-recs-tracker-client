// RECORDS

const indexRecordContainer = document.querySelector('#index-record-container')
const recordMessageContainer = document.querySelector('#record-message-container')
const showRecordContainer = document.querySelector('#show-record-container')


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
    const div = document.createElement('div')
    div.innerHTML = `
        <h2 id="show-record">${record.albumTitle}</h2>
        <p>${record.artistName}</p>
        <p>${record.yearReleased}</p>
        <p>${record.comments}</p>

        <form data-id="${record._id}">
            <input type="text" name="albumTitle" value="${record.albumTitle}" />
            <input type="text" name="artistName" value="${record.artistName}" />
            <input type="number" name="yearReleased" value="${record.yearReleased}" />
            <input type="text" name="comments" value="${record.comments}" />
            <input type="submit" value="Update Record" />
        </form>

        <button data-id="${record._id}">Delete Record</button>
    `
    showRecordContainer.appendChild(div)
    // document.getElementById("show-record").style.display = "none";
    // document.getElementById("show-campaign").style.display = "none";
    // document.getElementById("show-button").style.display = "none";
    
    // hide indexed content
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
    linerNoteMessageContainer.innerHTML = `
        <h2>You've got a liner note error! :(</h2>
        <p>${error}</p>
    `
}

export const onCreateLinerNoteSuccess = () => {
    linerNoteMessageContainer.innerText = `You've just created a liner note!! :)`
}

export const onShowLinerNoteSuccess = (record) => {
    const div = document.createElement('div')
    div.innerHTML = `
        <h2 id="show-liner-note">${record.linerNote.rating}</h2>
        <p>${record.linerNote.rating}</p>
        <p>${record.linerNote.standoutTrack}</p>
        <p>${record.linerNote.thoughts}</p>
        <p>${record.linerNote.edited}</p>

        <form data-id="${record._id}">
            <input type="text" name="rating" value="${record.linerNote.rating}" />
            <input type="text" name="standoutTrack" value="${record.linerNote.standoutTrack}" />
            <input type="number" name="thoughts" value="${record.linerNote.thoughts}" />
            <input type="submit" value="Update Liner Note" />
        </form>

        <button data-id="${record.linerNote._id}">Delete Liner Note</button>
    `
    showLinerNoteContainer.appendChild(div)
}

export const onUpdateLinerNoteSuccess = () => {
    linerNoteMessageContainer.innerText = `You've edited a liner note! :)`
}

export const onDeleteLinerNoteSuccess = () => {
    linerNoteMessageContainer.innerText = `You just deleted a liner note! :O`
}