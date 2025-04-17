const { Router } = require("express");
const aiRouter = Router();
const {generateContent} = require("../utils/ai");

aiRouter.post("/generate", async (req, res) => {
    const {prompt} = req.body;
    const response = await generateContent(prompt);

    res.send(response);
});

module.exports = aiRouter;
