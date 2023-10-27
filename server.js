const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/contact-form', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create a schema for form submissions
const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Submission = mongoose.model('Submission', submissionSchema);

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML contact form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/data.html');
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const submission = new Submission({ name, email, message });

    submission.save((err) => {
        if (err) {
            console.error(err);
            res.send('Error submitting the form.');
        } else {
            res.send('Form submitted successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
