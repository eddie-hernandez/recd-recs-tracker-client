import { store } from './store.js'

// USER ACTION EXPORTS

export const signIn = (data) => {
	return fetch(`https://noted-inc.herokuapp.com/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signUp = (data) => {
	return fetch(`https://noted-inc.herokuapp.com/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

// RECORD CRUD ACTION EXPORTS

export const createRecord = (data) => {
    return fetch(`https://noted-inc.herokuapp.com/records`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const indexRecords = () => {
    return fetch(`https://noted-inc.herokuapp.com/records`, {
		headers: {
			'Authorization': `Bearer ${store.userToken}`,
		},
	})
}


export const showRecord = (id) => {
    return fetch(`https://noted-inc.herokuapp.com/records/${id}`, {
		headers: {
			'Authorization': `Bearer ${store.userToken}`,
		},
	})
}

export const updateRecord = (data, id) => {
    return fetch(`https://noted-inc.herokuapp.com/records/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecord = (id) => {
    return fetch(`https://noted-inc.herokuapp.com/records/${id}`, {
        method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${store.userToken}`,
		},
    })
}


// LINER NOTE CRUD ACTION EXPORTS

export const createLinerNote = (data) => {
    return fetch(`https://noted-inc.herokuapp.com/liner-notes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const updateLinerNote = (data, id) => {
    return fetch(`https://noted-inc.herokuapp.com/liner-notes/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteLinerNote = (data, id) => {
    return fetch(`https://noted-inc.herokuapp.com/liner-notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}