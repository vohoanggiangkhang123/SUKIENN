import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders/all');
        if (!cancelled) {
          setOrders(response.data.data || response.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Hàm xử lý Xóa đơn hàng (Kết nối với API DELETE bạn vừa làm)
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        await axios.delete(`http://localhost:3000/api/orders/${id}`);
        // Xóa xong thì cập nhật lại danh sách trên màn hình
        setOrders(orders.filter(order => order._id !== id));
        alert("Đã xóa thành công!");
      } catch {
        alert("Xóa thất bại!");
      }
    }
  };

  if (loading) return <p>Đang tải dữ liệu đơn hàng...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý Đơn đặt vé - Việt (HUTECH)</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Mã đơn hàng</th>
            <th>ID Sự kiện</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.eventId}</td>
              <td>{order.ticketQuantity}</td>
              <td>{order.totalPrice.toLocaleString()} VNĐ</td>
              <td>
                <span style={{ color: order.status === 'paid' ? 'green' : 'orange' }}>
                  {order.status}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => handleDelete(order._id)}
                  style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;