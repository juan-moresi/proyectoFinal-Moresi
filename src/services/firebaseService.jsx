import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API,
  authDomain: "sneakers-data-7e07c.firebaseapp.com",
  projectId: "sneakers-data-7e07c",
  storageBucket: "sneakers-data-7e07c.firebasestorage.app",
  messagingSenderId: "793126498848",
  appId: "1:793126498848:web:16231707ecb0eb7db6c245"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// Función para obtener todos los productos
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'items');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('No se pudieron cargar los productos');
  }
};

// Función para obtener un producto por ID numérico
export const getProductById = async (id) => {
  try {
    const productsCollection = collection(db, 'items');
    const idQuery = query(productsCollection, where('id', '==', parseInt(id)));
    const querySnapshot = await getDocs(idQuery);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }
    
    throw new Error('Producto no encontrado');
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('No se pudo cargar el producto');
  }
};

// Función para obtener productos por categoría
export const getProductsByCategory = async (category) => {
  try {
    const productsCollection = collection(db, 'items');
    const categoryQuery = query(productsCollection, where('category', '==', category.toLowerCase()));
    const productsSnapshot = await getDocs(categoryQuery);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('No se pudieron cargar los productos de la categoría');
  }
};

// Función para obtener todas las categorías disponibles
export const getCategories = async () => {
  try {
    const productsCollection = collection(db, 'items');
    const productsSnapshot = await getDocs(productsCollection);
    const categories = new Set();
    
    productsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });
    
    return Array.from(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('No se pudieron cargar las categorías');
  }
};

// Función para obtener productos aleatorios (para sugerencias)
export const getRandomProducts = async (count = 4) => {
  try {
    const products = await getProducts();
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching random products:', error);
    throw new Error('No se pudieron cargar las sugerencias');
  }
};