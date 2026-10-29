# Contrato de API 002: Recurso `Projectors` (`/projectors`)

**URL Base Local:** `http://localhost:3000`  
**Controlador:** `src/projectors/projectors.controller.ts`

---

## 1. Resumen de Endpoints

| Método | Ruta | Descripción | Éxito | Errores Posibles |
| :---: | :--- | :--- | :---: | :---: |
| `POST` | `/projectors` | Crea un proyector (con `theaterId` opcional). | `201 Created` | `400`, `404`, `409 Conflict` |
| `GET` | `/projectors` | Lista todos los proyectores con su `theaterId`. | `200 OK` | `500` |
| `GET` | `/projectors/:id` | Consulta un proyector por `id`. | `200 OK` | `400`, `404 Not Found` |
| `PATCH` | `/projectors/:id` | Actualiza datos o asocia/reasigna `theaterId`. | `200 OK` | `400`, `404`, `409 Conflict` |
| `DELETE` | `/projectors/:id` | Elimina un proyector por `id`. | `200 OK` | `400`, `404 Not Found` |

---

## 2. Ejemplos de Peticiones y Respuestas

### 2.1 Crear Proyector sin Asociación (`POST /projectors`)
```json
{
  "brand": "Epson",
  "high": 1080,
  "width": 1920
}
```
**Respuesta (`201 Created`):**
```json
{
  "id": 1,
  "brand": "Epson",
  "high": 1080,
  "width": 1920
}
```

### 2.2 Crear Proyector Asociado a un Theater (`POST /projectors`)
```json
{
  "brand": "Epson",
  "high": 1080,
  "width": 1920,
  "theaterId": 1
}
```
**Respuesta (`201 Created`):**
```json
{
  "id": 2,
  "brand": "Epson",
  "high": 1080,
  "width": 1920,
  "theaterId": 1
}
```
> Si el `theaterId` ya tiene otro proyector asignado, devuelve `409 Conflict`: `"Theater with id 1 already has a projector"`.

### 2.3 Actualizar / Reasignar Proyector (`PATCH /projectors/:id`)
```json
{
  "brand": "Sony",
  "theaterId": 2
}
```

