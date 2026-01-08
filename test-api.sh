#!/bin/bash

# 🧪 Script de Prueba - API Heatmaps
# Asegúrate de que la API esté corriendo en http://localhost:3000

API_URL="http://localhost:3000"
echo "🧪 Probando API Heatmaps en $API_URL"
echo "================================"

# 1. Crear varios focos de prueba
echo "1️⃣ Creando focos de prueba..."

# Foco 1 - La Paz, Alto riesgo
echo "📍 Creando foco en La Paz (Alto riesgo)..."
FOCO1=$(curl -s -X POST $API_URL/heatmaps \
  -H "Content-Type: application/json" \
  -d '{
    "departamento": "La Paz",
    "latitud": -16.5000,
    "longitud": -68.1500,
    "riesgo": "Alto",
    "fecha": "2026-01-08"
  }')
echo "$FOCO1" | jq .
ID1=$(echo "$FOCO1" | jq -r .id)

# Foco 2 - Santa Cruz, Medio riesgo
echo "📍 Creando foco en Santa Cruz (Medio riesgo)..."
FOCO2=$(curl -s -X POST $API_URL/heatmaps \
  -H "Content-Type: application/json" \
  -d '{
    "departamento": "Santa Cruz",
    "latitud": -17.7833,
    "longitud": -63.1821,
    "riesgo": "Medio",
    "fecha": "2026-01-07"
  }')
echo "$FOCO2" | jq .
ID2=$(echo "$FOCO2" | jq -r .id)

# Foco 3 - Cochabamba, Bajo riesgo
echo "📍 Creando foco en Cochabamba (Bajo riesgo)..."
FOCO3=$(curl -s -X POST $API_URL/heatmaps \
  -H "Content-Type: application/json" \
  -d '{
    "departamento": "Cochabamba",
    "latitud": -17.3895,
    "longitud": -66.1568,
    "riesgo": "Bajo",
    "fecha": "2026-01-06"
  }')
echo "$FOCO3" | jq .

echo ""
echo "2️⃣ Probando filtros..."

# Listar todos
echo "📋 Todos los focos:"
curl -s $API_URL/heatmaps | jq .

echo ""
echo "🏢 Filtrar por departamento (La Paz):"
curl -s "$API_URL/heatmaps?departamento=La Paz" | jq .

echo ""
echo "⚠️ Filtrar por riesgo (Alto):"
curl -s "$API_URL/heatmaps?riesgo=Alto" | jq .

echo ""
echo "📅 Filtrar por fecha (desde 2026-01-07):"
curl -s "$API_URL/heatmaps?fechaInicio=2026-01-07" | jq .

echo ""
echo "🎯 Filtro combinado (Santa Cruz + Medio riesgo):"
curl -s "$API_URL/heatmaps?departamento=Santa Cruz&riesgo=Medio" | jq .

echo ""
echo "3️⃣ Probando endpoints adicionales..."

echo "📊 Estadísticas:"
curl -s $API_URL/heatmaps/estadisticas | jq .

echo ""
echo "🔍 Obtener foco específico (ID: $ID1):"
curl -s $API_URL/heatmaps/$ID1 | jq .

echo ""
echo "4️⃣ Probando validaciones..."

echo "❌ Riesgo inválido:"
curl -s "$API_URL/heatmaps?riesgo=MuyAlto" | jq .

echo ""
echo "❌ Fechas inválidas:"
curl -s "$API_URL/heatmaps?fechaInicio=2026-01-31&fechaFin=2026-01-01" | jq .

echo ""
echo "5️⃣ Actualizando foco..."
echo "✏️ Actualizando riesgo del foco $ID2 a Alto:"
curl -s -X PUT $API_URL/heatmaps/$ID2 \
  -H "Content-Type: application/json" \
  -d '{"riesgo": "Alto"}' | jq .

echo ""
echo "6️⃣ Limpieza (eliminando focos de prueba)..."
if [ ! -z "$ID1" ] && [ "$ID1" != "null" ]; then
  echo "🗑️ Eliminando foco $ID1..."
  curl -s -X DELETE $API_URL/heatmaps/$ID1
fi

if [ ! -z "$ID2" ] && [ "$ID2" != "null" ]; then
  echo "🗑️ Eliminando foco $ID2..."
  curl -s -X DELETE $API_URL/heatmaps/$ID2
fi

echo ""
echo "✅ Pruebas completadas!"
echo ""
echo "📚 Documentación:"
echo "- ENDPOINTS-API.md - Documentación completa de endpoints"
echo "- README.md - Información general del proyecto"
