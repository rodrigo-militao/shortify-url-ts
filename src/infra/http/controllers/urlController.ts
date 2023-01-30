import express from "express";
import ShortifyUseCase from "../../../application/shortifyUseCase";
import { getByLongUrl } from "../../repository/urlRepository";

const router = express.Router();

router.post('/shorten', async (req, res) => {
  try {
    const body = req.body;

    const result = await ShortifyUseCase(body);
  
    const resultCode = result.success ? 200 : 400;

    const data = result.success ? {
      shortUrl: result.data.shortUrl,
      expiresAt: result.data.expiresAt
    } : result.error
  
    return res.status(resultCode).send({data});
  } catch {
    return res.status(500).send({"error": "Unexpected error"});
  }
});

router.get('/shortUrl', async (req, res) => {
  try {
    const { longUrl } = req.query;
    if (!longUrl || typeof longUrl != "string")
      return res.status(400).send({data: "longUrl param is malformed"})

    const result = await getByLongUrl(longUrl)
  
    const resultCode = result.success ? 200 : 404;

    const data = result.success ? {
      shortUrl: result.data.shortUrl,
      expiresAt: result.data.expiresAt
    } : result.error
  
    return res.status(resultCode).send({data});
  } catch {
    return res.status(500).send({"error": "Unexpected error"});
  }
});


export default router;
