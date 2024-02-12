const router = require("express").Router();
const Op = require("sequelize").Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../models").Student;
const { authToken } = require("../middleware/auth.middleware");

router.post("/", async (req, res) => {
  try {
    const { name, email, password, roll_no } = req.body;
    const checkStudent = await Student.findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    });

    if (checkStudent) {
      throw new Error("Student already exists.");
    }

    //   Create new Student
    const student = await Student.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      roll_no,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({
      where: {
        email,
      },
    });
    if (!student) {
      throw new Error("Email is wrong.");
    }

    if (!(await bcrypt.compare(password, student.password))) {
      throw new Error("Password is wrong.");
    }

    const token = jwt.sign({ id: student.id }, "secret");

    res.json({ student, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authToken, async (req, res) => {
  try {
    const student = await Student.findOne({
      where: {
        id: {
          [Op.eq]: req.id,
        },
      },
    });
    res.json(student);
  } catch (err) {
    // console.log(err);
    res.status(503).json({ error: err.message });
  }
});

module.exports = router;
