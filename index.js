const express = require("express");
const app = express();

let visitCount = 0;

app.get("/", (req, res) => {
    visitCount++;

    const now = new Date();
    const seconds = now.getSeconds();

    // We show this to user (but do NOT reveal why)
    const displayNumber = seconds % 60;

    // Hidden win rule
    const winNumber = Math.floor(Math.random() * 60);

    const isWinner = displayNumber === winNumber;

    let message = "";
    let animation = "";

    if (isWinner) {
        message = "<h1 class='win'>🎉 Congratulations! You WON! 🎉</h1>";
        animation = `<div class="pulse"></div>`;
    } else {
        message = "<h1 class='lose'>😢 Ohh… your attempt failed. Try again!</h1>";
        animation = `<div class="shake"></div>`;
    }

    res.send(`
        <html>
        <head>
            <style>
                body {
                    text-align: center;
                    font-family: Arial;
                    margin-top: 50px;
                }

                .win {
                    color: green;
                    animation: glow 1s infinite alternate;
                }

                .lose {
                    color: red;
                    animation: fade 1s infinite alternate;
                }

                @keyframes glow {
                    from { text-shadow: 0 0 10px green; }
                    to { text-shadow: 0 0 20px lime; }
                }

                @keyframes fade {
                    from { opacity: 0.5; }
                    to { opacity: 1; }
                }

                .pulse {
                    width: 50px;
                    height: 50px;
                    background: green;
                    border-radius: 50%;
                    margin: 20px auto;
                    animation: pulseAnim 1s infinite;
                }

                @keyframes pulseAnim {
                    0% { transform: scale(1); opacity: 0.7; }
                    100% { transform: scale(1.3); opacity: 1; }
                }

                .shake {
                    width: 50px;
                    height: 50px;
                    background: red;
                    border-radius: 50%;
                    margin: 20px auto;
                    animation: shakeAnim 0.5s infinite;
                }

                @keyframes shakeAnim {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                    100% { transform: translateX(0); }
                }

                .visits {
                    margin-top: 25px;
                    font-size: 22px;
                    color: #0066cc;
                }

                .number {
                    margin-top: 15px;
                    font-size: 24px;
                    font-weight: bold;
                    color: purple;
                }

                .note {
                    margin-top: 30px;
                    font-size: 18px;
                    color: #333;
                }

                .decode {
                    margin-top: 20px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #555;
                }
            </style>
        </head>
        <body>

            ${message}
            ${animation}

            <p class="visits">👀 Total Visits: <b>${visitCount}</b></p>

            <p class="number">
                🔢 Your Lucky Number: <b>${displayNumber}</b>
            </p>

            <p class="note">
                🔔 Winning chance is <b>1/60</b>.<br>
                And if you win once… your chances get even stronger 😉
            </p>

            <p class="decode">
                🧠 Decode the game and win it — sharpen your mind!
            </p>

        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
