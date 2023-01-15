import express from "express";
import ShortifyUseCase from "../../../application/shortifyUseCase";
import { validate as ShortifyValidate } from "../validations/ShortifyValidaton";

const router = express.Router();

router.post('/shortify', (req, res) => {
  try {
    const body = req.body;

    //TODO: Move validation to Middleware ?
    const resultValidation = ShortifyValidate(body);
    if (!resultValidation.success)
      return res.status(400).send(resultValidation.error);

    const result = ShortifyUseCase(body);
  
    const resultCode = result.isSuccess ? 200 : 400;
  
    return res.status(resultCode).send(result.isSuccess ? result.value : result.message);
  } catch {
    return res.status(500).send({"error": "Unexpected error"});
  }
});


export default router;