"use client";

export default function PrintReceiptButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-maroon text-white px-6 py-2 text-sm hover:bg-maroon-dark transition-colors"
    >
      Print Receipt
    </button>
  );
}