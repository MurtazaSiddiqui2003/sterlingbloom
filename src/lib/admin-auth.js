import { cookies } from "next/headers";

const COOKIE_NAME = "sterling_bloom_admin";

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  return secret;
}

async function sign(value) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );

  return Buffer.from(signature).toString("base64url");
}

export async function createAdminSession() {
  const payload = JSON.stringify({
    role: "admin",
    exp: Date.now() + 1000 * 60 * 60 * 8,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = await sign(encoded);

  return `${encoded}.${signature}`;
}

export async function verifyAdminSession(token) {
  try {
    if (!token) return false;

    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;

    const expected = await sign(encoded);
    if (signature.length !== expected.length) return false;

    const a = new TextEncoder().encode(signature);
    const b = new TextEncoder().encode(expected);
    let diff = a.length ^ b.length;
    for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
      diff |= a[i] ^ b[i];
    }
    if (diff !== 0) return false;

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    );

    return payload.role === "admin" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME };
