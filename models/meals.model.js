const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Meals = db.define('meals',{
  id:{
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull:false,
    type: DataTypes.STRING
  },
  price:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  restaurantId:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  status:{
    allowNull:false,
    type: DataTypes.BOOLEAN
  }
},{
  timestamps:false
})

module.exports = Meals