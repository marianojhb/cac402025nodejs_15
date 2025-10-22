import { productsModel } from "../models/products.model.js";

const getProductById = async (id) => {
    const products = await productsModel.getAllProducts();
    console.log(products);
    const product = products.find((p) => p.firestoreId === id);
    if (product) {
        return product;
    }
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductsByPrice = async (query) => {
  const products = await productsModel.getAllProducts();
  const price = parseInt(query.price);  
  const relationalOperator = query.relationalOperator;
  let filteredProducts;
  switch (relationalOperator) {
    case "lt":
      filteredProducts = products.filter((product) => product.price < price);  
      break;
    case "gt":
      filteredProducts = products.filter((product) => product.price > price);  
      break;
    case "eq":
      filteredProducts = products.filter((product) => product.price == price);  
      break;
    default:
      filteredProducts = [];
  }    
    return filteredProducts;
};  


const createProduct = async (newProduct) => {
  const { name, price, category } = newProduct;

  if (!name || !price || !category) {
    console.warn("Missing product name, price or category");
    return false;
  }

  // Crear nuevo producto con ID único:
  const productAdd = {
    name,
    price,
    category,
  };

  // // Agregar el nuevo producto a la lista existente: (Unir arrays)
  // const updatedProducts = [...products, productAdd];

  // Guardar la lista actualizada en el archivo:
  // const success = await productsModel(updatedProducts);
  
  const id = await productsModel.saveProduct(productAdd);

  // Si hubo error, devolver false
  if (!id) return false;

  // Si todo salió bien, devolver el producto completo con su ID
  return { id, ...productAdd };

};

const deleteProduct = async (id) => {
  const products = await productsModel.getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    const deleted = await productsModel.deleteProduct(products);
      return deleted;
  } else {  
    return false;
  }
};

export const productsService = {
  getProductById,
  getAllProducts,
  getProductsByPrice,
  createProduct,
  deleteProduct
};