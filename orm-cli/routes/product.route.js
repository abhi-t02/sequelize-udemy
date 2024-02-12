const router = require("express").Router();
const Op = require("sequelize").Op;

const Product = require("../models").Product;

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      //   attributes: ["id", "name"],
      //   limit: 10,
      //   offset: 4,
      // order: [["id", "DESC"]],
      //   order: [["name", "asc"]],
      where: {
        // id: {
        //   [Op.eq]: 210,
        // },
        id: {
          [Op.and]: {
            [Op.gt]: 210,
            [Op.lt]: 218,
          },
        },
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
