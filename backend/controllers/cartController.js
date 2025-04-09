const pool = require('../database');

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await pool.query('DELETE FROM cart WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};