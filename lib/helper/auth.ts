import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12; // configurable, secure default

export const hashPassword = (password: string): Promise<string> => {
  if (!password) throw new Error("Password is required");
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = (
  password: string,
  hash: string
): Promise<boolean> => {
  if (!password || !hash) throw new Error("Password and hash are required");
  return bcrypt.compare(password, hash);
};
