import React, { useState, useEffect } from 'react';
import { getAllOrders, deleteOrder } from '../../services/firebaseService';
import './AdminPanel.css';

const AdminPanel = () => {
  // Estados para manejar las órdenes y la interfaz
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // Efecto para cargar las órdenes al montar el componente
  useEffect(() => {
    /**
     * Función asíncrona para obtener todas las órdenes desde Firebase
     * Maneja los estados de carga y error durante la petición
     */
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /**
   * Función para eliminar una orden específica
   * Actualiza la lista local y cierra el modal de confirmación
   */
  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      setDeleteLoading(orderToDelete.id);
      // Eliminar la orden de Firebase
      await deleteOrder(orderToDelete.id);
      
      // Actualizar la lista de órdenes localmente
      setOrders(orders.filter(order => order.id !== orderToDelete.id));
      
      // Si la orden eliminada estaba seleccionada, limpiar la selección
      if (selectedOrder?.id === orderToDelete.id) {
        setSelectedOrder(null);
      }
      
      // Cerrar el modal y limpiar estados
      setShowDeleteModal(false);
      setOrderToDelete(null);
    } catch (error) {
      console.error('Error al eliminar la orden:', error.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  /**
   * Función para abrir el modal de confirmación de eliminación
   * @param {Object} order - La orden que se desea eliminar
   */
  const openDeleteModal = (order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  /**
   * Función para cerrar el modal de confirmación y limpiar estados
   */
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  /**
   * Función para formatear fechas de timestamp de Firebase a formato legible
   * @param {Object|String} timestamp - Timestamp de Firebase o string de fecha
   * @returns {String} Fecha formateada en español
   */
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  /**
   * Función para formatear montos en pesos argentinos
   * @param {Number} amount - Monto a formatear
   * @returns {String} Monto formateado con símbolo de peso argentino
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  // Renderizado condicional para estado de carga
  if (loading) {
    return (
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Panel de Administración - Historial de Compras</h2>
        </div>
        <div className="loading">Cargando órdenes...</div>
      </div>
    );
  }

  // Renderizado condicional para estado de error
  if (error) {
    return (
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Panel de Administración - Historial de Compras</h2>
        </div>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  // Renderizado principal del componente
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Panel de Administración - Historial de Compras</h2>
        <p>Total de órdenes: {orders.length}</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No hay órdenes registradas aún.</p>
        </div>
      ) : (
        <div className="orders-container">
          {/* Lista de órdenes */}
          <div className="orders-list">
            <h3>Lista de Órdenes</h3>
            {orders.map((order) => (
              <div 
                key={order.id} 
                className={`order-card ${selectedOrder?.id === order.id ? 'selected' : ''}`}
              >
                <div 
                  className="order-content"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="order-header">
                    <span className="order-id">#{order.id.substring(0, 8)}</span>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-info">
                    <p><strong>Cliente:</strong> {order.buyer?.firstName} {order.buyer?.lastName}</p>
                    <p><strong>Email:</strong> {order.buyer?.email}</p>
                    <p><strong>Total:</strong> {formatCurrency(order.totalAmount || order.total)}</p>
                    <p><strong>Productos:</strong> {order.totalItems} items</p>
                  </div>
                </div>
                <div className="order-actions">
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(order);
                    }}
                    disabled={deleteLoading === order.id}
                  >
                    {deleteLoading === order.id ? 'Eliminando...' : '🗑️'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Panel de detalles de la orden seleccionada */}
          {selectedOrder && (
            <div className="order-details">
              <div className="order-details-header">
                <h3>Detalles de la Orden</h3>
                <button 
                  className="delete-order-btn"
                  onClick={() => openDeleteModal(selectedOrder)}
                  disabled={deleteLoading === selectedOrder.id}
                >
                  {deleteLoading === selectedOrder.id ? 'Eliminando...' : 'Eliminar Orden'}
                </button>
              </div>
              <div className="order-detail-card">
                {/* Información del cliente */}
                <div className="detail-section">
                  <h4>Información del Cliente</h4>
                  <p><strong>Nombre:</strong> {selectedOrder.buyer?.firstName} {selectedOrder.buyer?.lastName}</p>
                  <p><strong>Email:</strong> {selectedOrder.buyer?.email}</p>
                  <p><strong>Teléfono:</strong> {selectedOrder.buyer?.phone}</p>
                  <p><strong>Dirección:</strong> {selectedOrder.buyer?.address}</p>
                  <p><strong>Ciudad:</strong> {selectedOrder.buyer?.city}</p>
                  <p><strong>Código Postal:</strong> {selectedOrder.buyer?.postalCode}</p>
                </div>

                {/* Lista de productos comprados */}
                <div className="detail-section">
                  <h4>Productos Comprados</h4>
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="item-detail">
                      <div className="item-info">
                        <p><strong>{item.title}</strong></p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio unitario: {formatCurrency(item.price)}</p>
                        <p>Subtotal: {formatCurrency(item.price * item.quantity)}</p>
                        {item.size && <p>Talla: {item.size}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumen de la orden */}
                <div className="detail-section">
                  <h4>Resumen de la Orden</h4>
                  <p><strong>ID de Orden:</strong> {selectedOrder.id}</p>
                  <p><strong>Fecha:</strong> {formatDate(selectedOrder.createdAt)}</p>
                  <p><strong>Total de Productos:</strong> {selectedOrder.totalItems}</p>
                  <p><strong>Monto Total:</strong> {formatCurrency(selectedOrder.totalAmount || selectedOrder.total)}</p>
                  <p><strong>Estado:</strong> {selectedOrder.status || 'Pendiente'}</p>
                  {selectedOrder.comments && (
                    <p><strong>Comentarios:</strong> {selectedOrder.comments}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmación para eliminación de órdenes */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirmar Eliminación</h3>
              <button className="modal-close" onClick={closeDeleteModal}>×</button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que quieres eliminar la orden <strong>#{orderToDelete?.id.substring(0, 8)}</strong>?</p>
              <p>Esta acción no se puede deshacer.</p>
              <div className="order-summary">
                <p><strong>Cliente:</strong> {orderToDelete?.buyer?.firstName} {orderToDelete?.buyer?.lastName}</p>
                <p><strong>Total:</strong> {formatCurrency(orderToDelete?.totalAmount || orderToDelete?.total)}</p>
                <p><strong>Fecha:</strong> {formatDate(orderToDelete?.createdAt)}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeDeleteModal}>
                Cancelar
              </button>
              <button 
                className="btn-delete" 
                onClick={handleDeleteOrder}
                disabled={deleteLoading === orderToDelete?.id}
              >
                {deleteLoading === orderToDelete?.id ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;