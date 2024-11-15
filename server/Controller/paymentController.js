import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../Model/orderModel.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPESECRETKEY);

export const checkout = async (req, res) => {
  try {
    const { product, orderId } = req.body;
    console.log("hello");
    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      },
    ];

    console.log(product);
    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        orderId: orderId,
      },
    });

    console.log(session);

    return res.status(200).json({
      message: "Payment session created successfully!",
      sessionId: session.id,
      paymentIntent: session.payment_intent,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkoutCart = async (req, res) => {
  try {
    const { products, orderId } = req.body;
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        orderId: orderId,
      },
    });

    return res.status(200).json({
      message: "Payment session created successfully!",
      sessionId: session.id,
      paymentIntent: session.payment_intent,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const handleWebHook = async (req, res) => {
  try {
    let endpointSecret = process.env.WEBHOOK_SECRET;
    const sig = req.headers["stripe-signature"];
    let event;
    console.log("Signature : ", sig);

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const session = event.data.object;
    const orderId = session.metadata.orderId;

    // payment_intent.payment_failed or checkout.session.async_payment_failed event
    if (
      event.type === "payment_intent.payment_failed" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      //Update order status
      console.log("Payment failed for Order ID: ", orderId);
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          $set: {
            paymentStatus: "Failed",
          },
        });
      }
    }
    if (event.type === "checkout.session.completed") {
      console.log("Payment successful for Order ID:", orderId);
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found!" });
      }

      //Update order payment status
      await order.updateOne({
        $set: {
          paymentIntentId: session.payment_intent,
          paymentStatus: "Paid",
        },
      });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
