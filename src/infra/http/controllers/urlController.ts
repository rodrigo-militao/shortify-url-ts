import express from "express";
import ShortifyUseCase from "../../../application/shortifyUseCase";

const router = express.Router();

router.post('/shorten', async (req, res) => {
  try {
    const body = req.body;

    const result = await ShortifyUseCase(body);
  
    const resultCode = result.isSuccess ? 200 : 400;
  
    return res.status(resultCode).send(result.isSuccess ? result.value : result.error);
  } catch {
    return res.status(500).send({"error": "Unexpected error"});
  }
});


export default router;