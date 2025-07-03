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

  const query = `
    INSERT INTO products (
      product_name, product_id, sku, selling_price, mrp,
      product_description, short_description, image_url,
      material, color, length_cm, width_cm, height_cm
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.execute(query, [
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
  ]);

  return result;
};

export default addProductToDb;
