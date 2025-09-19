const { Schema, Types, default: mongoose } = require("mongoose");

const eventsSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
});
export const EventsModel =
  mongoose.models.events ?? mongoose.model("events", eventsSchema);
