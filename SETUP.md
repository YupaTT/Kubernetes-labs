# 🗺️ Heatmap Backend - API de Datos Policiales de Bolivia

API REST para gestionar datos de mapas de calor con información policial de los departamentos de Bolivia.

## 🚀 Características

- **NestJS**: Framework moderno de Node.js
- **TypeORM**: ORM con soporte para PostgreSQL y migraciones
- **Seeder**: Datos de prueba de departamentos bolivianos
- **Paginación**: Sistema profesional con filtros y ordenamiento
- **Validación**: DTOs con class-validator

## 📋 Requisitos Previos

- Node.js (v18+)
- Docker y Docker Compose
- npm

## ⚡ Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```

### 3. Iniciar base de datos
```bash
docker-compose up -d
```

### 4. Ejecutar setup completo (Migraciones + Seeder)
```bash
npm run setup
```

### 5. Iniciar servidor de desarrollo
```bash
npm run start:dev
```

El servidor estará disponible en: `http://localhost:3000`

## 🗄️ Base de Datos

### Estructura de la tabla `heatmap`:
- `id`: Identificador único
- `departamento`: Departamento de Bolivia
- `latitud`: Coordenada latitud (decimal)
- `longitud`: Coordenada longitud (decimal)
- `riesgo`: Nivel de riesgo (Bajo, Medio, Alto)
- `fecha`: Fecha del registro

### Departamentos incluidos:
- **La Paz** - Capital administrativa
- **Santa Cruz** - Más poblado
- **Cochabamba** - Centro del país
- **Potosí** - Zona minera
- **Chuquisaca** - Sucre (Capital constitucional)
- **Oruro** - Zona altiplánica
- **Tarija** - Sur del país
- **Beni** - Región amazónica
- **Pando** - Frontera norte

## 📡 API Endpoints

### GET /heatmaps
Lista datos con paginación y filtros

**Query Parameters:**
```
limite=10-50        # Elementos por página (default: 10)
pagina=1+           # Número de página (default: 1)
departamento=texto  # Filtrar por departamento
riesgo=Bajo|Medio|Alto # Filtrar por nivel de riesgo
fechaInicio=YYYY-MM-DD # Fecha inicio
fechaFin=YYYY-MM-DD    # Fecha fin
filtro=texto        # Búsqueda general
orden=campo         # Ordenar por campo (usar -campo para DESC)
```

**Ejemplo de petición:**
```
GET /heatmaps?departamento=La Paz&riesgo=Alto&limite=20&pagina=1&orden=-fecha
```

**Ejemplo de respuesta:**
```json
{
  "items": [
    {
      "id": 1,
      "departamento": "La Paz",
      "latitud": -16.5000,
      "longitud": -68.1193,
      "riesgo": "Alto",
      "fecha": "2025-12-01T00:00:00.000Z"
    }
  ],
  "total": 25,
  "pagina": 1,
  "limite": 10,
  "totalPaginas": 3
}
```

### POST /heatmaps
Crear nuevo registro

**Body:**
```json
{
  "departamento": "La Paz",
  "latitud": -16.5000,
  "longitud": -68.1193,
  "riesgo": "Alto",
  "fecha": "2026-01-08"
}
```

## 🛠️ Comandos Disponibles

### Desarrollo
```bash
npm run start:dev      # Servidor desarrollo con hot reload
npm run build          # Compilar aplicación
npm run start:prod     # Servidor producción
```

### Base de Datos
```bash
npm run setup            # ✨ Ejecutar migraciones + seeder (RECOMENDADO)
npm run migration:run    # Ejecutar migraciones solamente
npm run seed             # Ejecutar seeder solamente
npm run migration:revert # Revertir última migración
```

### Testing y Calidad
```bash
npm run test             # Ejecutar tests
npm run lint             # Linter ESLint
npm run format           # Formatear con Prettier
```

## 🏗️ Arquitectura

```
src/
├── application/heatmap/     # Módulo principal
│   ├── controller/          # Controladores REST
│   ├── service/            # Lógica de negocio
│   ├── repository/         # Acceso a datos
│   └── dto/               # Data Transfer Objects
├── entities/              # Entidades TypeORM
├── common/               # Código compartido
│   ├── enums/           # Enumeraciones
│   └── dto/            # DTOs comunes (paginación)
├── migrations/          # Migraciones de BD
├── seeders/            # Datos de prueba
├── scripts/           # Scripts utilitarios
└── config/           # Configuración TypeORM
```

## 🔧 Configuración

### Variables de entorno (.env)
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=heatmap_db
LOG_SQL=true
```

## 🗃️ Datos de Prueba

El seeder incluye **25 registros** con:
- Datos de los 9 departamentos de Bolivia
- Coordenadas geográficas reales
- Distribución de riesgo: Alto, Medio, Bajo
- Fechas desde diciembre 2025 hasta enero 2026

**Ejecutar seeder:**
```bash
npm run setup  # Crea tablas + inserta datos
```

## 📝 Ejemplo de Uso

```bash
# 1. Levantar todo
docker-compose up -d
npm run setup

# 2. Iniciar servidor
npm run start:dev

# 3. Probar API
curl "http://localhost:3000/heatmaps?departamento=La%20Paz&limite=5"
```

## 🚦 Estado del Proyecto

✅ Configuración básica de NestJS  
✅ Integración con PostgreSQL  
✅ Sistema de migraciones automáticas  
✅ Seeder con datos bolivianos  
✅ API REST con paginación avanzada  
✅ Validación completa de DTOs  
✅ Filtros y ordenamiento  
✅ Documentación completa  

---

*Proyecto desarrollado con NestJS, TypeORM y PostgreSQL para gestionar datos policiales de Bolivia.*
