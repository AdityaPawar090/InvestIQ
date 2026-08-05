const { model } = require("mongoose");
const { AlertSchema } = require("../schemas/AlertSchema");

const AlertModel = model("alert", AlertSchema);

module.exports = { AlertModel };
