const express = require("express");
const mongoose = require("mongoose");
const DataPigeon = require("./models/DataPigeon");
const router = express.Router();
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/dataPigeon", async (req, res) => {
  const dataPigeon = await DataPigeon.find();
  res.json(dataPigeon);
});

app.get("/dataPigeon/:pigeonId", async (req, res) => {
  const pigeonId = req.params.pigeonId;
  try {
    const pedigreeView = await DataPigeon.findById(pigeonId);
    res.json(pedigreeView);
  } catch (err) {
    console.log(err);
  }
});

app.post("/dataPigeon", async (req, res) => {
  const name = req.body.name;
  const sex = req.body.sex;
  const sire = req.body.sire;
  const dam = req.body.dam;
  const image = req.body.image;
  const color = req.body.color;
  const extra = req.body.extra;

  const newDataPigeon = new DataPigeon();
  newDataPigeon.name = name;
  newDataPigeon.sex = sex;
  newDataPigeon.sire = sire;
  newDataPigeon.dam = dam;
  newDataPigeon.image = image;
  newDataPigeon.color = color;
  newDataPigeon.extra = extra;
  await newDataPigeon.save();
  res.send("the req has been sucssfuly");
});

app.put("/dataPigeon/:pigeonId", async (req, res) => {
  const pigeonId = req.params.pigeonId;
  const name = req.body.name;
  const sex = req.body.sex;
  const sire = req.body.sire;
  const dam = req.body.dam;
  const image = req.body.image;
  const color = req.body.color;
  const extra = req.body.extra;
  try {
    const dataPigeon = await DataPigeon.findByIdAndUpdate(pigeonId);
    dataPigeon.name = name;
    dataPigeon.sex = sex;
    dataPigeon.sire = sire;
    dataPigeon.dam = dam;
    dataPigeon.image = image;
    dataPigeon.color = color;
    dataPigeon.extra = extra;
    dataPigeon.save();
    res.json(dataPigeon);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/dataPigeon/:pigeonId", async (req, res) => {
  const pigeonId = req.params.pigeonId;
  try {
    const dataPigeon = await DataPigeon.findByIdAndDelete(pigeonId);
    res.json(dataPigeon);
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect(
    "mongodb+srv://AhmedBorg:St7UDrfVLQiLt4rn@inthesky.nzrg9lf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen("3000", () => {
      console.log("i'm listening in port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
