"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      className="btn btn--gold btn--lg"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
    >
      🖨️ Imprimer ou enregistrer en PDF
    </button>
  );
}
