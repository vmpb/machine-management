const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Define your API endpoints here, e.g., GET, POST, PUT, DELETE.

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM machines ORDER BY created_at DESC');
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
  const { name, tag_number, serial_number, type, so, siteid, cccref } = req.body;
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


router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('DELETE FROM machines WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Machine with ID ${id} not found` });
    }
    res.json({ message: `Machine with ID ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, tag_number, serial_number, type, so, siteid, cccref } = req.body;
  try {
    const result = await db.query(
      'UPDATE machines SET name=$1, tag_number=$2, serial_number=$3, type=$4, so=$5, siteid=$6, cccref=$7 WHERE id=$8 RETURNING *',
      [name, tag_number, serial_number, type, so, siteid, cccref, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Machine with ID ${id} not found` });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
