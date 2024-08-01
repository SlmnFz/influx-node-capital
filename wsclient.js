// @ts-check
const WebSocket = require('ws');

/**
 * WebSocket Client to receive live data.
 */
class WebSocketClient {
    /**
     * Creates a WebSocket client instance.
     * @param {string} url - The WebSocket server URL.
     * @param {Object} headers - The WebSocket headers.
     * @param {Array} channels - The channels to subscribe.
     * @param {(data: Object, symbol: string) => void} onData - Callback to handle incoming data.
     */
    constructor(url, headers, channels, onData) {
        this.url = url;
        this.headers = headers;
        this.channels = channels;
        this.onData = onData;
    }

    /**
     * Connects to the WebSocket server.
     */
    connect() {
        this.ws = new WebSocket(this.url, {
            headers: this.headers,
        });

        this.ws.on('open', () => {
            console.log('WebSocket connection opened');
            this.sendSubscriptionMessages();
        });

        this.ws.on('message', (data) => {
            // @ts-ignore
            this.handleMessage(data);
        });

        this.ws.on('close', () => {
            console.log('WebSocket connection closed');
            this.connect();
        });

        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    /**
     * Sends subscription messages to the WebSocket server.
     */
    sendSubscriptionMessages() {
        this.channels.forEach(channel => {
            const subscriptionMessage = {
                event: 'pusher:subscribe',
                data: {
                    auth: '',
                    channel: channel.channel,
                },
            };
            // @ts-ignore
            this.ws.send(JSON.stringify(subscriptionMessage));
        });
    }

    /**
     * Handles incoming WebSocket messages.
     * @param {Buffer} data - The received data.
     */
    handleMessage(data) {
        try {
            const message = data.toString(); // Convert buffer to string
            const parsedMessage = JSON.parse(message); // Parse the string to JSON
            const { channel, event } = parsedMessage;
            if (event !== 'pusher_internal:subscription_succeeded' && event !== 'pusher:connection_established') {
                const parsedData = JSON.parse(parsedMessage.data);
                const findedChannel = this.channels.find(el => el.channel === channel);
                // console.log(findedChannel.symbol, parsedData);
                this.onData(parsedData, findedChannel.symbol);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }
}

module.exports = WebSocketClient;
