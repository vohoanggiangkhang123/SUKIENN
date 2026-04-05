const router = require("express").Router();
const orderController = require("../controllers/orderController");

// 1. Tạo đơn hàng mới (Dành cho Trí & Giang Khang khi nhấn Đặt vé)
router.post("/", orderController.createOrder);

// 2. Lấy toàn bộ đơn hàng (Dành cho Admin - Kiên & Hậu quản lý hệ thống)
// Lưu ý: Đặt cái này lên trên cái có :userId để tránh bị nhầm lẫn route
router.get("/all", orderController.getAllOrders); 
router.get("/admin/list", orderController.getAdminOrders);

// 3. Lấy đơn hàng theo User ID (Để user xem lại lịch sử đặt vé của họ)
router.get("/user/:userId", orderController.getOrdersByUserId);

router.put("/:id", orderController.updateOrderStatus); 

router.delete("/:id", orderController.deleteOrder);

module.exports = router;