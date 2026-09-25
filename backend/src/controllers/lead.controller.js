import Lead from "../models/lead.model.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone || !status) {
      res.status(400).json({
        message: "All feild are required",
      });
    }
    const lead = await Lead.create({
      name,
      email,
      phone,
      status,
    });
    res.status(200).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    if (error.code === 11000) {
      const feild = Object.keys(error.keyPattern)[0];
      res.status(409).json({ message: `${feild} already exist` });
    }
    res.status(500).json({
      message: "Failed to create Lead",
    });
  }
};
