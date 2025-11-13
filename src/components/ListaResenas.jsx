import React, { useState, useEffect } from 'react';
import TarjetaResena from './TarjetaResena.jsx';
import FormularioResena from './FormularioResena.jsx';
import { obtenerResenas, eliminarResena } from '../services/api';
import '../styles/ListaResenas.css';

const ListaResenas = ({ juego, onVolver }) => {
  // Estados del componente
  const [resenas, setResenas] = useState([]); 
  const [cargando, setCargando] = useState(true); 
  const [error, setError] = useState(null); 
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [resenaEditar, setResenaEditar] = useState(null); 


  useEffect(() => {
    cargarResenas();
  }, [juego._id]); // Se ejecuta cada vez que cambia el ID del juego

  // Función para cargar las reseñas del juego desde el backend
  const cargarResenas = async () => {
    try {
      setCargando(true);
      setError(null);
      // Pasamos el ID del juego para obtener solo sus reseñas
      const data = await obtenerResenas(juego._id);
      setResenas(data);
    } catch (err) {
      setError('Error al cargar las reseñas');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  // Función para abrir el formulario de nueva reseña
  const handleAgregarResena = () => {
    setResenaEditar(null);
    setMostrarFormulario(true);
  };

  // Función para abrir el formulario de editar una reseña existente
  const handleEditarResena = (resena) => {
    setResenaEditar(resena);
    setMostrarFormulario(true);
  };

  // Función para eliminar una reseña
  const handleEliminarResena = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      try {
        await eliminarResena(id);
        // Actualizamos el estado local removiendo la reseña eliminada
        setResenas(resenas.filter(resena => resena._id !== id));
      } catch (err) {
        alert('Error al eliminar la reseña');
        console.error(err);
      }
    }
  };

  // Función que se ejecuta cuando el formulario se cierra
  const handleCerrarFormulario = (resenaGuardada) => {
    setMostrarFormulario(false);
    setResenaEditar(null);
    
    if (resenaGuardada) {
      cargarResenas();
    }
  };

  // Calcular estadísticas de las reseñas
  const totalResenas = resenas.length;
  const promedioEstrellas = totalResenas > 0
    ? (resenas.reduce((sum, r) => sum + r.estrellas, 0) / totalResenas).toFixed(1)
    : 0;

  // Renderizado mientras carga
  if (cargando) {
    return (
      <div className="lista-resenas-container">
        <div className="resenas-cargando">
          <div className="spinner"></div>
          <p>Cargando reseñas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-resenas-container">
      {/* Header con información del juego */}
      <div className="resenas-header-principal">
        <button 
          className="btn-volver-biblioteca"
          onClick={onVolver}
        >
          ← Volver a la biblioteca
        </button>
        
        <div className="juego-info-resenas">
          {juego.portadaURL && (
            <img 
              src={juego.portadaURL} 
              alt={juego.nombre}
              className="juego-portada-pequena"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 className="juego-titulo-resenas">{juego.nombre}</h1>
            <p className="juego-plataforma-resenas">
              {juego.plataforma}
            </p>
          </div>
        </div>

        {/* Estadísticas de reseñas */}
        <div className="resenas-estadisticas">
          <div className="stat-resena">
            <span className="stat-numero-grande">{totalResenas}</span>
            <span className="stat-label-resena">Reseñas</span>
          </div>
          {totalResenas > 0 && (
            <div className="stat-resena">
              <span className="stat-numero-grande">
                 {promedioEstrellas}
              </span>
              <span className="stat-label-resena">Promedio</span>
            </div>
          )}
        </div>

        {/* Botón para agregar nueva reseña */}
        <button 
          className="btn-agregar-resena"
          onClick={handleAgregarResena}
        >
           Escribir Reseña
        </button>
      </div>

      {/* Mensaje de error si existe */}
      {error && (
        <div className="resenas-error">
          <p> {error}</p>
          <button onClick={cargarResenas} className="btn-reintentar-resenas">
            Reintentar
          </button>
        </div>
      )}

      {/* Lista de reseñas o mensaje si está vacía */}
      {resenas.length === 0 ? (
        <div className="resenas-vacias">
          <div className="icono-vacio"></div>
          <h3>Aún no hay reseñas para este juego</h3>
          <p>Sé el primero en compartir tu opinión</p>
          <button 
            className="btn-primera-resena"
            onClick={handleAgregarResena}
          >
            Escribir la primera reseña
          </button>
        </div>
      ) : (
        <div className="resenas-grid">
          {resenas.map(resena => (
            <TarjetaResena
              key={resena._id}
              resena={resena}
              onEditar={handleEditarResena}
              onEliminar={handleEliminarResena}
            />
          ))}
        </div>
      )}

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <FormularioResena
          resena={resenaEditar}
          juegoId={juego._id}
          onCerrar={handleCerrarFormulario}
        />
      )}
    </div>
  );
};

export default ListaResenas;