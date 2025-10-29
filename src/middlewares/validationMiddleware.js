export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });

    if (!emailRegex.test(email))
        return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 6)
        return res.status(400).json({ message: "Password must be at least 6 characters" });

    next();
};

export const validateAmount = (req, res, next) => {
    const { amount } = req.body;
    if (!amount || amount <= 0)
        return res.status(400).json({ message: "Invalid amount" });
    next();
};
