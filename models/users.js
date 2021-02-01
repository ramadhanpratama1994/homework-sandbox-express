'use strict';
const {
  Model
} = require('sequelize');
const orders = require('./orders');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      users,
      orders
    }) {
      // define association here
      users.hasMany(orders, {
        foreignKey: 'users_id'
      });
    }
  };
  users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING(10)
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'users',
  });
  return users;
};