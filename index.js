const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid"); // for generating unique IDs

app.use(bodyParser.urlencoded({ extended: true }));

// Store player IDs and their numbers
let playerNumbers = {};
let totalVisits = 0;

app.get("/", (req, res) => {
    totalVisits++;

    res.send(`
        <html>
        <head>
            <style>
                body { text-align:center; font-family:Arial; margin-top:50px; }
                input, button { font-size:16px; padding:5px; margin:5px; }
                .note { margin-top:20px; color:#555; }
            </style>
        </head>
        <body>
            <h1>Two-Player Guessing Game</h1>
            <p>Total Visits: ${totalVisits}</p>
            <h2>Player 1: Set your secret number (1-10)</h2>
            <form action="/set" method="POST">
                <input type="number" name="number" min="1" max="10" required>
                <button type="submit">Set Number</button>
            </form>

            <h2>Player 2: Guess the number</h2>
            <form action="/guess" method="POST">
                <input type="text" name="id" placeholder="Enter Player 1 ID" required>
                <input type="number" name="guess" min="1" max="10" required>
                <button type="submit">Guess</button>
            </form>

            <p class="note">🧠 Decode the game and win it — sharpen your mind!</p>
        </body>
        </html>
    `);
});

// Player 1 sets a number
app.post("/set", (req, res) => {
    const num = parseInt(req.body.number);
    if (num < 1 || num > 10) {
        return res.send("Number must be between 1 and 10!");
    }

    const id = uuidv4(); // unique ID for this number
    playerNumbers[id] = num;

    res.send(`
        <h1>Number set successfully!</h1>
        <p>Player 2 can now guess your number using this ID:</p>
        <b>${id}</b>
        <p><a href="/">Go back to Home</a></p>
    `);
});

// Player 2 guesses
app.post("/guess", (req, res) => {
    const id = req.body.id;
    const guess = parseInt(req.body.guess);

    if (!playerNumbers[id]) {
        return res.send("<h1>Invalid ID! Player 1 has not set a number yet.</h1><a href='/'>Go Home</a>");
    }

    if (guess === playerNumbers[id]) {
        // correct guess
        delete playerNumbers[id]; // reset after correct guess
        res.send(`
            <h1 style="color:green">🎉 Congratulations! You guessed correctly! 🎉</h1>
            <p>The secret number was: <b>${guess}</b></p>
            <p><a href="/">Play Again</a></p>
        `);
    } else {
        res.send(`
            <h1 style="color:red">😢 Wrong guess!</h1>
            <p>Try again!</p>
            <p><a href="/">Go Back</a></p>
        `);
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
