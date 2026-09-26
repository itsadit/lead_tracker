import Lead from "../models/lead.model.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const lead = await Lead.create({
      name,
      email,
      phone,
      status,
    });
    return res.status(200).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ message: `${field} already exist` });
    }
    return res.status(500).json({
      message: "Failed to create Lead",
    });
  }
};

export const getLeads = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search?.trim()) {
      const searchTerm = search.trim();
      filter.$or = [
        {
          name: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          email: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ];
    }
    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.log("Get leads error: ", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "qualified",
      "converted",
      "lost",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
        allowedStatuses,
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.status = status;

    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Update lead status error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
