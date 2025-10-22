// import { productsData } from '../data/products.data.js';

// const getAllProducts = async () => {
//     try {
//         const products = await productsData.readJSONFile();
//         return products;
//     } catch (error) {
//         console.error('Error reading products file:', error);
//         throw error;
//     }    
// };    

// const saveAllProducts = async (updatedProducts) => {
//     try {
//      const res = await productsData.writeJSONFile(updatedProducts);
//         return res;
//     } catch (error) {
//         console.error('Error writing products file:', error);
//         throw error;
//     }
// };

// const deleteProduct = async (products) => {
//     try {
//         const deleted = await productsData.writeJSONFile(products);
//         if (deleted)
//             return true;
//     }  catch (error) {  
//         console.error('Error writing products file:', error);
//         throw error;
//     }
// }

// export const productsModel = {
//     getAllProducts,
//     saveAllProducts,
//     deleteProduct
// }

import { db } from '../data/data.js';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const productsCollection = collection(db, 'products');

const getAllProducts = async () => {
    // const snapshot = await getDocs(productsCollection);
    // const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log(products);
    // return products;
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    querySnapshot.forEach((doc) => {
        products.push({ firestoreId: doc.id, ...doc.data() });
    });
    return products;
};

// const saveAllProducts = async (updatedProducts) => {
    // const batch = writeBatch(db);
    // updatedProducts.forEach(product => {
    //     const productRef = doc(productsCollection, product.id);
    //     batch.set(productRef, product);
    // });
    // await batch.commit(); 
// };

const saveProduct = async (product) => {
  try {
    const docRef = await addDoc(productsCollection, product);
    console.log("Documento creado con ID:", docRef.id);
    return docRef.id; // 🔹 devolvés el ID generado
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    return false; // 🔹 si falla, devolvés false
  }
};

const deleteProduct = async (id) => {
    const productRef = doc(productsCollection, id);
    await deleteDoc(productRef);
};

export const productsModel = {
    getAllProducts,
    // saveAllProducts,
    saveProduct,
    deleteProduct
};