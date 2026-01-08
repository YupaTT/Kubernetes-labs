# 🗺️ Heatmap Backend - APICecasem

API REST Cecasem 

## 🚀 Cómo correr el proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Levantar base de datos
```bash
docker-compose up -d
```

### 3. Ejecutar setup (crea tablas + datos)
```bash
npm run setup
```

### 4. Iniciar servidor
```bash
npm run start:dev
```

**¡Listo!** API disponible en: `http://localhost:3000`

## 📡 Endpoints

### GET /heatmaps
Lista datos con filtros opcionales:
```bash
# Básico
curl http://localhost:3000/heatmaps

# Con filtros
curl "http://localhost:3000/heatmaps?departamento=La%20Paz&riesgo=Alto&limite=5"
```

### POST /heatmaps
Crear nuevo registro:
```bash
curl -X POST "http://localhost:3000/heatmaps" \
  -H "Content-Type: application/json" \
  -d '{
    "departamento": "La Paz",
    "latitud": -16.5000,
    "longitud": -68.1193,
    "riesgo": "Alto",
    "fecha": "2026-01-08"
  }'
```

## 🔧 Parámetros de filtro

| Parámetro | Ejemplo | Descripción |
|-----------|---------|-------------|
| `departamento` | `La Paz` | Filtrar por departamento |
| `riesgo` | `Alto`, `Medio`, `Bajo` | Nivel de riesgo |
| `fechaInicio` | `2025-12-01` | Fecha desde |
| `fechaFin` | `2026-01-08` | Fecha hasta |
| `limite` | `10` (max 50) | Elementos por página |
| `pagina` | `1` | Número de página |
| `orden` | `fecha`, `-fecha` | Ordenar (- para desc) |

## 🗄️ Datos incluidos

25 registros de los 9 departamentos de Bolivia:
- La Paz, Santa Cruz, Cochabamba
- Potosí, Chuquisaca, Oruro  
- Tarija, Beni, Pando

## 🛠️ Comandos útiles

```bash
npm run start:dev    # Servidor desarrollo
npm run setup        # Recrear datos
npm run build        # Compilar
npm run seed         # Solo ejecutar seeder
```

## 📦 Tecnologías

- **NestJS** - Framework
- **TypeORM** - ORM 
- **PostgreSQL** - Base de datos
- **Docker** - Containerización
