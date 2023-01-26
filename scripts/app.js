import { 
	indexRecords,
	indexCampaigns,
	createRecord,
	createCampaign,
	showRecord,
	showCampaign,
	updateRecord,
	updateCampaign,
	deleteRecord,
	deleteCampaign,
} from './api.js'


import { 
	onIndexRecordSuccess,
	onIndexCampaignSuccess,
	onRecordFailure,
	onCampaignFailure,
	onCreateRecordSuccess,
	onCreateCampaignSuccess,
	onShowRecordSuccess, 
	onShowCampaignSuccess,
	onUpdateRecordSuccess,
	onUpdateCampaignSuccess,
	onDeleteRecordSuccess,
	onDeleteCampaignSuccess
} from './ui.js'

const createRecordForm = document.querySelector('#create-record-form')
const indexRecordContainer = document.querySelector('#index-record-container')
const showRecordContainer = document.querySelector('#show-record-container')


// RECORDS

indexRecords()
    .then(res => res.json())
    .then(res => {
        console.log(res)
        onIndexRecordSuccess(res.records)
    })
    .catch(onRecordFailure)


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

indexRecordContainer.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-id')
    console.log(id)

    if (!id) return

    showRecord(id)
			.then((res) => res.json())
			.then((res) => onShowRecordSuccess(res.record))
			.catch(onRecordFailure)
})

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

showRecordContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

    if (!id) return

	deleteRecord(id)
		.then(onDeleteRecordSuccess)
		.catch(onRecordFailure)
})

/*

// CAMPAIGN
const createCampaignForm = document.querySelector('#create-campaign-form')
const indexCampaignContainer = document.querySelector('#index-campaign-container')
const showCampaignContainer = document.querySelector('#show-campaign-container')

indexCampaigns()
    .then(res => res.json())
    .then(res => {
        console.log(res)
        onIndexCampaignSuccess(res.campaigns)
    })
    .catch(onCampaignFailure)


createCampaignForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const campaignData = {
			campaign: {
				name: event.target['name'].value,
			},
		}

    // console.log(campaignData)
    createCampaign(campaignData)
			.then(onCreateCampaignSuccess)
			.catch(onCampaignFailure)
})

indexCampaignContainer.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-id')
    // console.log(id)

    if (!id) return

    showCampaign(id)
			.then((res) => res.json())
			.then((res) => onShowCampaignSuccess(res.campaign))
			.catch(onCampaignFailure)
})

showCampaignContainer.addEventListener('submit', (event) => {
	event.preventDefault()

	const id = event.target.getAttribute('data-id')

	const campaignData = {
		campaign: {
			name: event.target['name'].value,
		},
	}

    if (!id) return

	updateCampaign(campaignData, id)
		.then(onUpdateCampaignSuccess)
		.catch(onCampaignFailure)
})

showCampaignContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

    if (!id) return

	deleteCampaign(id)
		.then(onDeleteCampaignSuccess)
		.catch(onCampaignFailure)
})

*/