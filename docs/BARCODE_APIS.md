# APIs de Información de Productos por Código de Barras

Este proyecto utiliza múltiples APIs públicas para obtener información de productos mediante códigos de barras EAN-13, EAN-8, UPC-A y UPC-E.

## APIs Implementadas

### 1. **Open Food Facts API** ⭐ Recomendada
- **URL**: https://world.openfoodfacts.org
- **Tipo**: Gratuita, sin límites
- **Especialidad**: Productos alimenticios y bebidas
- **Cobertura**: Mundial, especialmente fuerte en Europa y América Latina
- **Ventajas**:
  - Sin necesidad de API key
  - Sin límite de requests
  - Base de datos colaborativa muy completa
  - Información nutricional detallada
  - Ideal para supermercados y tiendas de alimentación

**Ejemplo de uso**:
```
GET https://world.openfoodfacts.org/api/v0/product/7702010003004.json
```

**Datos que retorna**:
- Nombre del producto (en español e inglés)
- Marca
- Cantidad/Tamaño
- Categorías
- Imágenes del producto
- Información nutricional completa
- Ingredientes
- Sellos y certificaciones

### 2. **UPC Database API**
- **URL**: https://upcdatabase.com
- **Tipo**: Freemium
- **Plan gratuito**: 100 requests/día
- **Especialidad**: Productos generales (electrónica, ropa, hogar, etc.)
- **Ventajas**:
  - Base de datos global amplia
  - Incluye precios de referencia
  - Categorización detallada

**Ejemplo de uso (modo trial)**:
```
GET https://api.upcitemdb.com/prod/trial/lookup?upc=885909950805
```

**Plan Pro** (opcional):
- $9.99/mes - 10,000 requests/mes
- $49.99/mes - 100,000 requests/mes
- Sitio: https://upcdatabase.com/api

### 3. **EAN-Search.org API**
- **URL**: https://www.ean-search.org
- **Tipo**: Gratuita con registro
- **Especialidad**: Base de datos europea principalmente
- **Ventajas**:
  - Buena cobertura de productos europeos
  - API sencilla
  - Registro gratuito

**Para usar**:
1. Regístrate en: https://www.ean-search.org/ean-database-api.html
2. Obtén tu token gratuito
3. Agrega al `.env`: `EAN_SEARCH_TOKEN=tu_token_aqui`

**Ejemplo de uso**:
```
GET https://api.ean-search.org/api?token=YOUR_TOKEN&op=barcode-lookup&ean=7702010003004&format=json
```

## Configuración

### Variables de Entorno (opcionales)

Agrega al archivo `.env` si quieres usar EAN-Search:

```env
# EAN-Search API Token (opcional)
EAN_SEARCH_TOKEN=tu_token_aqui
```

### Flujo de Búsqueda

El sistema busca en este orden:

1. **Open Food Facts** - Prioridad para productos alimenticios
2. **UPC Database** - Respaldo para productos generales
3. **EAN-Search** - Opcional, si tienes token configurado

## Uso en el Proyecto

### Desde el Formulario de Producto

1. Ve a "Editar Producto" o "Nuevo Producto"
2. Haz clic en el botón "📷 Escanear"
3. Permite el acceso a la cámara
4. Apunta al código de barras del producto
5. El sistema:
   - Detecta el código automáticamente
   - Busca en las APIs
   - Rellena los campos del formulario
   - Muestra la fuente de información

### Desde el Código

```typescript
import { fetchProductByBarcode } from '@/actions';

const productData = await fetchProductByBarcode('7702010003004');

if (productData.found) {
  console.log('Producto:', productData.name);
  console.log('Marca:', productData.brand);
  console.log('Fuente:', productData.source);
} else {
  console.log('Producto no encontrado');
}
```

## Tipos de Códigos Soportados

- **EAN-13**: Códigos de 13 dígitos (más común en productos)
- **EAN-8**: Códigos de 8 dígitos (productos pequeños)
- **UPC-A**: Códigos de 12 dígitos (común en USA)
- **UPC-E**: Códigos de 6 dígitos (versión comprimida de UPC-A)

## Ejemplos de Códigos para Probar

```
7702010003004  - Coca Cola 350ml (Perú)
7750885005814  - Inca Kola 500ml (Perú)
7702012019905  - Pepsi 500ml (Perú)
885909950805   - Apple AirPods (USA)
5449000000996  - Coca Cola Internacional
```

## Limitaciones

### Open Food Facts
- Principalmente productos alimenticios
- Puede no tener productos muy nuevos
- Calidad de datos variable (colaborativo)

### UPC Database (Trial)
- 100 requests/día en modo gratuito
- Puede requerir upgrade para uso intensivo

### EAN-Search
- Requiere registro
- Mejor cobertura europea

## Recomendaciones

1. **Para supermercados**: Usa principalmente Open Food Facts
2. **Para tiendas generales**: Combina Open Food Facts + UPC Database
3. **Productos europeos**: Considera agregar EAN-Search con token
4. **Uso intensivo**: Considera planes pagos de UPC Database

## Alternativas Adicionales (No implementadas)

Si necesitas más cobertura, considera estas APIs:

- **Barcode Lookup**: https://www.barcodelookup.com/api (Freemium)
- **UPC API**: https://www.upcapi.com (Freemium)
- **DataKick**: https://www.datakick.org (Open Source)

## Soporte

Para más información sobre las APIs:
- Open Food Facts: https://wiki.openfoodfacts.org/API
- UPC Database: https://upcdatabase.com/api
- EAN-Search: https://www.ean-search.org/ean-database-api.html
