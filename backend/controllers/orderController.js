const mongoose = require("mongoose");
const Order = require("../models/Order");
const TicketType = require("../models/TicketType");

async function countReservedForType(ticketTypeId) {
  const [row] = await Order.aggregate([
    {
      $match: {
        ticketTypeId: new mongoose.Types.ObjectId(ticketTypeId),
        status: { $in: ["pending", "paid"] },
      },
    },
    { $group: { _id: null, total: { $sum: "$ticketQuantity" } } },
  ]);
  return row?.total ?? 0;
}

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      eventId,
      ticketQuantity,
      totalPrice,
      paymentMethod,
      status,
      ticketTypeId,
    } = req.body;

    // 1. Kiểm tra các trường bắt buộc (Không có cái này là báo lỗi 400 ngay)
    if (!userId || !eventId || !ticketQuantity || !totalPrice) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin đơn hàng!" });
    }

    let ticketTypeName = "";
    if (ticketTypeId) {
      const tt = await TicketType.findById(ticketTypeId);
      if (!tt || String(tt.eventId) !== String(eventId)) {
        return res.status(400).json({ message: "Loại vé không hợp lệ với sự kiện này." });
      }
      if (!tt.isActive) {
        return res.status(400).json({ message: "Loại vé này đã ngừng bán." });
      }
      const reserved = await countReservedForType(ticketTypeId);
      if (reserved + Number(ticketQuantity) > tt.capacity) {
        return res.status(400).json({ message: "Không đủ vé cho loại này." });
      }
      ticketTypeName = tt.name;
    }

    // 2. Tạo object đơn hàng với các giá trị mặc định (Tùy chọn chuyên nghiệp)
    const newOrder = new Order({
      userId,
      eventId,
      ticketQuantity,
      totalPrice,
      ticketTypeId: ticketTypeId || undefined,
      ticketTypeName,
      // Nếu Thunder Client không gửi paymentMethod, mặc định là "Chuyển khoản"
      paymentMethod: paymentMethod || "Chuyển khoản",
      // Nếu Thunder Client không gửi status, mặc định là "pending"
      status: status || "pending"
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Đặt vé thành công!",
      data: savedOrder
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ khi tạo đơn hàng", error: err.message });
  }
};

// Lấy danh sách đơn hàng của một người dùng cụ thể
exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("eventId", "title startsAt venue")
      .populate("ticketTypeId", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error: err.message });
  }
};

// Lấy toàn bộ đơn hàng cho Admin
exports.getAllOrders = async (req, res) => {
  try {
    // Chỉ lấy dữ liệu thô từ bảng Order, không dùng .populate()
    const orders = await Order.find().sort({ createdAt: -1 }); 
    res.status(200).json(orders);
  } catch (err) {
    // Trả về lỗi chi tiết để mình dễ bắt bệnh nếu vẫn hỏng
    res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message });
  }
};

// Danh sách đơn có populate — dùng trang quản lý vé admin
exports.getAdminOrders = async (req, res) => {
  try {
    const { eventId, status } = req.query;
    const limit = Math.min(Number(req.query.limit) || 300, 500);
    const filter = {};
    if (eventId) filter.eventId = eventId;
    if (status && status !== "all") filter.status = status;

    const orders = await Order.find(filter)
      .populate("eventId", "title startsAt venue")
      .populate("ticketTypeId", "name price capacity")
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy đơn hàng admin", error: err.message });
  }
};

// Cập nhật trạng thái
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật", error: err.message });
  }
};

// Hàm xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng để xóa" });
    }
    res.status(200).json({ message: "Đã xóa đơn hàng thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa", error: err.message });
  }
};