const { Router } = require('express');
const { pool } = require('../db/config');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validarCampos');
const { allowedTypes } = require('../helpers/db-validators');

const router = Router();


// router.get('/', async(req, res) => {

//     const transactions = await pool.query("SELECT * FROM incomes");
//     console.log(transactions.rows);

//     res.send({})

// })

router.post('/', [
    check('concept', 'Concept field is mandatory').not().isEmpty(),
    check('amount', 'Please provide a valid amount value').isFloat(),
    check('date', 'Please provide a valid date').isISO8601(),
    check('category', 'Category field is mandatory').not().isEmpty(),
    check('typename').custom( c => allowedTypes( c, ['income', 'expense'] ) ),
    validateFields
],async( req, res ) => {

    const { concept, amount, date, category, typename } = req.body

    const newIncome = await pool.query("INSERT INTO transactions ( concept, amount, date, category, typename ) "+
    "VALUES($1, $2, $3, $4, $5) RETURNING *", [concept, amount, date, category, typename]);

    res.json({ ...newIncome.rows['0'] });
} )

module.exports = router;