import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";
dotenv.config();

// TEMP DEBUG LOGS — REMOVE LATER
// console.log("PAYPAL_MODE:", process.env.PAYPAL_MODE);
// console.log("PAYPAL_CLIENT_ID:", process.env.PAYPAL_CLIENT_ID ? "✅ Loaded" : "❌ Missing");
// console.log("PAYPAL_CLIENT_SECRET:", process.env.PAYPAL_CLIENT_SECRET ? "✅ Loaded" : "❌ Missing");

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export default paypal;
