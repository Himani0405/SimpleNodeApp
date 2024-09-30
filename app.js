const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.get("/hello/:id", (req, res) => {
  res.send(req.params.id);
});

app.post("/hello", (req, res) => {
  const userId = req.body.id;
  const token = req.body.token;

  res.send({
    message: `Received userId ${userId} with token ${token}`,
  });
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
