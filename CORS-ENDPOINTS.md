# Configuración de CORS y Endpoints

## 🌐 Configuración de CORS

El backend está configurado para permitir conexiones desde una URL específica del frontend que se configura mediante variables de entorno.

### Configuración:
La URL del frontend se configura a través de la variable de entorno `FRONTEND_URL` en el archivo `.env`:

```bash
FRONTEND_URL=http://localhost:3000
```

### Orígenes permitidos:
- La URL configurada en `FRONTEND_URL` (por defecto: `http://localhost:3000`)

**Nota:** Si no se configura `FRONTEND_URL`, el sistema usará `http://localhost:3000` como valor por defecto.

### Métodos HTTP permitidos:
- GET, POST, PUT, DELETE, PATCH, OPTIONS

### Headers permitidos:
- Origin, X-Requested-With, Content-Type, Accept, Authorization
- Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods

## 🚀 Endpoints Disponibles

Base URL: `http://localhost:3000/api`

### Heatmaps

#### 1. Listar Heatmaps (con paginación y filtros)
```
GET /api/heatmaps
```

**Query Parameters:**
- `pagina`: número de página (default: 1)
- `limite`: elementos por página (default: 10)
- `departamento`: filtrar por departamento
- `riesgo`: filtrar por nivel de riesgo (BAJO, MEDIO, ALTO)
- `fechaInicio`: fecha de inicio (formato: YYYY-MM-DD)
- `fechaFin`: fecha de fin (formato: YYYY-MM-DD)
- `filtro`: búsqueda general en departamento y riesgo
- `campoOrden`: campo para ordenar (fecha, departamento, riesgo, latitud, longitud)
- `sentido`: dirección del ordenamiento (ASC, DESC)

**Ejemplo:**
```
GET /api/heatmaps?pagina=1&limite=10&departamento=Lima&riesgo=ALTO&campoOrden=fecha&sentido=DESC
```

#### 2. Obtener Heatmap por ID
```
GET /api/heatmaps/:id
```

#### 3. Crear Nuevo Heatmap
```
POST /api/heatmaps
```

**Body:**
```json
{
  "departamento": "Lima",
  "latitud": -12.0464,
  "longitud": -77.0428,
  "riesgo": "ALTO",
  "fecha": "2026-01-08"
}
```

#### 4. Actualizar Heatmap
```
PUT /api/heatmaps/:id
```

**Body:**
```json
{
  "departamento": "Lima",
  "latitud": -12.0464,
  "longitud": -77.0428,
  "riesgo": "MEDIO",
  "fecha": "2026-01-08"
}
```

#### 5. Eliminar Heatmap
```
DELETE /api/heatmaps/:id
```

## 📋 Códigos de Estado HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `204 No Content`: Recurso eliminado exitosamente
- `400 Bad Request`: Datos de entrada inválidos
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error interno del servidor

## 🔧 Ejemplo de Uso con JavaScript/Fetch

```javascript
// Configuración base para las peticiones
const API_BASE_URL = 'http://localhost:3000/api';

// Obtener todos los heatmaps
async function getHeatmaps(page = 1, limit = 10) {
  const response = await fetch(`${API_BASE_URL}/heatmaps?pagina=${page}&limite=${limit}`);
  return await response.json();
}

// Crear un nuevo heatmap
async function createHeatmap(heatmapData) {
  const response = await fetch(`${API_BASE_URL}/heatmaps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(heatmapData)
  });
  return await response.json();
}

// Obtener heatmap por ID
async function getHeatmapById(id) {
  const response = await fetch(`${API_BASE_URL}/heatmaps/${id}`);
  return await response.json();
}

// Actualizar heatmap
async function updateHeatmap(id, heatmapData) {
  const response = await fetch(`${API_BASE_URL}/heatmaps/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(heatmapData)
  });
  return await response.json();
}

// Eliminar heatmap
async function deleteHeatmap(id) {
  const response = await fetch(`${API_BASE_URL}/heatmaps/${id}`, {
    method: 'DELETE',
  });
  return response.status === 204;
}
```

## 🧪 Pruebas con cURL

```bash
# Obtener heatmaps
curl -X GET "http://localhost:3000/api/heatmaps?pagina=1&limite=5"

# Crear heatmap
curl -X POST "http://localhost:3000/api/heatmaps" \
  -H "Content-Type: application/json" \
  -d '{
    "departamento": "Lima",
    "latitud": -12.0464,
    "longitud": -77.0428,
    "riesgo": "ALTO",
    "fecha": "2026-01-08"
  }'

# Obtener heatmap específico
curl -X GET "http://localhost:3000/api/heatmaps/1"

# Actualizar heatmap
curl -X PUT "http://localhost:3000/api/heatmaps/1" \
  -H "Content-Type: application/json" \
  -d '{
    "departamento": "Lima",
    "riesgo": "MEDIO"
  }'

# Eliminar heatmap
curl -X DELETE "http://localhost:3000/api/heatmaps/1"
```

## ⚙️ Configuración del Frontend

Para conectar tu frontend con este backend:

1. **Configura la variable de entorno FRONTEND_URL** en tu archivo `.env`:
   ```bash
   FRONTEND_URL=http://localhost:3000
   ```

2. **Ajusta la URL según tu configuración**:
   - Para React (Create React App): `http://localhost:3000`
   - Para Angular: `http://localhost:4200`
   - Para Vite (Vue.js/React): `http://localhost:5173`
   - Para Next.js: `http://localhost:3000`

3. **Reinicia el servidor** después de cambiar la variable de entorno para que los cambios de CORS tomen efecto.

**Ejemplo de configuración:**
```bash
# En tu archivo .env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Esto permitirá que tu aplicación de Vite (corriendo en el puerto 5173) se conecte al backend (corriendo en el puerto 3001).
