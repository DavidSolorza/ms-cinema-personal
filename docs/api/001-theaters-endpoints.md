# Contrato de API 001: Recurso `Theaters` (`/theaters`)

**URL Base Local:** `http://localhost:3000`  
**Controlador:** `src/theaters/theaters.controller.ts`  
**Formato de Intercambio:** `application/json`

---

## 1. Resumen de Endpoints

| Método | Ruta | Descripción | Código Éxito | Códigos Error |
| :---: | :--- | :--- | :---: | :---: |
| `POST` | `/theaters` | Crea un nuevo teatro/sala. | `201 Created` | `400 Bad Request` |
| `GET` | `/theaters` | Lista todos los teatros registrados. | `200 OK` | `500 Internal Server Error` |
| `GET` | `/theaters/:id` | Obtiene el detalle de un teatro por su `id`. | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `PATCH` | `/theaters/:id` | Actualiza parcialmente un teatro existente. | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/theaters/:id` | Elimina un teatro por su `id`. | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `GET` | `/theaters/reports/large/:minCapacity` | Reporte SQL puro de salas con capacidad `>= minCapacity`. | `200 OK` | `400 Bad Request` |

---

## 2. Reglas de Validación (`ValidationPipe` + `class-validator`)

El proyecto tiene configurado `ValidationPipe` global en `src/main.ts` con:
- `whitelist: true`: Elimina propiedades no declaradas en el DTO.
- `forbidNonWhitelisted: true`: Rechaza con `400 Bad Request` cualquier petición que incluya propiedades desconocidas.
- `transform: true`: Transforma tipos primitivos automáticamente.

### Reglas de `CreateTheaterDto`
| Campo | Tipo | Decoradores | Regla |
| :--- | :--- | :--- | :--- |
| `location` | `string` | `@IsString()` | Obligatorio en creación, cadena de texto. |
| `capacity` | `number` | `@IsInt()`, `@Min(1)`, `@Max(1000)` | Obligatorio en creación, número entero entre `1` y `1000`. |

> En `UpdateTheaterDto` (`PartialType(CreateTheaterDto)`), ambos campos son opcionales pero conservan exactamente las mismas reglas de validación si son enviados.

---

## 3. Especificación Detallada de Endpoints

### 3.1 Crear Teatro — `POST /theaters`

**Request Body (`application/json`):**
```json
{
  "location": "Sala IMAX - Centro Mayor",
  "capacity": 150
}
```

**Response `201 Created`:**
```json
{
  "id": 1,
  "location": "Sala IMAX - Centro Mayor",
  "capacity": 150
}
```

**Response `400 Bad Request` (Ejemplo de capacidad inválida):**
```json
{
  "message": [
    "capacity must not be greater than 1000"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### 3.2 Listar Teatros — `GET /theaters`

**Response `200 OK`:**
```json
[
  {
    "id": 1,
    "location": "Sala IMAX - Centro Mayor",
    "capacity": 150
  }
]
```

---

### 3.3 Obtener Teatro por ID — `GET /theaters/:id`

**Parámetros de Ruta:**
- `id` (`number`, validado con `ParseIntPipe`)

**Response `200 OK`:**
```json
{
  "id": 1,
  "location": "Sala IMAX - Centro Mayor",
  "capacity": 150
}
```

**Response `404 Not Found`:**
```json
{
  "message": "Theater with id 99 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### 3.4 Actualizar Teatro — `PATCH /theaters/:id`

**Parámetros de Ruta:**
- `id` (`number`, validado con `ParseIntPipe`)

**Request Body (`application/json`):**
```json
{
  "capacity": 180
}
```

**Response `200 OK`:**
```json
{
  "id": 1,
  "location": "Sala IMAX - Centro Mayor",
  "capacity": 180
}
```

---

### 3.5 Eliminar Teatro — `DELETE /theaters/:id`

**Parámetros de Ruta:**
- `id` (`number`, validado con `ParseIntPipe`)

**Response `200 OK`:**
```json
{
  "message": "Theater #1 deleted successfully"
}
```

---

### 3.6 Reporte SQL de Salas Grandes — `GET /theaters/reports/large/:minCapacity`

**Parámetros de Ruta:**
- `minCapacity` (`number`, validado con `ParseIntPipe`): Capacidad mínima a filtrar.

**Ejemplo de Petición:**
`GET /theaters/reports/large/120`

**Response `200 OK`:**
```json
[
  {
    "id": 1,
    "location": "Sala IMAX - Centro Mayor",
    "capacity": 180
  }
]
```

