import React, { useState,useContext } from "react";
import { useFormik } from "formik";
import Bill from "./Invoice&Download";
import { InvoiceContext } from "./InvoiceContext";


const InvoiceForm = () => {
  const { setSubmittedInvoice } = useContext(InvoiceContext);
  const taxRate = 0.18; // 18%

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      invoiceNumber: "",
      date: "",
      items: [],
    },
    onSubmit: (values) => {
      setSubmittedInvoice(values);
      // <Bill submittedInvoice ={submittedInvoice}/>
      // window.location.reload();
    },
  });

  const addItem = () => {
    formik.setFieldValue("items", [
      ...formik.values.items,
      { description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (index) => {
    const existingVal = formik.values.items
    const updatedItems = [...existingVal];
    updatedItems.splice(index, 1);
    formik.setFieldValue("items", updatedItems);
  };

  const subtotal = formik.values.items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Client Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Name</label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="border p-2 w-full"
              placeholder="Client Name"
            />
          </div>
          <div>
            <label>Invoice Number</label>
            <input
              name="invoiceNumber"
              value={formik.values.invoiceNumber}
              onChange={formik.handleChange}
              className="border p-2 w-full"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label>Address</label>
            <input
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="border p-2 w-full"
              placeholder="Client Address"
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              className="border p-2 w-full"
            />
          </div>
        </div>

       
        <button
          type="button"
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Item
        </button>

        
        {formik.values.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-2 mb-2 items-center"
          >
            <input
              name={`items.${index}.description`}
              value={item.description}
              onChange={formik.handleChange}
              placeholder="Description"
              className="border p-2"
            />
            <input
              type="number"
              name={`items.${index}.quantity`}
              value={item.quantity}
              onChange={formik.handleChange}
              placeholder="Qty"
              className="border p-2"
            />
            <input
              type="number"
              name={`items.${index}.rate`}
              value={item.rate}
              onChange={formik.handleChange}
              placeholder="Rate"
              className="border p-2"
            />
            <div className="p-2">
              {item.quantity * item.rate || 0}
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}

        
        <div className="mt-4">
          <p>Subtotal: {subtotal.toFixed(2)}</p>
          <p>Tax (18%): {tax.toFixed(2)}</p>
          <p className="font-bold">Total: {total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Generate Invoice
        </button>
      </form>

      
      
    </div>
  );
};

export default InvoiceForm;
