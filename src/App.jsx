import React, { useState } from 'react';
import BibliotecaJuegos from './components/BibliotecaJuegos.jsx';
import ListaResenas from './components/ListaResenas.jsx';
import './App.css';

function App() {
  // Estado para controlar qué vista mostrar y qué juego está seleccionado
  const [vistaActual, setVistaActual] = useState('biblioteca'); // 'biblioteca' o 'resenas'
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  // Función que se ejecuta cuando el usuario quiere ver las reseñas de un juego
  // Esta función recibe el juego completo desde la tarjeta cuando se hace clic en "Reseñas"
  const handleVerResenas = (juego) => {
    setJuegoSeleccionado(juego);
    setVistaActual('resenas');
  };

  // Función para volver a la vista de biblioteca
  const handleVolverBiblioteca = () => {
    setJuegoSeleccionado(null);
    setVistaActual('biblioteca');
  };

  return (
    <div className="App">
      {/* Barra de navegación superior */}
      <nav className="navbar">
        <div className="navbar-contenido">
          <h1 className="navbar-titulo">
            <span className="navbar-icono">🎮</span>
            GameTracker
          </h1>
          
          {/* Menú de navegación */}
          <div className="navbar-menu">
            <button 
              className={vistaActual === 'biblioteca' ? 'nav-boton activo' : 'nav-boton'}
              onClick={handleVolverBiblioteca}
            >
              📚 Mi Biblioteca
            </button>
            {juegoSeleccionado && (
              <button className="nav-boton activo">
                💬 Reseñas de {juegoSeleccionado.nombre}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Contenido principal - Aquí renderizamos la vista actual */}
      <main className="contenido-principal">
        {vistaActual === 'biblioteca' ? (
          <BibliotecaJuegos onVerResenas={handleVerResenas} />
        ) : (
          <ListaResenas 
            juego={juegoSeleccionado} 
            onVolver={handleVolverBiblioteca}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 GameTracker - Tu biblioteca personal de videojuegos</p>
      </footer>
    </div>
  );
}

export default App;