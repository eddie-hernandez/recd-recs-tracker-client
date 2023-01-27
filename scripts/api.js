// RECORD CRUD EXPORTS

export const createRecord = (data) => {
    return fetch(`http://localhost:7777/records`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const indexRecords = () => {
    return fetch(`http://localhost:7777/records`)
}

export const showRecord = (id) => {
    return fetch(`http://localhost:7777/records/${id}`)
}

export const updateRecord = (data, id) => {
    return fetch(`http://localhost:7777/records/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecord = (id) => {
    return fetch(`http://localhost:7777/records/${id}`, {
        method: 'DELETE'
    })
}


// LINER NOTE CRUD EXPORTS

export const createLinerNote = (data) => {
    return fetch(`http://localhost:7777/liner-notes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const showLinerNote = (id) => {
    return fetch(`http://localhost:7777/liner-notes/${id}`)
}

export const updateLinerNote = (data, id) => {
    return fetch(`http://localhost:7777/liner-notes/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const deleteLinerNote = (id) => {
    return fetch(`http://localhost:7777/liner-notes/${id}`, {
        method: 'DELETE'
    })
}