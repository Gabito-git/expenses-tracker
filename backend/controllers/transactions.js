const { pool } = require('../db/config');

const newTransaction = async( req, res ) => {

    const { concept, amount, date, category, typename } = req.body

    const newIncome = await pool.query("INSERT INTO transactions ( concept, amount, date, category, typename ) "+
    "VALUES($1, $2, $3, $4, $5) RETURNING *", [concept, amount, date, category, typename]);

    res.status(201).json({ ...newIncome.rows['0'] });
}

module.exports={
    newTransaction
}