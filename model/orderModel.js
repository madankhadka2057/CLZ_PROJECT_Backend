// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('.');
const users = require('./userModel');
const products = require('./productModel');

module.exports=(sequelize,DataTypes)=>{
const Order = sequelize.define('Order', {
 
  items: {
    type: DataTypes.JSON,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('items'));
    },
    set(value) {
      this.setDataValue('items', JSON.stringify(value));
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  shoppingAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.ENUM('Pending', 'Delivered', 'Cancelled', 'Ontheway', 'Preparation'),
    defaultValue: 'Pending',
  },
  paymentDetails: {
    type: DataTypes.JSON,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('paymentDetails'));
    },
    set(value) {
      this.setDataValue('paymentDetails', JSON.stringify(value));
    },
  },
}, {
  timestamps: true,
});
return Order
}

// Define associations


