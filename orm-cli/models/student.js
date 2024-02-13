"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name field can not be empty",
          },
          len: {
            args: [3, 20],
            msg: "Enter valid name",
          },
        },
      },
      roll_no: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Please enter valid roll number",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Please enter valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 18],
            msg: "Please enter valid password",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Student",
      timestamps: false,
    }
  );
  return Student;
};
