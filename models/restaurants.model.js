const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Restaurants = db.define('restaurants',{
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
  address:{
    allowNull:false,
    type: DataTypes.STRING
  },
  rating:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  status:{
    allowNull:false,
    type:DataTypes.BOOLEAN
  }
},{
  timestamps:false
})

module.exports = Restaurants