import React, { createContext, useState } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [submittedInvoice, setSubmittedInvoice] = useState(null);

  return (
    <InvoiceContext.Provider value={{ submittedInvoice, setSubmittedInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};