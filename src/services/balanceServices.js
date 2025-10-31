import pool from "../config/db.js";

// GET user balance
export const getBalance = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT balance FROM users WHERE id = ?",
      [req.user.id]
    );
    if (!rows.length)
      return res.status(404).json({ message: "User not found" });
    res.json({ balance: rows[0].balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST Top-up balance
export const topUp = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid top-up amount" });

    await pool.execute(
      "UPDATE users SET balance = balance + ? WHERE id = ?",
      [amount, req.user.id]
    );

    await pool.execute(
      "INSERT INTO transactions (user_id, type, amount, description) VALUES (?, 'TOPUP', ?, ?)",
      [req.user.id, amount, `Top-up Rp${amount}`]
    );

    res.json({ message: "Top-up successful", amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const makeTransaction = async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    // user balance
    const [user] = await pool.execute(
      "SELECT balance FROM users WHERE id = ?",
      [req.user.id]
    );
    if (!user.length)
      return res.status(404).json({ message: "User not found" });

    const currentBalance = parseFloat(user[0].balance);
    if (currentBalance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    // check
    const [updateResult] = await pool.execute(
      "UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?",
      [amount, req.user.id, amount]
    );

    if (updateResult.affectedRows === 0)
      return res.status(400).json({ message: "Transaction failed (not enough balance)" });

    await pool.execute(
      "INSERT INTO transactions (user_id, type, amount, description) VALUES (?, 'payment', ?, ?)",
      [req.user.id, amount, description || "Transaction payment"]
    );

    // Get new balance
    const [updated] = await pool.execute(
      "SELECT balance FROM users WHERE id = ?",
      [req.user.id]
    );

    res.json({
      message: "Transaction successful",
      amount,
      new_balance: updated[0].balance
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
