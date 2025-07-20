const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = 3000;

// --- DATABASE CONFIGURATION ---
// !!! IMPORTANT: Replace with your own MySQL credentials !!!
const dbConfig = {
    host: 'localhost',
    user: 'root', // your mysql username
    password: '', // your mysql password
    database: 'nft_db'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// --- API ENDPOINT ---
// Endpoint to get NFTs, with optional category filtering
app.get('/api/nfts', async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = 'SELECT * FROM nfts';
        const params = [];
        const whereClauses = [];

        // Handle category filter
        if (category && category !== 'All') {
            whereClauses.push('category = ?');
            params.push(category);
        }

        // Handle search filter
        if (search) {
            // Search in both title and creator fields
            whereClauses.push('(title LIKE ? OR creator LIKE ?)');
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        }
        
        // Combine WHERE clauses if any
        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        // Handle sorting
        switch (sort) {
            case 'price_asc':
                query += ' ORDER BY price ASC';
                break;
            case 'price_desc':
                query += ' ORDER BY price DESC';
                break;
            case 'recent':
            default:
                query += ' ORDER BY id DESC'; // Assuming higher ID is newer
                break;
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: 'Failed to fetch data from the database.' });
    }
});

// --- SERVE STATIC FILES ---
// Serve the HTML, CSS, JS, and asset files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});