const express = require("express");

const app = express();
app.use(express.json()); // Middleware to handle JSON requests

// Default route to prevent "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// GET Endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// POST Endpoint
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

        res.json({
            is_success: true,
            user_id: "dinky2302",
            email: "dinkyykhurana23@gmail.com",
            roll_number: "22bcs11151",
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// Use Render's assigned port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
