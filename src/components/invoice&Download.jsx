import React, { useContext } from "react";
import { InvoiceContext } from "./InvoiceContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

const Bill = () => {
  const { submittedInvoice } = useContext(InvoiceContext);

  const handleDownloadPDF = () => {
    if (!submittedInvoice) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    // Client Info
    doc.setFontSize(12);
    doc.text(`Client: ${submittedInvoice.name}`, 14, 30);
    doc.text(`Address: ${submittedInvoice.address}`, 14, 36);
    doc.text(`Invoice #: ${submittedInvoice.invoiceNumber}`, 14, 42);
    doc.text(`Date: ${submittedInvoice.date}`, 14, 48);

    // Table
    const tableColumn = ["Description", "Qty", "Rate", "Amount"];
    const tableRows = submittedInvoice.items.map((item) => [
      item.description,
      item.quantity,
      item.rate,
      item.quantity * item.rate,
    ]);

    // ✅ Correct usage
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    // Save PDF
    doc.save(`invoice-${submittedInvoice.invoiceNumber || "draft"}.pdf`);
  };

  return (
    <>
      {submittedInvoice && (
        <div className="mt-8 p-6 border rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Invoice Preview</h2>
          <p>
            <strong>Client:</strong> {submittedInvoice.name}
          </p>
          <p>
            <strong>Address:</strong> {submittedInvoice.address}
          </p>
          <p>
            <strong>Invoice #:</strong> {submittedInvoice.invoiceNumber}
          </p>
          <p>
            <strong>Date:</strong> {submittedInvoice.date}
          </p>

          <table className="w-full mt-4 border">
            <thead>
              <tr className="bg-gray-200">
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {submittedInvoice.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.quantity * item.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Download PDF Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Bill;
