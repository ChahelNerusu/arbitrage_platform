# Arbitrage Platform Backend

## Overview
This backend service is designed to support the Arbitrage Platform by providing real-time data on arbitrage opportunities across various cryptocurrency exchanges. It fetches price data, calculates potential profits, and serves this information through a RESTful API.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/arbitrage-platform.git
   ```
2. Navigate to the backend directory:
   ```
   cd arbitrage-platform/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the backend server, run:
```
npm start
```
The server will be running on `http://localhost:5000` by default.

## API Endpoints
- **GET /api/opportunities**: Fetches a list of arbitrage opportunities.
- **GET /api/opportunities/:id**: Fetches details of a specific arbitrage opportunity by ID.

## Data Collection
The backend collects data from various cryptocurrency exchanges using their APIs. The data fetching logic is implemented in `src/data/fetchExchanges.js`.

## Models
The Opportunity model is defined in `src/models/opportunity.js`, which includes properties such as:
- `asset`
- `exchangeA`
- `exchangeB`
- `spread`
- `estimatedProfit`
- `lastUpdated`

## Utilities
Utility functions for calculating net profit and spreads are located in `src/utils/calculator.js`.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.