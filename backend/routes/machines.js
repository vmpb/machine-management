const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Define your API endpoints here, e.g., GET, POST, PUT, DELETE.
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM machines ORDER BY id ASC');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching machines' });
    }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM machines WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Machine with ID ${id} not found` });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
    const {
      name,
      tag_number,
      serial_number,
      type,
      so,
      siteid,
      cccref,
    } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO machines (name, tag_number, serial_number, type, so, siteid, cccref) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, tag_number, serial_number, type, so, siteid, cccref]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
