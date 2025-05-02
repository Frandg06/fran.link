# ShortLink Worker Backend (Cloudflare D1 + Hono)

Servicio **serverless** para generar y resolver enlaces cortos empleando **Cloudflare Workers**, el micro‑framework **[Hono](https://hono.dev/)** y un **D1 Database** como almacenamiento clave‑valor.  
La aplicación expone una API REST muy simple:

1. **Crear** un alias a partir de una URL larga.
2. **Listar** los alias existentes.
3. **Actualizar** el destino de un alias.
4. **Redireccionar** al destino cuando se consulta el alias.
5. **Eliminar** un alias.

Todas las rutas mutadoras y la de listado requieren un token simple de autorización definido en la variable de entorno `AUTH_TOKEN`.

---

## Tabla rápida de rutas

| Método   | Path              | Requiere Auth | Descripción                             |
| -------- | ----------------- | ------------- | --------------------------------------- |
| `GET`    | `/:hash`          | ❌            | Redirige (`302`) al destino almacenado. |
| `GET`    | `/api/link`       | ✅            | Devuelve la lista de alias.             |
| `POST`   | `/api/link`       | ✅            | Crea un alias nuevo con hash aleatorio. |
| `DELETE` | `/api/link/:hash` | ✅            | Elimina el alias indicado.              |

> **Nota:** Si el destino no comienza por `http` o `https`, el Worker añadirá automáticamente el prefijo `https://`.

---

## Respuestas y códigos de estado

| Escenario                               | Código | Cuerpo / Cabeceras                                       |
| --------------------------------------- | ------ | -------------------------------------------------------- |
| Alias creado correctamente              | `201`  | `{ "hash": "<hash>" }`                                   |
| Alias actualizado correctamente         | `200`  | _(vacío)_                                                |
| Alias eliminado                         | `204`  | _(vacío)_                                                |
| Listado devuelto                        | `200`  | `[ { hash, destination }, ... ]`                         |
| Alias existente (conflicto al crear)    | `409`  | `{ "error": true, "message": "❌ Hash already exists" }` |
| Autorización ausente o incorrecta       | `401`  | _(vacío)_                                                |
| Alias no encontrado (GET / PATCH / DEL) | `404`  | _(vacío)_                                                |
| Redirección al destino                  | `302`  | `Location: <destination>`                                |

---

## Ejemplos de uso

### Crear alias aleatorio

```bash
curl -X POST https://tu-dominio.com/api/link \
  -H "Authorization: super-secreto" \
  -H "Content-Type: application/json" \
  -d '{"destination":"https://developers.cloudflare.com"}' -i
```

### Listar alias

```bash
curl https://tu-dominio.com/api/link -H "Authorization: super-secreto" -i
```

### Actualizar alias

```bash
curl -X PATCH https://tu-dominio.com/api/link/docs \
  -H "Authorization: super-secreto" \
  -H "Content-Type: application/json" \
  -d '{"destination":"cloudflare.com/docs"}' -i
```

### Acceder

```bash
curl -I https://tu-dominio.com/docs
# HTTP/1.1 302 Found
# Location: https://cloudflare.com/docs
```

### Eliminar

```bash
curl -X DELETE https://tu-dominio.com/api/link/docs -H "Authorization: super-secreto" -i
```

## Variables de entorno

| Nombre                  | Descripción                                            |
| ----------------------- | ------------------------------------------------------ |
| `CLERK_PUBLISHABLE_KEY` | Token exacto requerido en la cabecera `Authorization`. |
| `CLERK_SECRET_KEY`      | Token exacto requerido en la cabecera `Authorization`. |

---

## Futuras mejoras

- Expiración (TTL) configurable por alias.
- Generación de códigos QR.
- Editar urls
- Limitación de peticiones por IP para evitar abuso.

---

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
