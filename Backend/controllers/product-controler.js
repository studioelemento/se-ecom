import addProductToDb from "../models/product-model.js";

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    console.log('Received from Postman:', product);

    const result = await addProductToDb(product);  // result is the insert result object

    res.status(201).json({
      message: 'Product added successfully',
      data: product  // Return the product or confirmation details
    });
  } catch (err) {
    console.error('Error in controller:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
