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

const seedData = `
    INSERT INTO nails (name, shape, length, color, effect, price, image) VALUES
    ('Rosy Almond',       'A', 'M', 'P', 'G', '$45', 'AMPG.png'),
    ('Midnight Coffin',   'C', 'L', 'B', 'M', '$55', 'CLBM.png'),
    ('Sapphire Stiletto', 'S', 'L', 'S', 'A', '$50', 'SLSA.png'),
    ('Pink Shimmer',      'A', 'S', 'P', 'S', '$40', 'ASPS.png');
`

const setup = async () => {
    await pool.query(createTable)
    console.log('Table created')
    await pool.query(seedData)
    console.log('Seed data inserted')
    pool.end()
}

setup()