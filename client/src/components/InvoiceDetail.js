import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetail = () => {
  const { id } = useParams(); // Get the invoice ID from the URL
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the invoice details when the component mounts
  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        // Replace with your Django backend endpoint
        const response = await axios.get(`/api/invoices/${id}/`);
        setInvoice(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching invoice data');
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="invoice-detail-container p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Invoice #{invoice.invoice_number}</h1>
      <div className="invoice-info mb-6">
        <p><strong>Customer Name:</strong> {invoice.customer_name}</p>
        <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Unit Price</th>
            <th className="px-4 py-2 text-left">Line Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.details.map((detail) => (
            <tr key={detail.id}>
              <td className="border px-4 py-2">{detail.description}</td>
              <td className="border px-4 py-2">{detail.quantity}</td>
              <td className="border px-4 py-2">${detail.unit_price.toFixed(2)}</td>
              <td className="border px-4 py-2">${detail.line_total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <p className="font-semibold">Total Invoice Amount: ${invoice.total_amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default InvoiceDetail;