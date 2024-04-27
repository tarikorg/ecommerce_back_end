// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,

    },
    product_name: {
      // string, not null
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      //decimal true, not null , decimal
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      //int , not null , default=10, numeric
       type: DataTypes.INTEGER,
       allowNull: false,
       defaultValue: 10,
       validate: {
        isNumeric: true // will only allow numbers (sequelize docs)
       }

    },
    category_id: {
      type: DataTypes.INTEGER,
      // [category model]<=> id
      references: {
        model: 'category', //modelname is lowerCase category on category.js
        key: 'id' // targeted element we want to reference
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
