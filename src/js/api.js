import request from './request.js';


function genLast24hRecords() {
    return request({
        url: '/records/',
        method: 'GET'
    });
}

function genRecordsByDay() {
    return request({
        url: '/consolidated-records/',
        method: 'GET'
    });
}

function genKeyphrasesToDisplay() {
    return request({
        url: '/keyphrases/',
        method: 'GET'
    });
}

const API = {
    genLast24hRecords,
    genRecordsByDay,
    genKeyphrasesToDisplay,
}

export default API;