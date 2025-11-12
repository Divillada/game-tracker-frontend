import axios from 'axios';

// Esta es la URL base de tu backend. Cámbiala si tu backend corre en otro puerto
const API_URL = 'http://localhost:3000/api';

// ============================================
// SERVICIOS PARA JUEGOS
// ============================================

// Obtener todos los juegos de la biblioteca
export const obtenerJuegos = async () => {
  try {
    const response = await axios.get(`${API_URL}/juegos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    throw error;
  }
};

// Obtener un juego específico por su ID
export const obtenerJuegoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/juegos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el juego:', error);
    throw error;
  }
};

// Crear un nuevo juego en la biblioteca
export const crearJuego = async (juegoData) => {
  try {
    const response = await axios.post(`${API_URL}/juegos`, juegoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear juego:', error);
    throw error;
  }
};

// Actualizar un juego existente
export const actualizarJuego = async (id, juegoData) => {
  try {
    const response = await axios.put(`${API_URL}/juegos/${id}`, juegoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    throw error;
  }
};

// Eliminar un juego de la biblioteca
export const eliminarJuego = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/juegos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    throw error;
  }
};

// ============================================
// SERVICIOS PARA RESEÑAS
// ============================================

// Obtener todas las reseñas (opcionalmente filtradas por juego)
export const obtenerResenas = async (juegoId = null) => {
  try {
    // Si se proporciona un juegoId, agregamos el query parameter
    const url = juegoId 
      ? `${API_URL}/resenas?juegoId=${juegoId}` 
      : `${API_URL}/resenas`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
};

// Crear una nueva reseña
export const crearResena = async (resenaData) => {
  try {
    const response = await axios.post(`${API_URL}/resenas`, resenaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};

// Actualizar una reseña existente
export const actualizarResena = async (id, resenaData) => {
  try {
    const response = await axios.put(`${API_URL}/resenas/${id}`, resenaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    throw error;
  }
};

// Eliminar una reseña
export const eliminarResena = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/resenas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};