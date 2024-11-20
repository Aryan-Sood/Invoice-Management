import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/invoices/');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    
    fetchInvoices();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Invoice List</h1>
      <Link to="/create">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-6">
          Create Invoice
        </button>
      </Link>
      <ul className="space-y-4">
        {invoices.map(invoice => (
          <li key={invoice.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg">
            <strong className="text-xl">Invoice #{invoice.invoice_number}</strong><br />
            Customer: {invoice.customer_name} <br />
            Date: {invoice.date} <br />
            <Link to={`/invoices/${invoice.id}`} className="text-blue-500 hover:text-blue-700">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;