import { pool } from '../config/database.js'

const createNails = async (req, res) => {
    try {
        const { name, shape, length, color, effect, price, image } = req.body
        const result = await pool.query(
            'INSERT INTO nails (name, shape, length, color, effect, price, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, shape, length, color, effect, price, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

const getNails = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM nails ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

const getNailsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query('SELECT * FROM nails WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

const editNails = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, shape, length, color, effect, price, image } = req.body
        const result = await pool.query(
            'UPDATE nails SET name = $1, shape = $2, length = $3, color = $4, effect = $5, price = $6, image = $7 WHERE id = $8',
            [name, shape, length, color, effect, price, image, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

const deleteNails = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query('DELETE FROM nails WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

export default {
    createNails,
    getNails,
    getNailsById,
    editNails,
    deleteNails
}