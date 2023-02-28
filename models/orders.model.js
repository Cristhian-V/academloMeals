const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Orders = db.define('orders',{
  id:{
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  mealId:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  userId:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  totalPrice:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  quantity:{
    allowNull:false,
    type:DataTypes.INTEGER
  },
  status:{
    allowNull:false,
    defaultValue: 'active',
    type: DataTypes.ENUM('active','cancelled','completed')
  }
},{
  timestamps:false
})

module.exports = Orders