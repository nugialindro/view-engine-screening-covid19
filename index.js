const express = require("express");

const app = express();
const port = 8080;

const peserta = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/screening", (req, res) => {
  res.render("screeningcovid");
});

app.post("/screening", (req, res) => {
  const namaLengkap = req.body.namaLengkap;
  const alamat = req.body.alamat;
  const demam = req.body.q1;
  const tenggorokan = req.body.q2;
  const nafas = req.body.q3;
  const batuk = req.body.q4;

  peserta.push({
    namaLengkap,
    alamat,
    demam,
    tenggorokan,
    nafas,
    batuk,
  });
  console.log(peserta);
  res.redirect("/screening");
});

app.get("/data-peserta", (req, res) => {
  res.json(peserta);
});

app.get("/hasil-screening", (req, res) => {
  res.render("hasilscreening", {
    peserta,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
