const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const checkout = async (req, res) => {
  try {
    const { products } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.productId.productName,
            },
            unit_amount: product.productId.price * 100,
          },
          quantity: product.quantity,
        };
      }),
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/Cart",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      billing_address_collection: "required",
    });

    return res.status(200).json({
      id: session.id,
      success: true,
      message: "Payment done successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = {
  checkout,
};
