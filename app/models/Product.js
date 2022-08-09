const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Product extends Sequelize.Model {}
Product.init({
  ref: DataTypes.STRING,
  // attr: DataTypes.STRING,
  image: DataTypes.STRING,
  // metaDescription: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  // excerpt: DataTypes.STRING,
  price: DataTypes.NUMBER,

},{
  sequelize,
  tableName: 'products',
  underscored: true, 
})
/**
 * Voici les champs nécessaires pour faire le Model
 * category_id int
 * ref string
 * attr string
 * image string
 * metaDescription string
 * title string
 * description text
 * excerpt string
 * priceHT number
 * tableName: 'products',
 */

module.exports = Product;
