const mongoose = require("mongoose");
const TicketType = require("../models/TicketType");
const Order = require("../models/Order");

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

exports.listByEvent = async (req, res) => {
  try {
    const { eventId } = req.query;
    if (!eventId) {
      return res.status(400).json({ message: "Thiếu eventId" });
    }
    const types = await TicketType.find({ eventId }).sort({ sortOrder: 1, createdAt: 1 });
    const withSold = await Promise.all(
      types.map(async (t) => {
        const sold = await countReservedForType(t._id);
        return { ...t.toObject(), sold };
      })
    );
    res.status(200).json({ success: true, data: withSold });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy loại vé", error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { eventId, name, description, price, capacity, sortOrder, isActive } = req.body;
    if (!eventId || !name || price == null || capacity == null) {
      return res.status(400).json({ message: "Thiếu eventId, tên, giá hoặc số lượng." });
    }
    const doc = new TicketType({
      eventId,
      name,
      description: description ?? "",
      price: Number(price),
      capacity: Number(capacity),
      sortOrder: sortOrder != null ? Number(sortOrder) : 0,
      isActive: isActive !== false,
    });
    const saved = await doc.save();
    res.status(201).json({ success: true, data: { ...saved.toObject(), sold: 0 } });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo loại vé", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description, price, capacity, sortOrder, isActive } = req.body;
    const updates = {};
    if (name != null) updates.name = name;
    if (description != null) updates.description = description;
    if (price != null) updates.price = Number(price);
    if (capacity != null) updates.capacity = Number(capacity);
    if (sortOrder != null) updates.sortOrder = Number(sortOrder);
    if (isActive != null) updates.isActive = Boolean(isActive);

    const current = await TicketType.findById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Không tìm thấy loại vé" });
    }
    if (updates.capacity != null) {
      const sold = await countReservedForType(current._id);
      if (updates.capacity < sold) {
        return res.status(400).json({
          message: `Sức chứa không được nhỏ hơn số vé đã giữ/đã bán (${sold}).`,
        });
      }
    }

    const updated = await TicketType.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    const sold = await countReservedForType(updated._id);
    res.status(200).json({ success: true, data: { ...updated.toObject(), sold } });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật loại vé", error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const sold = await countReservedForType(req.params.id);
    if (sold > 0) {
      return res.status(400).json({
        message: "Không xóa được: đã có đơn hàng gắn loại vé này. Có thể tắt isActive.",
      });
    }
    const deleted = await TicketType.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy loại vé" });
    }
    res.status(200).json({ success: true, message: "Đã xóa loại vé" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xóa loại vé", error: err.message });
  }
};
