import React, { useState, useEffect } from 'react';
import { crearJuego, actualizarJuego } from '../services/api';
import '../styles/FormularioJuego.css';

const FormularioJuego = ({ juego, onCerrar }) => {
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [portadaURL, setPortadaURL] = useState('');
  const [estado, setEstado] = useState('Por jugar');
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [completado, setCompletado] = useState(false);
  const [estrellas, setEstrellas] = useState(0);
  
  // Estados para controlar el comportamiento del formulario
  const [guardando, setGuardando] = useState(false); 
  const [error, setError] = useState(null); 
  const [estrellasHover, setEstrellasHover] = useState(0); 


  useEffect(() => {
    if (juego) {
      setNombre(juego.nombre || '');
      setPlataforma(juego.plataforma || '');
      setPortadaURL(juego.portadaURL || '');
      setEstado(juego.estado || 'Por jugar');
      setHorasJugadas(juego.horasJugadas || 0);
      setCompletado(juego.completado || false);
      setEstrellas(juego.estrellas || 0);
    } else {
    }
  }, [juego]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene que el navegador recargue la página
    
    // Validación básica: el nombre es obligatorio
    if (!nombre.trim()) {
      setError('El nombre del juego es obligatorio');
      return;
    }

    if (!plataforma.trim()) {
      setError('La plataforma es obligatoria');
      return;
    }

    // Preparamos el objeto con todos los datos del juego
    const datosJuego = {
      nombre: nombre.trim(),
      plataforma: plataforma.trim(),
      portadaURL: portadaURL.trim(),
      estado,
      horasJugadas: Number(horasJugadas),
      completado,
      estrellas: Number(estrellas)
    };

    try {
      setGuardando(true);
      setError(null);

      if (juego) {
        await actualizarJuego(juego._id, datosJuego);
      } else {
        await crearJuego(datosJuego);
      }

      onCerrar(datosJuego);
    } catch (err) {
      setError('Error al guardar el juego. Verifica tu conexión con el backend.');
      console.error('Error al guardar:', err);
    } finally {
      setGuardando(false);
    }
  };

  const handleCancelar = () => {
    onCerrar(null); 
  };

  const renderEstrellasInteractivas = () => {
    const estrellasArray = [];
    for (let i = 1; i <= 5; i++) {
      const estaLlena = i <= (estrellasHover || estrellas);
      estrellasArray.push(
        <span
          key={i}
          className={estaLlena ? 'estrella-formulario llena' : 'estrella-formulario vacia'}
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
      <div className="modal-formulario" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-titulo">
            {juego ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}
          </h2>
          <button 
            className="btn-cerrar-modal"
            onClick={handleCancelar}
            type="button"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="alerta-error">
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-grupo">
            <label htmlFor="nombre" className="form-label">
              Nombre del juego *
            </label>
            <input
              type="text"
              id="nombre"
              className="form-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: The Legend of Zelda"
              required
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="plataforma" className="form-label">
              Plataforma *
            </label>
            <input
              type="text"
              id="plataforma"
              className="form-input"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
              placeholder="Ej: Nintendo Switch, PS5, PC"
              required
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="portadaURL" className="form-label">
              URL de la portada (opcional)
            </label>
            <input
              type="url"
              id="portadaURL"
              className="form-input"
              value={portadaURL}
              onChange={(e) => setPortadaURL(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {portadaURL && (
              <div className="preview-portada">
                <img 
                  src={portadaURL} 
                  alt="Vista previa" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-grupo">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <select
              id="estado"
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Por jugar">Por jugar</option>
              <option value="Jugando">Jugando</option>
              <option value="Completado">Completado</option>
              <option value="Abandonado">Abandonado</option>
            </select>
          </div>

          <div className="form-grupo">
            <label htmlFor="horasJugadas" className="form-label">
              Horas jugadas: {horasJugadas}h
            </label>
            <input
              type="range"
              id="horasJugadas"
              className="form-range"
              min="0"
              max="500"
              value={horasJugadas}
              onChange={(e) => setHorasJugadas(e.target.value)}
            />
          </div>

          <div className="form-grupo">
            <label className="form-label">
              Puntuación: {estrellas}/5
            </label>
            <div className="estrellas-container">
              {renderEstrellasInteractivas()}
            </div>
          </div>

          <div className="form-grupo checkbox-grupo">
            <label htmlFor="completado" className="checkbox-label">
              <input
                type="checkbox"
                id="completado"
                checked={completado}
                onChange={(e) => setCompletado(e.target.checked)}
              />
              <span className="checkbox-texto">Marcar como completado</span>
            </label>
          </div>

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
              {guardando ? 'Guardando...' : (juego ? 'Actualizar' : 'Crear Juego')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioJuego;