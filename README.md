#  Game Tracker

Aplicación web para gestionar tu biblioteca personal de videojuegos y escribir reseñas.

##  Características

- Gestión completa de biblioteca de juegos (CRUD)
- Sistema de reseñas para cada juego
- Filtros por estado (Por jugar, Jugando, Completado, Abandonado)
- Calificación con estrellas (1-5)
- Contador de horas jugadas
- Interfaz moderna y responsive

##  Tecnologías utilizadas

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose

### Frontend
- React.js
- Axios
- CSS3

##  Instalación

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB Atlas cuenta (o MongoDB local)

### Backend

1. Navega a la carpeta del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` con:
```
MONGO_URL=tu_url_de_mongodb_atlas
PORT=3000
```

4. Inicia el servidor:
```bash
npm start
```

### Frontend

1. Navega a la carpeta del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia la aplicación:
```bash
npm start
```

4. Abre http://localhost:3001 en tu navegador

##  Estructura del proyecto
```
game-tracker/
├── backend/
│   ├── controllers/
│   │   ├── juegocontroller.js
│   │   └── resenacontroller.js
│   ├── models/
│   │   ├── juego.js
│   │   └── resena.js
│   ├── routes/
│   │   ├── juegoroute.js
│   │   └── resenaroute.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BibliotecaJuegos.js
    │   │   ├── TarjetaJuego.js
    │   │   ├── FormularioJuego.js
    │   │   ├── ListaResenas.js
    │   │   ├── TarjetaResena.js
    │   │   └── FormularioResena.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   └── (archivos CSS)
    │   ├── App.js
    │   └── App.css
    └── package.json
```

##  Uso

1. **Agregar un juego**: Click en "Agregar Juego" y llena el formulario
2. **Ver reseñas**: Click en "Reseñas" en cualquier tarjeta de juego
3. **Filtrar juegos**: Usa los botones de filtro (Todos, Por jugar, Jugando, etc.)
4. **Calificar**: Usa las estrellas para calificar juegos y reseñas

## Autores

Juan Jose Martinez Villada y Samuel Andres Fernandez Vargas
juanjomji08@gmail.com