import { getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API,
  authDomain: import.meta.env.VITE_DOMAIN,
  projectId: import.meta.env.VITE_ID,
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


// Función para crear una orden en Firestore
export const createOrder = async (orderData) => {
  try {
    const ordersCollection = collection(db, 'orders');
    
    // Preparar los datos de la orden
    const order = {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending', // Estado inicial de la orden
      total: orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
    
    // Agregar la orden a Firestore
    const docRef = await addDoc(ordersCollection, order);
    
    return {
      id: docRef.id,
      ...order
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('No se pudo crear la orden');
  }
};

// Función para obtener una orden por ID
export const getOrderById = async (orderId) => {
  try {
    const orderDoc = doc(db, 'orders', orderId);
    const orderSnapshot = await getDoc(orderDoc);
    
    if (orderSnapshot.exists()) {
      return {
        id: orderSnapshot.id,
        ...orderSnapshot.data()
      };
    } else {
      throw new Error('Orden no encontrada');
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('No se pudo cargar la orden');
  }
};

// Función para obtener todas las órdenes (para admin)
export const getAllOrders = async () => {
  try {
    const ordersCollection = collection(db, 'orders');
    const ordersSnapshot = await getDocs(ordersCollection);
    const ordersList = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Ordenar por fecha de creación (más recientes primero)
    return ordersList.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.toDate() - a.createdAt.toDate();
      }
      return 0;
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('No se pudieron cargar las órdenes');
  }
};

// Función para eliminar una orden
export const deleteOrder = async (orderId) => {
  try {
    const orderDoc = doc(db, 'orders', orderId);
    await deleteDoc(orderDoc);
    return { success: true, message: 'Orden eliminada correctamente' };
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('No se pudo eliminar la orden');
  }
};