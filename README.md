# Data to InfluxDB

This project demonstrates how to fetch real-time financial data  and store it in InfluxDB using Node.js. The application uses WebSocket to receive data and InfluxDB to store time-series data.

## Features

- Fetch real-time financial data via WebSocket.
- Store the data in InfluxDB for efficient time-series management.

## Getting Started

### Prerequisites

- Node.js 
- InfluxDB server running locally or remotely

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/SlmnFz/influx-node-capital.git
   cd influx-node-capital
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure the environment:**

   Update the WebSocket URL and InfluxDB connection details in the `index.js` file as needed:

   ```js
   const WS_URL = 'wss://pusher-cc.backend-capital.com/app/app_key?protocol=7&client=js&version=7.4.0&flash=false';
   const INFLUX_URL = 'http://localhost:8086';
   const INFLUX_TOKEN = 'your_influxdb_token_here';
   const INFLUX_ORG = 'your_org_name_here';
   const INFLUX_BUCKET = 'your_bucket_name_here';
   ```

4. **Run the application:**

   ```sh
   npm start
   ```

### Usage

- The application will connect to the WebSocket server, fetch real-time data, and write it to InfluxDB.
- Data will be stored with tags and fields including `bid`, `ask`, `bidV`, and `askV` for each symbol.