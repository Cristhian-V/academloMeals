const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Reviews = db.define('reviews', {
  id:{
    primaryKey:true,
    allowNull:false,
    autoIncrement:true,
    type: DataTypes.INTEGER
  },
  userId:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  comment:{
    allowNull:false,
    type: DataTypes.STRING
  },
  restaurantId:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  rating:{
    allowNull:false,
    type: DataTypes.INTEGER
  }
},{
  timestamps:false
})

module.exports = Reviews