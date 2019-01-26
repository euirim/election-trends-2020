import request from './request.js';


function genLast24hRecords() {
    return request({
        url: '/records/',
        method: 'GET'
    });
}

const API = {
    genLast24hRecords,
}

export default API;