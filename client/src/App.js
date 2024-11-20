import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList'; // Path to your InvoiceList component
import CreateInvoice from './components/CreateInvoice'; // Path to your CreateInvoice component
import InvoiceDetail from './components/InvoiceDetail'; // Path to your InvoiceDetail component (if you have one)

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-blue-300">Home</a>
            </li>
            <li>
              <a href="/create" className="hover:text-blue-300">Create Invoice</a>
            </li>
          </ul>
        </nav>
        
        <div className="container mx-auto p-6">
          <Routes>
            {/* Define Routes for each component */}
            <Route path="/" element={<InvoiceList />} />
            <Route path="/create" element={<CreateInvoice />} />
            <Route path="/invoices/:id" element={<InvoiceDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;