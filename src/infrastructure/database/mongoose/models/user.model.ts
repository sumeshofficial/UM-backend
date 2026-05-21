import { Schema, model, type InferSchemaType } from "mongoose";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

enum Status {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

const userSchema = new Schema(
  {
    postgresId: { type: String, required: true, unique: true },
    fullname: { type: String },
    email: { type: String },
    role: { type: String, enum: Object.values(Role) },
    status: { type: String, enum: Object.values(Status) },
  },
  {
    collection: "users",
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
