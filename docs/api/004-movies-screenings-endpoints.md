# Contrato de API 004: Recursos `Movies` y `Screenings`

**URL base local:** `http://localhost:3000`  
**Controladores:** `src/movies/movies.controller.ts`, `src/screenings/screenings.controller.ts`

> Las rutas de reportes se declaran antes de `GET /:id`, para que `reports` no se intente convertir a número.

---

## 1. `/movies`

| Método | Ruta | Descripción | Éxito | Errores |
| :---: | :--- | :--- | :---: | :---: |
| `POST` | `/movies` | Crea una película. | `201` | `400` |
| `GET` | `/movies/reports/oldest` | Película más antigua. | `200` | `404` |
| `GET` | `/movies/reports/most-screenings` | Película con más funciones. | `200` | `404` |
| `GET` | `/movies` | Lista películas con sus funciones. | `200` | — |
| `GET` | `/movies/:id` | Consulta una película. | `200` | `400`, `404` |
| `PATCH` | `/movies/:id` | Actualiza una película. | `200` | `400`, `404` |
| `DELETE` | `/movies/:id` | Elimina una película (falla si tiene funciones). | `200` | `404`, `500` (FK) |

### Validaciones de `CreateMovieDto`
| Campo | Regla |
| :--- | :--- |
| `name` | `string` obligatorio, no vacío. |
| `duration` | Entero `>= 1` (minutos). |
| `date` | Fecha ISO, ej. `"2014-11-07"`. |

### Ejemplo — `POST /movies`
```json
{
  "name": "Interestelar",
  "duration": 169,
  "date": "2014-11-07"
}
```
**Respuesta `201`:**
```json
{
  "id": 1,
  "name": "Interestelar",
  "duration": 169,
  "date": "2014-11-07"
}
```

---

## 2. `/screenings`

| Método | Ruta | Descripción | Éxito | Errores |
| :---: | :--- | :--- | :---: | :---: |
| `POST` | `/screenings` | Crea una función (sala + película). | `201` | `400`, `404` |
| `GET` | `/screenings/reports/next-three` | Las 3 funciones futuras más cercanas. | `200` | — |
| `GET` | `/screenings` | Lista funciones. | `200` | — |
| `GET` | `/screenings/:id` | Consulta una función. | `200` | `400`, `404` |
| `PATCH` | `/screenings/:id` | Cambia hora, sala o película. | `200` | `400`, `404` |
| `DELETE` | `/screenings/:id` | Elimina una función. | `200` | `404` |

### Validaciones de `CreateScreeningDto`
| Campo | Regla |
| :--- | :--- |
| `scheduledAt` | Fecha ISO 8601 con zona horaria, ej. `"2026-11-15T19:30:00-05:00"`. |
| `theaterId` | Entero `>= 1`, la sala debe existir. |
| `movieId` | Entero `>= 1`, la película debe existir. |

### Ejemplo — `POST /screenings`
```json
{
  "scheduledAt": "2026-11-15T19:30:00-05:00",
  "theaterId": 1,
  "movieId": 1
}
```
**Respuesta `201`:**
```json
{
  "id": 1,
  "scheduledAt": "2026-11-16T00:30:00.000Z",
  "theaterId": 1,
  "movieId": 1
}
```

### Ejemplo — `PATCH /screenings/1`
```json
{
  "scheduledAt": "2026-11-15T21:00:00-05:00",
  "theaterId": 2
}
```

### Errores comunes
```json
{ "message": "Theater with id 99 not found", "error": "Not Found", "statusCode": 404 }
```
```json
{ "message": "Movie with id 99 not found", "error": "Not Found", "statusCode": 404 }
```

