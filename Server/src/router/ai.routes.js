const { Router } = require("express");
const aiRouter = Router();
const controller = require("../controller/ai.controller");
const authMiddleware = require("../middleware/auth.middleware");

aiRouter.post("/generate", authMiddleware, controller.refactorCodeAI);
aiRouter.post("/indexing", authMiddleware, controller.indexingDocument);
aiRouter.post("/retrival", authMiddleware, controller.retrivalQuery)

module.exports = aiRouter;
