const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataPigeonSchema = new Schema({
    name: String,
    sex: String,
    sire: String,
    dam: String,
    image: String,
    color: String,
    extra: Array
})

const DataPigeon = mongoose.model("DataPigeon", dataPigeonSchema);

module.exports = DataPigeon;