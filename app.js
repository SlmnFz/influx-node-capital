// @ts-check
const WebSocketClient = require('./wsclient');
const InfluxDBClient = require('./influxdb');

const forexChannels = require('./forex');

const WS_URL = 'wss://pusher-cc.backend-capital.com/app/app_key?protocol=7&client=js&version=7.4.0&flash=false';
const INFLUX_URL = 'http://localhost:8086';
const INFLUX_TOKEN = 'hf0MPt5XYXIRuaq2IY5gu6FuuflcmASdBkN2ozKGZiruESRhNzZ1ytWAFaEU5ryDrxwcxwLPF0w0UI2V17IafQ==';
const INFLUX_ORG = 'fz';
const INFLUX_BUCKET = 'project';

// const INFLUX_TOKEN = 'ezlicHo-Ak_fA9-jhWv1lRFooOR0aZaA3nXpP0xAMZIW8AhkzUKQ5aoRd43XEzLwDn-cg0pQeluHQmfGhe7Vvg==';

const headers = {
    'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,fa-IR;q=0.7,fa;q=0.6',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'sec-websocket-extensions': 'permessage-deflate; client_max_window_bits',
    'sec-websocket-key': 'tShe/9ztV7GQAvN/UfaVKw==',
    'sec-websocket-version': '13'
};

const influxClient = new InfluxDBClient(INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET);

/**
 * Handles incoming WebSocket data and writes it to InfluxDB.
 * @param {Object} data - The received data.
 * @param {string} symbol - The symbol associated with the data.
 */
const handleData = (data, symbol) => {
    influxClient.writeData(data, symbol);
};

async function main() {
    const wsclient = new WebSocketClient(WS_URL, headers, forexChannels, handleData);
    wsclient.connect();
}

main();
