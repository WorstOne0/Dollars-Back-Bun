import crypto from "crypto";

const base64URLEncode = (str: any) => str.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
const sha256 = (buffer: any) => crypto.createHash("sha256").update(buffer).digest();

const verifier = base64URLEncode(crypto.randomBytes(32));
const challenge = base64URLEncode(sha256(verifier));

export { verifier, challenge };
