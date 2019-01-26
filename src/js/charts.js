import API from './api.js';
import Chart from 'chart.js';
import Colors from './colors.js';

let Data = {
    oneDayData: null,
    allTimeData: null,
};

function processRawOneDayData(records) {
    let datasets = {};
    for (let i=0; i < records.length; i++) {
        let record = records[i];
        let payload = record.payload;
        // Skip record if payload is empty
        if (
            (payload == null) || (Object.entries(payload).length === 0)) {
            continue
        }

        // get total tweets (for proportion calculation)
        let total_tweet_count = payload.total_tweet_count;

        let candidates = Object.keys(payload.keyphrases);
        for (let j=0; j < candidates.length; j++) {
            let candidate = candidates[j];
            let tweetCount = payload.keyphrases[candidate].twitter.tweet_count;
            let percent = tweetCount / total_tweet_count * 100;
            let instance = {
                t: record.time_created, 
                y: percent
            };

            if (datasets[candidate] == null) {
                datasets[candidate] = [instance];
            } else {
                datasets[candidate].push(
                    instance
                );
            }
        }
    }

    // unpack object into dataset array appropriate format for Chart.js
    let candidates = Object.keys(datasets);
    let result = [];
    for (let i=0; i < candidates.length; i++) {
        let candidate = candidates[i];
        result.push({
            label: candidate,
            data: datasets[candidate],
            hidden: true,
            fill: false,
            borderColor: Colors.random()
        });
    } 

    return result;
}

function genData() {
    // load 24h data
    return API.genLast24hRecords()
        .then(res => {
            if (!res || (res.length == 0)) {
                return;
            }

            return processRawOneDayData(res);
        });
}

function render24hChart(id, data) {
    const ctx = id;    
    let chart24h = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: data,
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                },
                point: {
                    radius: 0
                },
            },
            legend: {
                position: 'bottom',
                labels: {
                    fontFamily: '"Inter UI", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
                    fontSize: 16,
                    padding: 20
                },
            },
            spanGaps: true,
            responsive: true,	
        }
    });
}

function renderCharts(data24h) {
    render24hChart('chart-24h', data24h);
}

function load() {
    genData().then(res => {
        console.log(res);
        renderCharts(res);
    });
}

const Charts = {
    load,
};

export default Charts;