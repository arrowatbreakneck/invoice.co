import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { InvoiceContext } from "./InvoiceContext";

const InvoiceForm = () => {
  const { setSubmittedInvoice } = useContext(InvoiceContext);
  const[notification,setnotification] = useState(false);
  const taxRate = 0.18; 

  const formik = useFormik({
    initialValues: {
      company:"",
      name: "",
      address: "",
      invoiceNumber: "",
      date: "",
      items: [],
    },
    onSubmit: (values) => {
      setSubmittedInvoice(values);
      const hasAllValues =
      values.company.trim() !== "" &&
      values.name.trim() !== "" &&
      values.address.trim() !== "" &&
      values.invoiceNumber.trim() !== "" &&
      values.date.trim() !== "" &&
      values.items.length > 0 &&
      values.items.every(
        (item) =>
          item.description.trim() !== "" &&
          item.quantity > 0 &&
          item.rate > 0
      );

    if (hasAllValues) {
      setnotification(true);
    } else {
      setnotification(false);
      alert("Please fill in all fields before generating the invoice.");
    }
      
    },
  });
//  const notify=()=>{
//   if (hasValues){
//     setSubmittedInvoice(true)
//   }

//  }
  const addItem = () => {
    formik.setFieldValue("items", [
      ...formik.values.items,
      { description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = [...formik.values.items];
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
    <div className="p-6 max-w-5xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Invoice Generator
      </h1>

      {
        notification &&(
          <div className="mb-4 p-4 rounded-md bg-green-100 border border-green-300 text-green-800 shadow-md">
          ✅ Now you can view and download the invoice copy in the
          <span className="font-semibold"> Invoice & Download </span> section.
        </div>
        )
      }

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-lg shadow-lg"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Company Name
            </label>
            <input
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Company Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Client Name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              name="invoiceNumber"
              value={formik.values.invoiceNumber}
              onChange={formik.handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Client Address"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              min="2010-01-01"
              max={new Date(Date.now()+24*60*60*1000).toISOString().split("T")[0]}
            />
          </div>
        </div>

        
        <button
          type="button"
          onClick={addItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200"
        >
          + Add Item
        </button>

       
        {formik.values.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-3 items-center"
          >
            <input
              name={`items.${index}.description`}
              value={item.description}
              onChange={formik.handleChange}
              placeholder="Description"
              className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <input
              type="number"
              name={`items.${index}.quantity`}
              value={item.quantity}
              onChange={formik.handleChange}
              placeholder="Qty"
              className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              min="1"
            />
            <input
              type="number"
              name={`items.${index}.rate`}
              value={item.rate}
              onChange={formik.handleChange}
              placeholder="Rate"
              className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              min="1"
            />
            <div className="p-2 text-gray-700 font-semibold">
              {item.quantity * item.rate || 0}
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition duration-200"
            >
              Delete
            </button>
          </div>
        ))}

       
        <div className="mt-6 text-gray-800">
          <p className="text-lg">Subtotal: {subtotal.toFixed(2)}</p>
          <p className="text-lg">Tax (18%): {tax.toFixed(2)}</p>
          <p className="text-xl font-bold">Total: {total.toFixed(2)}</p>
        </div>

        
        <button
        
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-lg transition duration-200 w-full md:w-auto"
        >
          Generate Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;