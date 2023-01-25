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
    recordMessageContainer.innerText = 'Update was successful :)'
}

export const onDeleteRecordSuccess = () => {
    recordMessageContainer.innerText = 'Record Deletion Successful :O!'
}







/*

// CAMPAIGNS

const indexCampaignContainer = document.querySelector('#index-campaign-container')
const campaignMessageContainer = document.querySelector('#campaign-message-container')
const showCampaignContainer = document.querySelector('#show-campaign-container')

export const onIndexCampaignSuccess = (campaigns) => {
    campaigns.forEach(campaign => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h2 id="show-campaign">${campaign.name}</h2>
            <button id="show-button" data-id="${campaign._id}" >Show Campaign</button>
        `
        indexCampaignContainer.appendChild(div)
    })
}

export const onCampaignFailure = (error) => {
    campaignMessageContainer.innerHTML = `
        <h2>You've got a campaign error! :(</h2>
        <p>${error}</p>
    `
}

export const onCreateCampaignSuccess = () => {
    campaignMessageContainer.innerText = 'You have created a campaign!! :)'
}

export const onShowCampaignSuccess = (campaign) => {
    const div = document.createElement('div')
    div.innerHTML = `
        <h2 id="show-campaign">${campaign.name}</h2>

        <form data-id="${campaign._id}">
            <input type="text" name="name" value="${campaign.name}" />
            <input type="submit" value="Update Campaign" />
        </form>

        <button data-id="${campaign._id}">Delete Campaign</button>
    `
    showCampaignContainer.appendChild(div)
    // document.getElementById("show-record").style.display = "none";
    // document.getElementById("show-campaign").style.display = "none";
    // document.getElementById("show-button").style.display = "none";
}

export const onUpdateCampaignSuccess = () => {
    campaignMessageContainer.innerText = 'The campaign has been successfully updated! :^ )'
}

export const onDeleteCampaignSuccess = () => {
    campaignMessageContainer.innerText = 'Campaign Deletion Successful :O!'
}

*/