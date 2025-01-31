# 🖼️ API de Búsqueda de Imágenes

Una API RESTful que permite buscar imágenes utilizando web scraping de Bing Images, con sistema de caché incorporado para optimizar el rendimiento.

## ✨ Características

- 🚀 Búsqueda rápida de imágenes
- 💾 Sistema de caché con TTL de 1 hora
- 🔄 Límite personalizable de resultados
- 🛡️ Manejo de errores robusto
- 🌐 Soporte CORS habilitado

## 🛠️ Tecnologías Utilizadas

- Node.js (v20+)
- Express.js
- Axios
- Cheerio
- Docker
- Railway para despliegue

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/elianrugama/nodejs_buscador_img

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start
```

## 🔍 Uso de la API

### Endpoint Principal

```http
GET /api/images/:query?limit=10
```

#### Parámetros

- `query` (requerido): Término de búsqueda
- `limit` (opcional): Número máximo de resultados (default: 10)

#### Ejemplo de Respuesta

```json
{
  "success": true,
  "query": "gatos",
  "count": 10,
  "images": [
    "https://ejemplo.com/imagen1.jpg",
    "https://ejemplo.com/imagen2.jpg"
    // ...
  ]
}
```

## 🐳 Docker

El proyecto incluye un Dockerfile para facilitar el despliegue:

```bash
# Construir imagen
docker build -t buscador-imagenes-api .

# Ejecutar contenedor
docker run -p 3000:3000 buscador-imagenes-api
```

### Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Variables de Entorno

```env
PORT=3000 # Puerto del servidor (opcional)
```

## 🚨 Manejo de Errores

La API incluye un sistema robusto de manejo de errores que proporciona respuestas claras:

```json
{
  "error": "Error interno del servidor",
  "message": "Descripción detallada del error"
}
```

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── app.js                 # Punto de entrada de la aplicación
│   ├── controllers/           # Controladores
│   │   └── imageController.js
│   ├── routes/               # Rutas de la API
│   │   └── imageSearch.js
│   └── services/             # Servicios
│       └── imageService.js
├── Dockerfile
├── package.json
├── railway.toml              # Configuración de Railway
└── README.md
```

## 🔧 Configuración de Railway

El archivo `railway.toml` configura el despliegue en Railway:

```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
startCommand = "npm start"
healthcheckPath = "/"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
```

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.2",
    "cheerio": "^1.0.0-rc.12",
    "cors": "^2.8.5"
  }
}
```


---
Desarrollado con ❤️ por elianrugama
