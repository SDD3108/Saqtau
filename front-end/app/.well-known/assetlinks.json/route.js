export const dynamic = "force-dynamic";
export function GET() {
  const fingerprints = (process.env.ANDROID_APP_SHA256 || "").split(",")
    .map(v => v.trim().toUpperCase()).filter(Boolean);
  const valid = fingerprints.length && fingerprints.every(v => /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(v));
  return Response.json(valid ? [{
    relation: ["delegate_permission/common.handle_all_urls"],
    target: { namespace: "android_app", package_name: "com.sd3108.SaqtauAI", sha256_cert_fingerprints: fingerprints },
  }] : [], { headers: { "Cache-Control": "no-store" } });
}
