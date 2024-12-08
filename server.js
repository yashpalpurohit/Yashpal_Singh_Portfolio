const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const port = 3020;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connection successful");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Define the schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    Subject: { type: String, required: true },
    Message: { type: String, required: true },
});

// Create the model
const Users = mongoose.model("data", userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
    try {
        const { name, email , Subject , Message } = req.body;

        // Create and save user data
        const user = new Users({
            name,
            email,
            Subject,
            Message
        });

        await user.save();
        console.log("User saved:", user);

        res.send("Form submission successful!");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("An error occurred while submitting the form.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
