// @ts-check
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

/**
 * InfluxDB Client to store live data.
 */
class InfluxDBClient {
    /**
     * Creates an InfluxDB client instance.
     * @param {string} url - The InfluxDB server URL.
     * @param {string} token - The InfluxDB authentication token.
     * @param {string} org - The InfluxDB organization.
     * @param {string} bucket - The InfluxDB bucket.
     */
    constructor(url, token, org, bucket) {
        this.client = new InfluxDB({ url, token });
        this.writeApi = this.client.getWriteApi(org, bucket, 'ns');
    }

    /**
     * Writes data to InfluxDB.
     * @param {Object} data - The data to be written.
     * @param {string} symbol - The symbol for the data.
     */
    writeData(data, symbol) {
        const point = new Point('symbol_data')
            .tag('symbol', symbol)
            .timestamp(new Date(data.ts))
            .floatField('bid', data.bid)
            .floatField('ask', data.ask)
            .floatField('bidV', data.bidV)
            .floatField('askV', data.askV);

        this.writeApi.writePoint(point);
        console.log(`Data wrote at ${new Date().toTimeString()} for ${symbol}`);
        this.writeApi.flush().catch(err => console.error('Error flushing data: ', err));
    }
}

module.exports = InfluxDBClient;
