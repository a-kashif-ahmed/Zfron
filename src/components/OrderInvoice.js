// OrderInvoice.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    justifyContent: 'space-between'
  },
  header: {
    textAlign: 'center',
    marginBottom: 10
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  invoiceTitle: {
    fontSize: 16,
    marginTop: 10
  },
  section: {
    marginBottom: 10
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
    textDecoration: 'underline'
  },
  product: {
    marginBottom: 10
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic'
  },
  text:{
    margin:2,
    padding:1
  }
});

const OrderInvoice = ({ order }) => (

  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.companyName}>ZOCOSTO</Text>
        <Text style={styles.invoiceTitle}>Invoice</Text>
      </View>

      {/* Order Details */}
      <View style={styles.section}>
        <Text style={styles.text}>Order ID: {order.orderid}</Text>
        <Text style={styles.text}>Ordered On: {new Date(order.createdAt).toLocaleDateString('en-GB')}</Text>
        <Text style={styles.text}>Customer: {order.customerid.fullname}</Text>
        <Text style={styles.text}>Address: {order.Address}</Text>
        <Text style={styles.text}>Payment Method: {order.paymentMethod}</Text>
        <Text style={styles.text}>Status: {order.status}</Text>
      </View>

      {/* Product List */}
      <View style={styles.section}>
        <Text style={styles.heading}>Products</Text>
        {order.products.map((product, index) => (
          <View key={index} style={styles.product}>
            <Text>
              
              {index+1} &nbsp; {product.productId.productName} — ₹{product.priceAtPurchase} × {product.count}
            </Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View style={styles.section}>
        <Text> Total Order Cost : {order.pr}</Text>
        <Text>Total Amount Paid: ₹{order.totalamountPaid}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for ordering. Please visit us again! - Team zocosto</Text>
      </View>
    </Page>
  </Document>
);

export default OrderInvoice;
