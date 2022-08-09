const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Category extends Sequelize.Model {}
Category.init({
  name: DataTypes.STRING
},{
  sequelize,
  tableName:'categories',
  underscored:true,
})
/***
 * Voici les champs nécessaires pour le Model
 * name string null false unique true
 * tableName: 'categories',
 */

module.exports = Category;
