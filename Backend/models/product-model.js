import pool from "../db/db.js";

const addProductToDb = async (product) => {
  const {
    product_name,
    product_id,
    sku,
    selling_price,
    mrp,
    product_description,
    short_description,
    image_url,
    material,
    color,
    length_cm,
    width_cm,
    height_cm
  } = product;

  const result = await pool.query(
    `INSERT INTO products (
      product_name, product_id, sku, selling_price, mrp,
      product_description, short_description, image_url,
      material, color, length_cm, width_cm, height_cm
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *`,
    [
      product_name,
      product_id,
      sku,
      selling_price,
      mrp,
      product_description,
      short_description,
      image_url,
      material,
      color,
      length_cm,
      width_cm,
      height_cm
    ]
  );

  return result;
};

export default addProductToDb;