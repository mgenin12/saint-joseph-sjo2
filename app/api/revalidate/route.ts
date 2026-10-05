import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate?secret=…  (ou en-tête x-revalidate-secret)
 * Force la mise à jour immédiate du site après une modification du Google Sheet,
 * sans attendre la revalidation automatique (10 min). À appeler depuis un
 * déclencheur Apps Script « à la modification », Make, Zapier ou à la main.
 */
export async function POST(req: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return NextResponse.json({ ok: false, error: "REVALIDATE_SECRET non configuré" }, { status: 501 });
  const url = new URL(req.url);
  const given = url.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret");
  if (given !== expected) return NextResponse.json({ ok: false, error: "Secret invalide" }, { status: 401 });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: true, at: new Date().toISOString() });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Utilisez POST" }, { status: 405 });
}
