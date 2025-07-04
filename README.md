# Sneakers Shop - Tienda Online de Calzado

## 📋 Descripción
Sneakers Shop es una aplicación web de e-commerce desarrollada con React, especializada en la venta de calzado deportivo y casual. La plataforma ofrece una experiencia de compra completa y fluida, desde la navegación por categorías hasta el proceso de finalización de compra, incluyendo un panel de administración para la gestión de órdenes.

## ✨ Características Principales
- **Catálogo Completo**: Amplia variedad de zapatillas organizadas por categorías (running, casual, basketball, skate, training, lifestyle).
- **Navegación Intuitiva**: Sistema de filtrado por categorías, precios y tallas.
- **Carrito de Compras**: Gestión completa con persistencia en localStorage.
- **Proceso de Checkout**: Formulario de compra con validaciones y confirmación de pedido.
- **Panel de Administración**: Gestión completa de órdenes con funcionalidades de visualización y eliminación.
- **Historial de Compras**: Visualización detallada de todas las órdenes realizadas.
- **Diseño Responsivo**: Experiencia optimizada para todos los dispositivos.
- **Sección de Contacto**: Formulario para consultas y soporte.
- **Persistencia de Datos**: Almacenamiento seguro en Firebase Firestore.

## 🛠️ Tecnologías Utilizadas
- **React 19**: Biblioteca principal para la construcción de la interfaz.
- **React Router 7**: Sistema de navegación entre páginas.
- **Context API**: Gestión del estado global para el carrito de compras.
- **Firebase Firestore**: Base de datos NoSQL para almacenamiento de productos y órdenes.
- **CSS Modular**: Estilos organizados por componentes.
- **Vite**: Herramienta de construcción y desarrollo.
- **Lucide React**: Iconos modernos para la interfaz.

## 🚀 Instalación y Ejecución

Para configurar y ejecutar el proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio**:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd proyectoFinal-Moresi
    ```

2.  **Instala las dependencias**:
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configura Firebase**:
    - Crea un proyecto en Firebase Console
    - Configura Firestore Database
    - Actualiza las credenciales en `firebaseService.jsx`

4.  **Inicia el servidor de desarrollo**:
    ```bash
    npm run dev
    # o
    yarn dev
    ```

    Esto iniciará la aplicación en modo desarrollo, generalmente accesible en `http://localhost:5173/`.

## 🚀 Flujo de Usuario
1. **Página de Inicio**: Banner principal, categorías destacadas y productos recomendados.
2. **Navegación**: Exploración por categorías o catálogo completo.
3. **Detalle de Producto**: Información detallada, selección de talla y cantidad.
4. **Carrito**: Gestión de productos seleccionados con opciones para modificar cantidades.
5. **Checkout**: Formulario para completar la compra con validaciones.
6. **Confirmación**: Mensaje de éxito con ID de pedido y resumen de compra.
7. **Panel Admin**: Acceso a gestión de órdenes (desde el footer).

## 🛒 Funcionalidades del Carrito
- **Agregar productos**: Con selección de talla y cantidad.
- **Modificar cantidades**: Ajuste de unidades para cada producto.
- **Eliminar productos**: Opción para quitar items individuales o vaciar el carrito.
- **Persistencia**: Almacenamiento en localStorage para mantener datos entre sesiones.
- **Cálculo automático**: Actualización en tiempo real del total y cantidad de items.
- **Validación de stock**: Verificación de disponibilidad antes de agregar productos.

## 👨‍💼 Panel de Administración
El panel de administración incluye las siguientes funcionalidades:

### 📊 Gestión de Órdenes
- **Visualización completa**: Lista de todas las órdenes realizadas.
- **Detalles de orden**: Información completa del cliente, productos y totales.
- **Eliminación de órdenes**: Funcionalidad para eliminar órdenes con confirmación modal.
- **Búsqueda y filtrado**: Organización por fecha de creación.
- **Formato de moneda**: Visualización en pesos argentinos (ARS).

### 🔍 Información Detallada
- **Datos del cliente**: Nombre, email, teléfono, dirección completa.
- **Productos comprados**: Lista detallada con cantidades, precios y subtotales.
- **Resumen financiero**: Total de productos, monto total, fecha de orden.
- **Estado de orden**: Seguimiento del estado actual.
- **Comentarios**: Notas adicionales del cliente.

### 🗑️ Gestión de Eliminación
- **Modal de confirmación**: Interfaz flotante para confirmar eliminaciones.
- **Información de seguridad**: Resumen de la orden antes de eliminar.
- **Actualización en tiempo real**: Actualización inmediata de la lista tras eliminación.

## 📦 Gestión de Datos
La aplicación gestiona los datos utilizando Firebase Firestore, lo que permite una integración robusta y escalable para:

### 🛍️ Productos
- Obtener todos los productos disponibles.
- Recuperar un producto específico por su ID.
- Filtrar productos por categoría.
- Obtener todas las categorías disponibles.
- Productos aleatorios para recomendaciones.

### 📋 Órdenes
- **Crear órdenes**: Almacenamiento completo de datos de compra.
- **Recuperar órdenes**: Obtención de órdenes individuales o listado completo.
- **Eliminar órdenes**: Funcionalidad de eliminación para administradores.
- **Ordenamiento**: Organización cronológica por fecha de creación.

## 📱 Responsive Design
La aplicación está completamente optimizada para diferentes tamaños de pantalla:

- **Dispositivos móviles**: Menú adaptable y diseño fluido.
- **Tablets**: Visualización optimizada para pantallas medianas.
- **Escritorio**: Aprovechamiento del espacio con layouts en grid.
- **Panel Admin**: Interfaz responsiva para gestión en cualquier dispositivo.

## 🔍 Filtros de Productos
El sistema de filtrado permite a los usuarios:

- Filtrar por categoría de producto.
- Seleccionar rangos de precio.
- Filtrar por tallas específicas (adaptadas según el tipo de producto).
- Búsqueda por nombre o características.

## 🔐 Acceso al Panel de Administración
Para acceder al panel de administración:

1. Navega hasta el footer de la aplicación.
2. Haz clic en "Admin - View Purchase Summary".
3. Serás redirigido a `/admin` donde podrás gestionar las órdenes.

## 🎨 Características de UI/UX
- **Interfaz intuitiva**: Diseño limpio y fácil navegación.
- **Feedback visual**: Indicadores de carga y estados de error.
- **Confirmaciones**: Modales de confirmación para acciones críticas.
- **Animaciones suaves**: Transiciones fluidas entre estados.
- **Iconografía consistente**: Uso coherente de iconos en toda la aplicación.

## 🔧 Estructura del Proyecto


© 2025 Sneakers Shop - Todos los derechos reservados