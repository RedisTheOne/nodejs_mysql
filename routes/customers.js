const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.query('SELECT * FROM customers', (err, customers) => {
        if(err)
            res.json({
                status: false
            });
        else
            res.json({
                status: true,
                customers
            });
    });
});

router.post('/', (req, res) => {
    if(req.body.name && req.body.surname && req.body.bio) {
        const sql = `INSERT INTO customers(name, surname, bio) VALUES('${req.body.name}', '${req.body.surname}', '${req.body.bio}')`;
        db.query(sql, (err, result) => {
            if(err)
                res.json({
                    status: false,
                    msg: "User with this name and surname already exists"
                });
            else
                res.json({
                    status: true,
                    msg: "Customer addedd successfully"
                });
        });
    } else
        res.json({
            status: false,
            msg: 'Please insert required fields'
        });
});

router.put('/:id', (req, res) => {
    if(req.body.name && req.body.surname && req.body.bio) {
        const sql = `
            UPDATE customers
            SET name = '${req.body.name}', surname = '${req.body.surname}', bio = '${req.body.bio}'
            WHERE id = ${req.params.id}`
        ;
        db.query(sql, (err, result) => {
            if(err)
                res.json({
                    status: false,
                    msg: "Error occurred"
                });
            else
                res.json({
                    status: true,
                    msg: "Customer updated successfully"
                });
        });
    } else
        res.json({
            status: false,
            msg: "Please insert required fields"
        });
});

router.delete('/:id', (req, res) => {
    const sql = `
        DELETE FROM customers
        WHERE id = ${req.params.id}`
    ;
    db.query(sql, (err, result) => {
        if(err)
            res.json({
                status: false,
                msg: "Error occurred"
            });
        else
            res.json({
                status: true,
                msg: "Customer deleted successfully"
            });
    });
});

module.exports = router;