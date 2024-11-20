import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState([
    { description: '', quantity: '', unit_price: '' }
  ]);

  const navigate = useNavigate();

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const addDetail = () => {
    setDetails([...details, { description: '', quantity: '', unit_price: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invoiceData = {
      invoice_number: invoiceNumber,
      customer_name: customerName,
      date: date,
      invoice_details: details
    };

    try {
      console.log('posted');
      await axios.post('http://127.0.0.1:8000/api/invoices/', invoiceData);
      navigate('/');
      console.log('success');
    } catch (error) {
      console.error('nahi hua', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-1">Invoice Number</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h3 className="text-xl font-semibold mt-6">Invoice Details</h3>
        {details.map((detail, index) => (
          <div key={index} className="space-y-4 mt-4">
            <div>
              <label className="block text-lg font-medium mb-1">Description</label>
              <input
                type="text"
                value={detail.description}
                onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={detail.quantity}
                onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">Unit Price</label>
              <input
                type="number"
                value={detail.unit_price}
                onChange={(e) => handleDetailChange(index, 'unit_price', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addDetail}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add More Product
        </button>
        <br />
        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;