import React, { useContext } from "react";
import { InvoiceContext } from "./InvoiceContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoiceScript = () => {
  const { submittedInvoice } = useContext(InvoiceContext);

  const handleDownloadPDF = () => {
    if (!submittedInvoice) return;

    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setTextColor(76, 81, 191);
    doc.text(`Company: ${submittedInvoice.company}`, 14, 20);

    doc.setFontSize(18);
    doc.text("Invoice", 14, 30);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Client: ${submittedInvoice.name}`, 14, 40);
    doc.text(`Address: ${submittedInvoice.address}`, 14, 46);
    doc.text(`Invoice #: ${submittedInvoice.invoiceNumber}`, 14, 52);
    doc.text(`Date: ${submittedInvoice.date}`, 14, 58);

    const tableColumn = ["Description", "Qty", "Rate", "Amount", "Total (incl. Tax)"];
    const tableRows = submittedInvoice.items.map((item) => {
      const amount = item.quantity * item.rate;
      const total = amount * 1.18;
      return [
        item.description,
        item.quantity,
        item.rate,
        amount.toFixed(2),
        total.toFixed(2),
      ];
    });

    const grandTotal = submittedInvoice.items.reduce((sum, item) => {
      const amount = item.quantity * item.rate;
      const total = amount * 1.18;
      return sum + total;
    }, 0);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
    });

    doc.text(`Grand Total (incl. Tax): ${grandTotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`invoice-${submittedInvoice.invoiceNumber || "draft"}.pdf`);
  };

  if (!submittedInvoice) return null;

  const grandTotal = submittedInvoice.items.reduce((sum, item) => {
    const amount = item.quantity * item.rate;
    const total = amount * 1.18;
    return sum + total;
  }, 0);

  return (
    <div className="mt-10 p-8 rounded-xl shadow-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 max-w-6xl mx-auto border border-indigo-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-wide">
          {submittedInvoice.company}
        </h1>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Invoice Summary</p>
      </div>

      {/* Client Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white/70 p-6 rounded-lg shadow-inner">
        <p><strong className="text-gray-700">Client:</strong> <span className="text-indigo-600 font-medium">{submittedInvoice.name}</span></p>
        <p><strong className="text-gray-700">Address:</strong> <span className="text-purple-600 font-medium">{submittedInvoice.address}</span></p>
        <p><strong className="text-gray-700">Invoice #:</strong> <span className="text-blue-600 font-medium">{submittedInvoice.invoiceNumber}</span></p>
        <p><strong className="text-gray-700">Date:</strong> <span className="text-green-600 font-medium">{submittedInvoice.date}</span></p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
        <table className="w-full text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Qty</th>
              <th className="px-3 py-2 text-left">Rate</th>
              <th className="px-3 py-2 text-left">Amount</th>
              <th className="px-3 py-2 text-left">Total (incl. Tax)</th>
            </tr>
          </thead>
          <tbody>
            {submittedInvoice.items.map((item, i) => {
              const amount = item.quantity * item.rate;
              const total = amount * 1.18;
              return (
                <tr
                  key={i}
                  className="border-t hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="px-3 py-2">{item.description}</td>
                  <td className="px-3 py-2">{item.quantity}</td>
                  <td className="px-3 py-2">{item.rate}</td>
                  <td className="px-3 py-2">{amount.toFixed(2)}</td>
                  <td className="px-3 py-2 font-semibold text-indigo-700">{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Grand Total */}
      <div className="mt-6 text-right bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4 rounded-lg shadow-inner">
        <p className="text-xl font-bold text-gray-800">
          Grand Total (incl. Tax): <span className="text-indigo-700">{grandTotal.toFixed(2)}</span>
        </p>
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center md:justify-end">
        <button
          onClick={handleDownloadPDF}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 font-semibold tracking-wide"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceScript;
