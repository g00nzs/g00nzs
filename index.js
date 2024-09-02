const express = require('express');
const Kahoot = require("kahoot.js-latest");
const app = express();
const port = process.env.PORT || 3000;

app.get('/bot', (req, res) => {
    const name = req.query.name || 'KahootBot';
    const pin = req.query.pin;
    const count = parseInt(req.query.count) || 1;

    if (!pin) {
        return res.status(400).send('Error: Game PIN is required.');
    }

    let number = 1;
    let number2 = 1;

    const interval = setInterval(() => {
        const client = new Kahoot();
        client.join(pin, `${name}${number++}`);
        client.on("Joined", () => {
            console.log("Bots sent: " + number2++);
        });
        client.on("QuizEnd", () => {
            console.log("Game has ended.");
            clearInterval(interval);
            res.send('Game has ended.');
        });

        if (number > count) {
            clearInterval(interval);
            res.send(`Sent ${count} bots to the game.`);
        }
    }, 83);
});

app.listen(port, () => {
    console.log(`Kahootinator running on port ${port}`);
});
