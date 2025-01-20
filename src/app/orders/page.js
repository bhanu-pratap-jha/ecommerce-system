import Styles from './orders.module.css';

export default function Orders() {
  const orders = [
    {
      orderId: "ORD12345",
      date: "January 15, 2025",
      total: "₹2,499",
      status: "Shipped",
      items: [
        {
          name: "Wireless Earbuds",
          quantity: 1,
          price: "₹1,999",
        },
        {
          name: "Smartphone Screen Protector",
          quantity: 1,
          price: "₹500",
        },
      ],
    },
    {
      orderId: "ORD67890",
      date: "January 10, 2025",
      total: "₹5,999",
      status: "Delivered",
      items: [
        {
          name: "Smartwatch",
          quantity: 1,
          price: "₹5,999",
        },
      ],
    },
  ];

  return (
    <div className={Styles.container}>
      <div className={Styles.heading}>My Orders</div>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className={Styles.order} key={index}>
            <div style={{ display: "flex", justifyContent: "space-between", color: getColor(index) }}>
              <div className={Styles.orderId}>Order ID: {order.orderId}</div>
              <div className={Styles.orderDate}>{order.date}</div>
            </div>
            <div className={Styles.orderTotal}>Total: {order.total}</div>
            <div className={Styles.orderStatus}>Status: {order.status}</div>
            <div className={Styles.itemsHeading}>Items:</div>
            <ul className={Styles.itemsList}>
              {order.items.map((item, idx) => (
                <li key={idx} className={Styles.item}>
                  <div>{item.name} (x{item.quantity})</div>
                  <div>{item.price}</div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className={Styles.noOrders}>You have no orders yet.</div>
      )}
    </div>
  );
}

// Function to determine color based on index
function getColor(index) {
  const colors = ["Coral", "Turquoise", "Salmon", "Lavender"];
  return colors[index % 4];
}

export function generateMetadata() {
  return {
    title: "Orders",
    description: "Your recent orders - Bhanu Pratap Jha",
  };
}
