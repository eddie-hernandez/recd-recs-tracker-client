// RECORD CRUD EXPORTS

export const indexRecords = () => {
    return fetch(`http://localhost:8000/records`)
}

export const createRecord = (data) => {
    return fetch(`http://localhost:8000/records`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const showRecord = (id) => {
    return fetch(`http://localhost:8000/records/${id}`)
}

export const updateRecord = (data, id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecord = (id) => {
    return fetch(`http://localhost:8000/records/${id}`, {
        method: 'DELETE'
    })
}


/*

// CAMPAIGN CRUD EXPORTS
export const indexCampaigns = () => {
    return fetch(`http://localhost:8000/campaigns`)
}

export const createCampaign = (data) => {
    return fetch(`http://localhost:8000/campaigns`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const showCampaign = (id) => {
    return fetch(`http://localhost:8000/campaigns/${id}`)
}

export const updateCampaign = (data, id) => {
    return fetch(`http://localhost:8000/campaigns/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteCampaign = (id) => {
    return fetch(`http://localhost:8000/campaigns/${id}`, {
        method: 'DELETE'
    })
}

*/