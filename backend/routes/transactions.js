const { Router } = require('express');
const { pool } = require('../db/config');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validarCampos');

const router = Router();


// router.get('/', async(req, res) => {

//     const transactions = await pool.query("SELECT * FROM incomes");
//     console.log(transactions.rows);

//     res.send({})

// })

router.post('/incomes', [
    check('concept', 'Concept field is mandatory').not().isEmpty(),
    check('amount', 'Please provide a valid amount value').isFloat(),
    check('date', 'Please provide a valid date').isISO8601(),
    validateFields
],async( req, res ) => {

    const { concept, amount, date } = req.body

    const newIncome = await pool.query("INSERT INTO incomes ( concept, amount, date ) "+
    "VALUES($1, $2, $3) RETURNING *", [concept, amount, date]);

    res.json({ ...newIncome.rows['0'] });
} )

module.exports = router;