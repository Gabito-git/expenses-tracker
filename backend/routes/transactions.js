const { Router } = require('express');
const { check } = require('express-validator');

const validateFields = require('../middlewares/validarCampos');
const { allowedTypes } = require('../helpers/db-validators');
const { newTransaction } = require('../controllers/transactions');

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
], newTransaction )

module.exports = router;