import { store } from './store.js'

// USER ACTION EXPORTS

// local host http://localhost:7777/
// heroku host https://pure-beach-20673.herokuapp.com/

export const signIn = (data) => {
	return fetch(`https://pure-beach-20673.herokuapp.com/sign-in`, {
		method: 'POST',
		headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777/sign-in',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signUp = (data) => {
	return fetch(`https://pure-beach-20673.herokuapp.com/sign-up`, {
		method: 'POST',
		headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

// RECORD CRUD ACTION EXPORTS

export const createRecord = (data) => {
    return fetch(`https://pure-beach-20673.herokuapp.com/records`, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const indexRecords = () => {
    return fetch(`https://pure-beach-20673.herokuapp.com/records`, {
		headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
			'Authorization': `Bearer ${store.userToken}`,
		},
	})
}


export const showRecord = (id) => {
    return fetch(`https://pure-beach-20673.herokuapp.com/records/${id}`, {
		headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
			'Authorization': `Bearer ${store.userToken}`,
		},
	})
}

export const updateRecord = (data, id) => {
    return fetch(`https://pure-beach-20673.herokuapp.com/records/${id}`, {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteRecord = (id) => {
    return fetch(`https://pure-beach-20673.herokuapp.com/records/${id}`, {
        method: 'DELETE',
		headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
			'Authorization': `Bearer ${store.userToken}`,
		},
    })
}


// LINER NOTE CRUD ACTION EXPORTS

export const createLinerNote = (data) => {
    return fetch(`https://pure-beach-20673.herokuapp.com/liner-notes`, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const updateLinerNote = (data, id) => {
    return fetch(`https://pure-beach-20673.herokuapp.com/liner-notes/${id}`, {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteLinerNote = (data, id) => {
    return fetch(`https://pure-beach-20673.herokuapp.com/liner-notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:7777',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}