import React, { useState, useEffect } from 'react';
import { crearResena, actualizarResena } from '../services/api';
import '../styles/FormularioResena.css';

const FormularioResena = ({ resena, juegoId, onCerrar }) => {
  // Estados para cada campo del formulario
  const [autor, setAutor] = useState('Anónimo');
  const [texto, setTexto] = useState('');
  const [estrellas, setEstrellas] = useState(0);
  
  // Estados de control
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [estrellasHover, setEstrellasHover] = useState(0);

  // Si recibimos una reseña existente (modo edición), llenamos el formulario con sus datos
  useEffect(() => {
    if (resena) {
      setAutor(resena.autor || 'Anónimo');
      setTexto(resena.texto || '');
      setEstrellas(resena.estrellas || 0);
    }
  }, [resena]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!texto.trim()) {
      setError('El texto de la reseña es obligatorio');
      return;
    }

    if (estrellas === 0) {
      setError('Debes seleccionar una calificación');
      return;
    }

    const datosResena = {
      autor: autor.trim() || 'Anónimo',
      texto: texto.trim(),
      estrellas: Number(estrellas),
      juego: resena ? resena.juego : juegoId 
    };

    try {
      setGuardando(true);
      setError(null);

      if (resena) {
        // Modo EDICIÓN
        await actualizarResena(resena._id, datosResena);
      } else {
        // Modo CREACIÓN
        await crearResena(datosResena);
      }

      // Si todo salió bien, cerramos el formulario
      onCerrar(datosResena);
    } catch (err) {
      setError('Error al guardar la reseña. Verifica tu conexión.');
      console.error('Error:', err);
    } finally {
      setGuardando(false);
    }
  };

  // Función para cerrar sin guardar
  const handleCancelar = () => {
    onCerrar(null);
  };

  // Función para renderizar las estrellas interactivas
  const renderEstrellasInteractivas = () => {
    const estrellasArray = [];
    for (let i = 1; i <= 5; i++) {
      const estaLlena = i <= (estrellasHover || estrellas);
      estrellasArray.push(
        <span
          key={i}
          className={estaLlena ? 'estrella-form llena' : 'estrella-form vacia'}
          onClick={() => setEstrellas(i)}
          onMouseEnter={() => setEstrellasHover(i)}
          onMouseLeave={() => setEstrellasHover(0)}
        >
          ★
        </span>
      );
    }
    return estrellasArray;
  };

  return (
    <div className="modal-overlay" onClick={handleCancelar}>
      <div className="modal-resena" onClick={(e) => e.stopPropagation()}>
        {/* Header del modal */}
        <div className="modal-header">
          <h2 className="modal-titulo">
            {resena ? ' Editar Reseña' : ' Nueva Reseña'}
          </h2>
          <button 
            className="btn-cerrar-modal"
            onClick={handleCancelar}
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Mensaje de error si existe */}
        {error && (
          <div className="alerta-error">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="formulario-resena">
          {/* Campo: Nombre del autor */}
          <div className="form-grupo">
            <label htmlFor="autor" className="form-label">
              Tu nombre (opcional)
            </label>
            <input
              type="text"
              id="autor"
              className="form-input"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Anónimo"
            />
            <small className="form-ayuda">
              si queda este campo vacio la respuesta queda como "Anónimo"
            </small>
          </div>

          {/* Campo: Calificación con estrellas */}
          <div className="form-grupo">
            <label className="form-label">
              Calificación * 
              {estrellas > 0 && <span className="calificacion-texto"> ({estrellas}/5)</span>}
            </label>
            <div className="estrellas-container-form">
              {renderEstrellasInteractivas()}
            </div>
            <small className="form-ayuda">
              Haz clic en las estrellas para calificar
            </small>
          </div>

          {/* Campo: Texto de la reseña */}
          <div className="form-grupo">
            <label htmlFor="texto" className="form-label">
              Tu reseña *
            </label>
            <textarea
              id="texto"
              className="form-textarea"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe aquí tu opinión sobre el juego..."
              rows="6"
              required
            />
            <small className="form-ayuda">
              {texto.length} caracteres
            </small>
          </div>

          {/* Botones de acción */}
          <div className="form-acciones">
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancelar}
              disabled={guardando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-guardar"
              disabled={guardando}
            >
              {guardando ? 'Guardando...' : (resena ? 'Actualizar' : 'Publicar Reseña')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioResena;