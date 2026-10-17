"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      className="btn btn--gold btn--lg"
      onClick={() => {
        if (typeof window !== "undefined") {
          const prevTitle = document.title;
          document.title = " ";
          window.print();
          setTimeout(() => {
            document.title = prevTitle;
          }, 500);
        }
      }}
    >
      🖨️ Imprimer ou enregistrer en PDF
    </button>
  );
}
