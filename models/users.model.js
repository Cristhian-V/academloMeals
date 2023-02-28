const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Users = db.define('users',{
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
  email:{
    allowNull:false,
    type: DataTypes.STRING
  },
  password:{
    allowNull:false,
    type: DataTypes.STRING
  },
  status:{
    allowNull:false,
    defaultValue:true,
    type: DataTypes.BOOLEAN
  },
  role:{
    allowNull:false,
    defaultValue:'normal',
    type:DataTypes.ENUM('normal','admin')
  }
},{
  timestamps:false
})

module.exports = Users