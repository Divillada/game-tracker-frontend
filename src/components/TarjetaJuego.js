import React from 'react';
import '../styles/TarjetaJuego.css';

const TarjetaJuego = ({ juego, onEditar, onEliminar, onVerResenas }) => {
  // Función para renderizar las estrellas de puntuación
  const renderEstrellas = (puntuacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span key={i} className={i <= puntuacion ? 'estrella-llena' : 'estrella-vacia'}>
          ★
        </span>
      );
    }
    return estrellas;
  };

  // Función para obtener el color según el estado del juego
  const obtenerColorEstado = (estado) => {
    const colores = {
      'Por jugar': '#FFA500',
      'Jugando': '#4CAF50',
      'Completado': '#2196F3',
      'Abandonado': '#F44336'
    };
    return colores[estado] || '#999';
  };

  return (
    <div className="tarjeta-juego">
      {/* Portada del juego */}
      <div className="tarjeta-portada">
        {juego.portadaURL ? (
          <img 
            src={juego.portadaURL} 
            alt={juego.nombre}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x280?text=Sin+Imagen';
            }}
          />
        ) : (
          <div className="portada-placeholder">
            <span>🎮</span>
            <p>Sin portada</p>
          </div>
        )}
        
        {/* Badge de estado */}
        <div 
          className="tarjeta-estado" 
          style={{ backgroundColor: obtenerColorEstado(juego.estado) }}
        >
          {juego.estado}
        </div>
        
        {/* Badge de completado */}
        {juego.completado && (
          <div className="tarjeta-completado">
            ✓ Completado
          </div>
        )}
      </div>

      {/* Información del juego */}
      <div className="tarjeta-info">
        <h3 className="tarjeta-titulo">{juego.nombre}</h3>
        
        <div className="tarjeta-detalle">
          <span className="detalle-icono">🎯</span>
          <span>{juego.plataforma}</span>
        </div>

        <div className="tarjeta-detalle">
          <span className="detalle-icono">⏱️</span>
          <span>{juego.horasJugadas} horas jugadas</span>
        </div>

        <div className="tarjeta-puntuacion">
          {renderEstrellas(juego.estrellas)}
          <span className="puntuacion-numero">({juego.estrellas}/5)</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="tarjeta-acciones">
        <button 
          className="btn-accion btn-editar" 
          onClick={() => onEditar(juego)}
          title="Editar juego"
        >
           Editar
        </button>
        <button 
          className="btn-accion btn-resenas" 
          onClick={() => onVerResenas(juego)}
          title="Ver reseñas"
        >
           Reseñas
        </button>
        <button 
          className="btn-accion btn-eliminar" 
          onClick={() => onEliminar(juego._id)}
          title="Eliminar juego"
        >
           Eliminar
        </button>
      </div>
    </div>
  );
};

export default TarjetaJuego;
