import { pool } from './database.js'

const createTable = `
    DROP TABLE IF EXISTS nails;

    CREATE TABLE nails (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        shape VARCHAR(50) NOT NULL,
        length VARCHAR(50) NOT NULL,
        color VARCHAR(50) NOT NULL,
        effect VARCHAR(50) NOT NULL,
        price VARCHAR(50) NOT NULL,
        image VARCHAR(500) NOT NULL
    );
`