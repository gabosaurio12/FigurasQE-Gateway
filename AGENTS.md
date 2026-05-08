# AGENTS.md

Scope: applies to the `FigurasQE-Gateway` project.

## Purpose
API Gateway en Express 5 (Node.js). Punto de entrada único para clientes; enruta tráfico a los servicios backend sin exponer sus URLs directamente.

## Run And Validate
```
# Desde la carpeta FigurasQE-Gateway/
node src/server.js
```
- Requiere un archivo `.env` en esta carpeta (no está en el repositorio).
- No hay script `start` en `package.json` — agregar `"start": "node src/server.js"` si se necesita.
- No hay tests actualmente.

## Estructura

```
src/
  server.js          ← entry point; registra middlewares y monta rutas
  routes/
    auth.js          ← proxy a AuthenticationService (/auth/*)
    data.js          ← proxy a MicroservicioFiguras (/data/*)
```

## Variables De Entorno (`.env`)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `AUTH_SERVICE` | URL base del servicio de autenticación | `http://localhost:5000` |
| `DATA_SERVICE` | URL base del servicio de dominio | `http://localhost:5001` |
| `PORT` | Puerto del gateway (opcional, default 3000) | `3000` |

## Rutas Expuestas

| Método | Ruta Gateway | → Upstream | Reenvía `Authorization` |
|---|---|---|---|
| `POST` | `/auth/login` | `AUTH_SERVICE/auth/login` | No (no requerido) |
| `POST` | `/auth/register` | `AUTH_SERVICE/auth/register` | No (no requerido) |
| `GET` | `/data/students` | `DATA_SERVICE/students` | **No** ⚠️ |
| `GET` | `/data/students/:id` | `DATA_SERVICE/students/:id` | Sí |

> ⚠️ `GET /data/students` no reenvía el header `Authorization` — el dominio lo requerirá si el endpoint está protegido.

## Convenciones De Código

- Cada grupo de rutas en su propio archivo bajo `src/routes/`; registrar en `server.js` con `app.use('/prefijo', routeModule)`.
- Usar `axios` para las llamadas upstream; leer la URL base del servicio desde `process.env` al inicio del archivo de rutas.
- Propagar siempre el status HTTP del upstream al cliente (`res.status(response.status).json(...)`).
- Para rutas que requieren autenticación en el backend, reenviar el header `Authorization`:
  ```js
  headers: { Authorization: req.headers.authorization }
  ```
- No incluir lógica de negocio en el gateway; solo enrutar y propagar errores.
- En el bloque `catch`, leer `error.response?.status` para propagar el código de error correcto en lugar de devolver siempre 500.

## Known Issues / WIP

- `GET /data/students` no reenvía `Authorization` → el dominio rechazará la petición si la ruta está protegida.
- No hay script `start` en `package.json`.
- No hay manejo de timeout para llamadas upstream (axios default: sin timeout).
- CORS está habilitado para todos los orígenes (`cors()` sin opciones) — restringir en producción.
