const Event = require("../models/Event");

function buildTimeframeFilter(timeframe) {
  if (!timeframe || timeframe === "all") return null;
  const now = new Date();
  if (timeframe === "this_month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return { startsAt: { $gte: start, $lte: end } };
  }
  if (timeframe === "next_3_months") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 4, 0, 23, 59, 59, 999);
    return { startsAt: { $gte: start, $lte: end } };
  }
  if (timeframe === "past_year") {
    const start = new Date(now);
    start.setFullYear(start.getFullYear() - 1);
    return { startsAt: { $gte: start, $lte: now } };
  }
  return null;
}

exports.getEvents = async (req, res) => {
  try {
    const { status, q, timeframe } = req.query;
    const clauses = [];

    if (status && status !== "all") {
      clauses.push({ status });
    }
    if (q && String(q).trim()) {
      const rx = new RegExp(String(q).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      clauses.push({ $or: [{ title: rx }, { venue: rx }, { description: rx }] });
    }
    const tf = buildTimeframeFilter(timeframe);
    if (tf) clauses.push(tf);

    const filter = clauses.length > 1 ? { $and: clauses } : clauses[0] || {};

    const events = await Event.find(filter).sort({ isFeatured: -1, startsAt: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sự kiện", error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Không tìm thấy sự kiện" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy sự kiện", error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startsAt,
      venue,
      imageUrl,
      status,
      isFeatured,
      iconKey,
      metrics,
      lastAdminAction,
    } = req.body;

    if (!title || !startsAt || !venue) {
      return res.status(400).json({ message: "Vui lòng nhập tiêu đề, thời gian và địa điểm." });
    }

    const event = new Event({
      title,
      description: description ?? "",
      startsAt: new Date(startsAt),
      venue,
      imageUrl: imageUrl ?? "",
      status: status || "draft",
      isFeatured: Boolean(isFeatured),
      iconKey: iconKey || "calendar_month",
      metrics: {
        totalAttendees: metrics?.totalAttendees ?? 0,
        ticketsSoldPercent: metrics?.ticketsSoldPercent ?? 0,
        revenue: metrics?.revenue ?? 0,
      },
      lastAdminAction: lastAdminAction || "Sự kiện mới được tạo",
    });

    const saved = await event.save();
    res.status(201).json({ success: true, message: "Tạo sự kiện thành công", data: saved });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo sự kiện", error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.startsAt) updates.startsAt = new Date(updates.startsAt);
    if (!updates.lastAdminAction) {
      updates.lastAdminAction = "Đã cập nhật sự kiện";
    }
    const event = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Không tìm thấy sự kiện" });
    }
    res.status(200).json({ success: true, message: "Cập nhật thành công", data: event });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật sự kiện", error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy sự kiện" });
    }
    res.status(200).json({ success: true, message: "Đã xóa sự kiện" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa sự kiện", error: err.message });
  }
};

exports.getStatsOverview = async (req, res) => {
  try {
    const [agg] = await Event.aggregate([
      {
        $group: {
          _id: null,
          totalAttendees: { $sum: "$metrics.totalAttendees" },
          avgTicketsSold: { $avg: "$metrics.ticketsSoldPercent" },
          revenue: { $sum: "$metrics.revenue" },
        },
      },
    ]);

    const data = {
      totalAttendees: agg?.totalAttendees ?? 0,
      ticketsSoldPercent: Math.round(agg?.avgTicketsSold ?? 0),
      revenue: agg?.revenue ?? 0,
    };
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Lỗi thống kê", error: err.message });
  }
};

function activityStatusLabel(status) {
  if (status === "ongoing") return { key: "active", label: "Active", className: "green" };
  if (status === "draft") return { key: "draft", label: "Draft", className: "primary" };
  return { key: "closed", label: "Closed", className: "muted" };
}

exports.getRecentActivities = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const events = await Event.find()
      .select("title lastAdminAction updatedAt status")
      .sort({ updatedAt: -1 })
      .limit(limit);

    const data = events.map((e) => {
      const st = activityStatusLabel(e.status);
      return {
        eventId: e._id,
        eventName: e.title,
        action: e.lastAdminAction || "Cập nhật sự kiện",
        updatedAt: e.updatedAt,
        status: st,
      };
    });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Lỗi nhật ký hoạt động", error: err.message });
  }
};
