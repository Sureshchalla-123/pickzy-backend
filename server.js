const express = require("express");
const app = express();
PORT = 3000;

app.use(express.json());

app.get("/health-check", (req, res) => {
  res.send("Hello, Express server is running!");
});

app.listen(PORT, () => {
  console.log(`srever is running at port ${PORT}`);
});
