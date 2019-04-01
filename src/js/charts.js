import API from './api.js';
import Chart from 'chart.js';
import Colors from './colors.js';

let Data = {
    oneDayData: null,
    allTimeData: null,
};

function processRawOneDayData(records, activeKeyphrases) {
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

            // don't count if keyphrase is not active
            if (!activeKeyphrases.includes(candidate)) continue; 

            let tweetCount = payload.keyphrases[candidate].twitter.tweet_count;
            let percent = tweetCount;
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
    let initialCandidates = ["Joe Biden", "Bernie Sanders", "Kamala Harris"];
    let result = [];
    for (let i=0; i < candidates.length; i++) {
        let candidate = candidates[i];
        let hidden = !initialCandidates.includes(candidate);
        result.push({
            label: candidate,
            data: datasets[candidate],
            hidden: hidden,
            fill: false,
            borderColor: Object.values(Colors.names)[i]
        });
    } 

    return result;
}

function processRawAllTimeData(records, activeKeyphrases) {
    let datasets = {};
    for (let i=0; i < records.length; i++) {
        let payload = records[i];
        // Skip record if payload is empty
        if (
            (payload == null) || (Object.entries(payload).length === 0)) {
            continue
        }

        let candidates = activeKeyphrases;
        for (let j=0; j < candidates.length; j++) {
            let candidate = candidates[j];

            let tweetCount = payload[candidate];
            let percent = tweetCount;

            let dateComps = payload["Date"].split('-');
            console.log(parseInt(dateComps[0]));
            /*
            let d = dayjs()
                .month(parseInt(dateComps[0]))
                .day(parseInt(dateComps[1]))
                .year(parseInt(dateComps[2]));
            */
            let d = [dateComps[2], dateComps[0], dateComps[1]].join('-')
            console.log(d);

            let instance = {
                t: new Date(d), 
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
    let initialCandidates = ["Joe Biden", "Bernie Sanders", "Kamala Harris"];
    let result = [];
    for (let i=0; i < candidates.length; i++) {
        let candidate = candidates[i];
        let hidden = !initialCandidates.includes(candidate);
        result.push({
            label: candidate,
            data: datasets[candidate],
            hidden: hidden,
            fill: false,
            borderColor: Object.values(Colors.names)[i]
        });
    } 

    return result;
}

function gen24hData(activeKeyphrases) {
    // load 24h data
    return API.genLast24hRecords()
        .then(res => {
            if (!res || (res.length == 0)) {
                return;
            }

            return processRawOneDayData(res, activeKeyphrases);
        });
}

function genAllTimeData(activeKeyphrases) {
    // load all time data
    return API.genRecordsByDay()
        .then(res => {
            if (!res || (res.length == 0)) {
                return;
            }

            return processRawAllTimeData(res, activeKeyphrases);
        });
}

function renderChart(id, data, unit) {
    const ctx = id;    
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: data,
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: unit
                    }
                }],
                yAxes: [{
                    ticks: {
                        display: true
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
    // Make 24h chart invisible to start
    document.getElementById("chart-24h").style.display = "none";

    API.genKeyphrasesToDisplay().then(activeKeyphrases => {
        gen24hData(activeKeyphrases).then(res => {
            renderChart('chart-24h', res, 'hour');
        });
        genAllTimeData(activeKeyphrases).then(res => {
            renderChart('chart-all-time', res, 'day');
        });
    });
}

function showChart(id) {
    document.getElementById(
        id
    ).style.display = "block";
    let opposite = "chart-24h";
    if (id == opposite) opposite = "chart-all-time";
    document.getElementById(
        opposite
    ).style.display = "none";
}

const Charts = {
    load,
    showChart,
};

export default Charts;