const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/machine/:machineId', async (req, res) => {
    const machineId = req.params.machineId;
    try {
        const result = await db.query('SELECT * FROM deliveries WHERE machine_id = $1', [machineId]);
        if (result.rows.length === 0) {
            res.status(200).json([]);
        } else {
            res.status(200).json(result.rows);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
