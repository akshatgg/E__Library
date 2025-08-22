import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecret";
if (!JWT_SECRET)
  throw new Error("❌ JWT_SECRET is not defined in environment variables");

const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1h";

// Generate JWT
export const generateToken = (
  payload: object,
  expiresIn: string | number = JWT_EXPIRES_IN
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, {expiresIn} as SignOptions, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
};

// Verify JWT safely
export const verifyToken = <T extends object = JwtPayload>(
  token: string
): Promise<T | null> => {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return resolve(null);
      resolve(decoded as T);
    });
  });
};