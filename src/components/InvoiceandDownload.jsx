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

    
    const tableColumn = ["Description", "Qty", "Rate", "Amount","Total (incl. Tax)"];
    const tableRows = submittedInvoice.items.map((item) => {
      const amount = item.quantity * item.rate;
      const total = amount* 1.18;
     return [ 
      item.description,
      item.quantity,
      item.rate,
      amount.toFixed(2),
      total.toFixed(2)
      
     ]
      // item.taxRate 
      // (item.quantity*item.rate)*0.18 
  });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
    });

    doc.save(`invoice-${submittedInvoice.invoiceNumber || "draft"}.pdf`);
  };

  return (
    <>
      {submittedInvoice && (
        <div className="mt-8 p-6 border rounded bg-gray-50 max-w-6xl mx-auto">
         
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-indigo-700 text-center">
            {submittedInvoice.company}
          </h1>

          
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
            Invoice Preview
          </h2>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <p><strong>Client:</strong> <span className="text-indigo-600">{submittedInvoice.name}</span></p>
            <p><strong>Address:</strong> <span className="text-purple-600">{submittedInvoice.address}</span></p>
            <p><strong>Invoice #:</strong> <span className="text-pink-600">{submittedInvoice.invoiceNumber}</span></p>
            <p><strong>Date:</strong> <span className="text-green-600">{submittedInvoice.date}</span></p>
          </div>

        
          <div className="overflow-x-auto">
            <table className="w-full border text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-2 py-1">Description</th>
                  <th className="px-2 py-1">Qty</th>
                  <th className="px-2 py-1">Rate</th>
                  <th className="px-2 py-1">Amount</th>
                  <th className="px-2 py-1">total(incl. Tax)</th>

                </tr>
              </thead>
              <tbody>
                {submittedInvoice.items.map((item, i) => {
                  const amount =item.quantity*item.rate;
                  const total = amount*1.18;
return(
                  <tr key={i} className="border-t">
                    <td className="px-2 py-1">{item.description}</td>
                    <td className="px-2 py-1">{item.quantity}</td>
                    <td className="px-2 py-1">{item.rate}</td>
                    <td className="px-2 py-1">{amount.toFixed(2)}</td>
                    <td className="px-2 py-1">{total.toFixed(2)}</td>
                    
                  </tr>
)
})}
              </tbody>
            </table>
          </div>

         
          <div className="mt-6 flex justify-center md:justify-end">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceScript;