const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("I am an express server designed for learning Nginx Load Balancer");
})

app.listen(7777, () => {
    console.log("Server is running on port 7777");
})