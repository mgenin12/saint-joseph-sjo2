"use client";

export default function PrintButton({ label = "Imprimer / Enregistrer en PDF" }: { label?: string }) {
  return (
    <button type="button" className="btn btn--gold btn--lg no-print" onClick={() => window.print()}>
      🖨️ {label}
    </button>
  );
}
