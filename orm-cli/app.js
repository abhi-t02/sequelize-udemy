const express = require("express");

const productRouter = require("./routes/product.route");
const studentRouter = require("./routes/student.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRouter);
app.use("/api/students", studentRouter);

app.listen(3000, () => {
  console.log("server is listening..");
});
