import { SignJWT, jwtVerify } from "jose";
import { randomUUID } from "node:crypto";
export function createTokenService(secret) {
  const key = new TextEncoder().encode(secret);
  return {
    async issue() {
      return new SignJWT({ purpose: "demo-request" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30m")
        .setIssuer("saqtauai-web")
        .setAudience("demo-form")
        .setJti(randomUUID())
        .sign(key);
    },
    async verify(token) {
      const { payload } = await jwtVerify(token, key, {
        algorithms: ["HS256"],
        issuer: "saqtauai-web",
        audience: "demo-form",
      });
      if (payload.purpose !== "demo-request" || !payload.jti)
        throw new Error("Invalid form token");
      return payload.jti;
    },
  };
}
