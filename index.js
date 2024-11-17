const express = require("express");

const app = express()

app.use(express.json());

app.get("/testRoute", (req, res) => {
    return res.status(200).json({message: "success", input: req.body});
});

app.listen(3000, () => {
    console.log("listening on port 3000");
    
})