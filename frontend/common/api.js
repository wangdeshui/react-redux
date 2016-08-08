import config from './config'
import fetch from 'isomorphic-fetch'

function parseJSON(response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json()
    } else {
        return response.text()
    }
}

function requestError(error) {
    console.error(error)
}

export default {
    get: (address, args) => {
        var url = new URL(config.apiAddress + address)
        if (args) {
            let {params} = args
            if (params) {
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            }
        }

        return fetch(url).then(parseJSON).catch(requestError)
    },
    put: (address, body) => {
        let url = config.apiAddress + address
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(parseJSON).catch(requestError)
    },
    post: (address, body) => {
        let url = config.apiAddress + address
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(parseJSON).catch(requestError)
    },
    delete: (address, args) => {
        var url = new URL(config.apiAddress + address)
        if (args) {
            let {params} = args
            if (params) {
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            }
        }

        return fetch(url, { method: 'DELETE' }).then(parseJSON).catch(requestError)
    }
}