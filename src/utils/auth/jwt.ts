import logger from "@libs/logger";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtTokenProps {
  userId: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export const generateJwtToken = (data: JwtTokenProps): string => {
  try {
    const token = jwt.sign({ ...data }, "1q2w3e4r5t6y7u8i9o0p_production");
    return token;
  } catch (error) {
    logger.error({
      message: error.message,
      stack: error.stack,
    });
  }
};

export const verifyAndDecode = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, "1q2w3e4r5t6y7u8i9o0p_production");
  } catch (error) {
    logger.error({
      message: error.message,
      stack: error.stack,
    });
  }
};
