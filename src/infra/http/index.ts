import express from "express";
import urlController from './controllers/urlController'

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


app.use("/api", urlController)

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
