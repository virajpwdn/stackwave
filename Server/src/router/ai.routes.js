const {Router} = require("express");
const aiRouter = Router();
const generateContent = require("../utils/ai");

aiRouter.get("/ai/test", async (req,res)=>{
   
    await res.send(generateContent());
})

module.exports = aiRouter;