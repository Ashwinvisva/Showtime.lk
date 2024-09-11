import Payment from "../models/payment.model.js";

const generateID = async () => {
  const latest = await Payment.findOne({}, {}, { sort: { 'createdAt' : -1 } });

  if (!latest || !latest.createdAt || !latest.id) return 'PAY001';

  const latestID = parseInt(latest.id.replace('PAY', ''));
  const newID = 'PAY' + ('000' + (latestID + 1)).slice(-3);

  return newID;
}

const PaymentController = {
  createPayment: async (req, res) => {
    try {
      const { user, amount, date, time, type } = req.body;
      const newPayment = new Payment({
        user,
        amount,
        date,
        time,
        type,
        id: await generateID()
      });
      await newPayment.save();
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getPayments: async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getPaymentById: async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) res.status(404).json({ message: "Payment not found" });
      else res.status(200).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getPaymentsByUser: async (req, res) => {
    try {
      const payments = await Payment.find({ user: req.params.userId });
      res.status(200).json(payments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  updatePayment: async (req, res) => {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deletePayment: async (req, res) => {
    try {
      await Payment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

export default PaymentController;
