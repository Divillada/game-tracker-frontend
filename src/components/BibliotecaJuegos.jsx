import React, { useState, useEffect } from 'react';
import TarjetaJuego from './TarjetaJuego.jsx';
import FormularioJuego from './FormularioJuego.jsx';
import { obtenerJuegos, eliminarJuego } from '../services/api';
import '../styles/BibliotecaJuegos.css';

const BibliotecaJuegos = ({ onVerResenas }) => {
  // Estados del componente
  const [juegos, setJuegos] = useState([]); // Array que contiene todos los juegos
  const [cargando, setCargando] = useState(true); // Indica si estamos cargando datos
  const [error, setError] = useState(null); // Guarda cualquier mensaje de error
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Controla si mostramos el formulario
  const [juegoEditar, setJuegoEditar] = useState(null); // Guarda el juego que estamos editando
  const [filtroEstado, setFiltroEstado] = useState('Todos'); // Estado para filtrar juegos

  // Este efecto se ejecuta cuando el componente se monta (aparece en pantalla)
  // Es como decirle a React: "Cuando cargues este componente, trae los juegos del backend"
  useEffect(() => {
    cargarJuegos();
  }, []);

  // Función para cargar todos los juegos desde el backend
  const cargarJuegos = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (err) {
      setError('Error al cargar los juegos. Verifica que el backend esté corriendo.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  // Función para abrir el formulario de agregar nuevo juego
  const handleAgregarJuego = () => {
    setJuegoEditar(null); // Limpiamos cualquier juego que estuviera en edición
    setMostrarFormulario(true);
  };

  // Función para abrir el formulario de editar un juego existente
  const handleEditarJuego = (juego) => {
    setJuegoEditar(juego);
    setMostrarFormulario(true);
  };

  // Función para eliminar un juego
  const handleEliminarJuego = async (id) => {
    // Pedimos confirmación al usuario antes de eliminar
    if (window.confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      try {
        await eliminarJuego(id);
        // Después de eliminar en el backend, actualizamos el estado local
        // Esto es más eficiente que volver a cargar todos los juegos
        setJuegos(juegos.filter(juego => juego._id !== id));
      } catch (err) {
        alert('Error al eliminar el juego');
        console.error(err);
      }
    }
  };

  // Función que se ejecuta cuando el formulario se cierra (después de guardar o cancelar)
  const handleCerrarFormulario = (juegoGuardado) => {
    setMostrarFormulario(false);
    setJuegoEditar(null);
    
    // Si se guardó un juego (no se canceló), recargamos la lista
    if (juegoGuardado) {
      cargarJuegos();
    }
  };

  // Función para filtrar juegos según el estado seleccionado
  const juegosFiltrados = filtroEstado === 'Todos' 
    ? juegos 
    : juegos.filter(juego => juego.estado === filtroEstado);

  // Calcular estadísticas rápidas
  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(j => j.completado).length;
  const horasTotales = juegos.reduce((total, j) => total + j.horasJugadas, 0);

  // Renderizado condicional: mientras cargamos, mostramos un mensaje
  if (cargando) {
    return (
      <div className="biblioteca-cargando">
        <div className="spinner"></div>
        <p>Cargando biblioteca...</p>
      </div>
    );
  }

  // Si hay un error, lo mostramos
  if (error) {
    return (
      <div className="biblioteca-error">
        <h2>❌ {error}</h2>
        <button onClick={cargarJuegos} className="btn-reintentar">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="biblioteca-container">
      {/* Header con título y botón de agregar */}
      <header className="biblioteca-header">
        <div className="header-contenido">
          <h1 className="biblioteca-titulo">🎮 Mi Biblioteca de Juegos</h1>
          <button 
            className="btn-agregar-juego"
            onClick={handleAgregarJuego}
          >
            ➕ Agregar Juego
          </button>
        </div>

        {/* Panel de estadísticas */}
        <div className="estadisticas-rapidas">
          <div className="stat-item">
            <span className="stat-numero">{totalJuegos}</span>
            <span className="stat-label">Juegos</span>
          </div>
          <div className="stat-item">
            <span className="stat-numero">{juegosCompletados}</span>
            <span className="stat-label">Completados</span>
          </div>
          <div className="stat-item">
            <span className="stat-numero">{horasTotales}h</span>
            <span className="stat-label">Jugadas</span>
          </div>
        </div>

        {/* Filtros */}
        <div className="biblioteca-filtros">
          <button 
            className={filtroEstado === 'Todos' ? 'filtro-activo' : 'filtro'}
            onClick={() => setFiltroEstado('Todos')}
          >
            Todos
          </button>
          <button 
            className={filtroEstado === 'Por jugar' ? 'filtro-activo' : 'filtro'}
            onClick={() => setFiltroEstado('Por jugar')}
          >
            Por jugar
          </button>
          <button 
            className={filtroEstado === 'Jugando' ? 'filtro-activo' : 'filtro'}
            onClick={() => setFiltroEstado('Jugando')}
          >
            Jugando
          </button>
          <button 
            className={filtroEstado === 'Completado' ? 'filtro-activo' : 'filtro'}
            onClick={() => setFiltroEstado('Completado')}
          >
            Completado
          </button>
          <button 
            className={filtroEstado === 'Abandonado' ? 'filtro-activo' : 'filtro'}
            onClick={() => setFiltroEstado('Abandonado')}
          >
            Abandonado
          </button>
        </div>
      </header>

      {/* Grid de juegos */}
      {juegosFiltrados.length === 0 ? (
        <div className="biblioteca-vacia">
          <p className="texto-vacio">
            {filtroEstado === 'Todos' 
              ? '¡Tu biblioteca está vacía! Agrega tu primer juego.'
              : `No tienes juegos en estado "${filtroEstado}".`}
          </p>
        </div>
      ) : (
        <div className="juegos-grid">
          {juegosFiltrados.map(juego => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEditar={handleEditarJuego}
              onEliminar={handleEliminarJuego}
              onVerResenas={onVerResenas}
            />
          ))}
        </div>
      )}

      {/* Modal del formulario */}
      {mostrarFormulario && (
        <FormularioJuego
          juego={juegoEditar}
          onCerrar={handleCerrarFormulario}
        />
      )}
    </div>
  );
};

export default BibliotecaJuegos;