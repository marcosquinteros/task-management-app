import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
      enum: ["Open", "Closed", "Progress"],
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Task || mongoose.model("Task", TaskSchema);
