const express = require('express');
const mysql = require('mysql');
require('dotenv').config();


// creating connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');

});

// show entries
app.get('/cargos', (req, res) => {
    let sql = `SELECT * FROM cargoTable`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('GET REQUEST ALL DATA');
        res.status(200).send(result);
    })
});

app.get('/cargos/:id', (req, res) => {
    let cargoId = req.params.id;
    let sql = `SELECT * FROM cargoTable WHERE id = ?`;
    db.query(sql, cargoId, (err, result) => {
        if (err) throw err;
        console.log('GET REQUEST WITH ID');
        res.send(result);
    })
});

app.post('/addNewCargo', (req, res) => {
    let postCargo = {
        mode: req.body.mode,
        movementType: req.body.movementType,
        incoterm: req.body.incoterm,
        originCountry: req.body.originCountry,
        originCity: req.body.originCity,
        destinationCountry: req.body.destinationCountry,
        destinationCity: req.body.destinationCity,
        zipCode: req.body.zipCode,
        packageType: req.body.packageType,
        quantity: req.body.quantity,
        volume: req.body.volume,
        volumeUnit: req.body.volumeUnit,
        weight: req.body.weight,
        weightUnit: req.body.weightUnit,
        cargoDescription: req.body.cargoDescription,
        currency: req.body.currency,
        hazardousMaterial: req.body.hazardousMaterial,
        eventCargo: req.body.eventCargo,
        personalGoods: req.body.personalGoods
    };




    let sql = 'INSERT INTO cargoTable SET ?';
    db.query(sql, postCargo, (err, result) => {
        if (err) throw err;
        console.log('POST REQUEST');
        res.status(200).send(result);
    })
});


const port = 3000;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})