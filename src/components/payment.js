import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/payments.css';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const xmlRequest = `
          <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pay="http://localhost:3016/paymentService">
            <soapenv:Header/>
            <soapenv:Body>
              <pay:listPaymentRequest/>
            </soapenv:Body>
          </soapenv:Envelope>`;
  
        const response = await axios.post('http://localhost:3016/wsdl', xmlRequest, {
          headers: { 'Content-Type': 'text/xml' }
        });
  
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data, 'text/xml');
        const paymentNodes = xml.getElementsByTagName('paymentList');
  
        if (paymentNodes.length > 0) {
          const paymentsArray = Array.from(paymentNodes).map(node => ({
            id: node.getElementsByTagName('id')[0].textContent,
            nombre: node.getElementsByTagName('nombre')[0].textContent,
            descripcion: node.getElementsByTagName('descripcion')[0].textContent
          }));
          setPayments(paymentsArray);
        } else {
          console.error('No se encontraron elementos <paymentList> en la respuesta SOAP.');
        }
  
      } catch (err) {
        console.error('Error fetching payments:', err);
      }
    };
  
    fetchPayments();
  }, []);
  

  return (
    <div className="container">
      <h1>Payments List</h1>
      <div className="payments-list">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div key={payment.id} className="payment-card">
              <h3>{payment.nombre}</h3>
              <p><strong>Description:</strong> {payment.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentsList;
