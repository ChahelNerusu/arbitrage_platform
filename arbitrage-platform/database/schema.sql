CREATE TABLE opportunities (
    id SERIAL PRIMARY KEY,
    asset VARCHAR(50) NOT NULL,
    exchange_a VARCHAR(50) NOT NULL,
    exchange_b VARCHAR(50) NOT NULL,
    spread DECIMAL(10, 4) NOT NULL,
    estimated_profit DECIMAL(10, 4) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);