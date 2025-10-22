import { productsService } from "../services/products.service.js";

const getProductById = async (req, res) => {
  const product = await productsService.getProductById(req.params.id);
  if (product) {
      return res.status(200).json({ message: "Product retrieved successfully", product });
    }
    return res.status(404).json({ message: "Product not found" });
};

const getAllProducts = async (req, res) => {
  const products = await productsService.getAllProducts(req, res);
  if (products.length > 0) {
    return res.status(200).json({ message: "Products retrieved successfully", "quantity": products.length, products });
  } else {
    return res.status(404).json({ message: "No products found" });
  }
};

const getProductsByPrice = async (req, res) => {
    const price = req.query.price;
    const relationalOperator = req.query.relationalOperator;
    const query = { price, relationalOperator };
  const products = await productsService.getProductsByPrice(query);
  if (products.length > 0) {
    return res.status(200).json({ message: "Products retrieved successfully", "quantity": products.length, products });
  } else {
    return res.status(404).json({ message: "No products found" });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = { ...req.body };
    const createdProduct = await productsService.createProduct(newProduct);

    if (createdProduct) {
      res.status(201).json({message: "Product created", product: createdProduct});
    } else {
    res.status(400).json({ message: "Product could not be created" });
    }
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = await productsService.deleteProduct(id);
    if (deleted) {
        console.log("check point");
        return res.status(200).json( {message: "Product deleted successfully"} );
    } else {
        return res.status(404).json({ message: "Product not found" });
    }
};

export const productsController = { 
    getProductById, 
    getAllProducts, 
    getProductsByPrice, 
    createProduct,
    deleteProduct
};