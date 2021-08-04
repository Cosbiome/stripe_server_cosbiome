const express = require("express");
const cors = require("cors");
const app = express();

const stripe = require("stripe")(
  "sk_test_51JKmmuHfPPJjPocOCsDHfupkqyfgeEmWDPGgb44L6kuZRyhSRAtNz0y6cnGiKVNi6Muxtn6RnCjb8SS8V0p64XRW00zcafZIOC"
);

app.use(
  cors({
    origin: "*",
  })
);

app.post("/pago", async (req, response) => {
  console.log(req.query);
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: req.query.amount,
      currency: req.query.currency,
    },
    function (err, paymentIntent) {
      if (err !== null) {
        console.log(err);
      } else {
        return response.status(200).json({
          id: paymentIntent.id,
          paymentIntent: paymentIntent.client_secret,
        });
      }
    }
  );
});

app.listen(2999, () => {
  console.log("Server running at http://localhost:3000/");
});
