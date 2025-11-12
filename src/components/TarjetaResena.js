import React from 'react';
import '../styles/TarjetaResena.css';

const TarjetaResena = ({ resena, onEditar, onEliminar }) => {
  // Función para formatear la fecha de manera legible
  const formatearFecha = (fecha) => {
    const opciones = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span 
          key={i} 
          className={i <= calificacion ? 'estrella-llena' : 'estrella-vacia'}
        >
          ★
        </span>
      );
    }
    return estrellas;
  };

  return (
    <div className="tarjeta-resena">
      {/* Header de la tarjeta con información del autor y fecha */}
      <div className="resena-header">
        <div className="resena-autor-info">
          {/* Ícono de usuario decorativo */}
          <div className="autor-avatar">
            <span></span>
          </div>
          <div className="autor-detalles">
            <h4 className="autor-nombre">{resena.autor}</h4>
            <p className="resena-fecha">{formatearFecha(resena.fecha)}</p>
          </div>
        </div>
        
        {/* Calificación con estrellas */}
        <div className="resena-calificacion">
          {renderEstrellas(resena.estrellas)}
        </div>
      </div>

      {/* Contenido principal: el texto de la reseña */}
      <div className="resena-contenido">
        <p className="resena-texto">{resena.texto}</p>
      </div>

      {/* Botones de acción: editar y eliminar */}
      <div className="resena-acciones">
        <button 
          className="btn-resena-editar"
          onClick={() => onEditar(resena)}
          title="Editar reseña"
        >
           Editar
        </button>
        <button 
          className="btn-resena-eliminar"
          onClick={() => onEliminar(resena._id)}
          title="Eliminar reseña"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TarjetaResena;