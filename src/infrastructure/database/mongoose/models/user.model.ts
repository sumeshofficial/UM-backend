import { Schema, model, type InferSchemaType } from "mongoose";


const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    fullname: { type: String, required: true, },
    email: { type: String, required: true, },
    role: { type: String, required: true, },
    status: { type: String, required: true, },
  },
  {
    collection: "users",
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
