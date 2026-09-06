# Despliegue en este VPS

Código base: `c764b990c596b7d25491ec570aec1e67d1b8f931`.
Directorio: `/home/deploy/projects/athletes-pair-match/backend`.

## Acceso público

- Backend: https://2.28.118.113
- Salud: https://2.28.118.113/api/health
- Documentación interactiva: https://2.28.118.113/api/docs
- Frontend autorizado por CORS: https://inspiringgirls.netlify.app

Caddy 2.11.4 sirve HTTPS directamente sobre la IPv4, con un certificado público
Let’s Encrypt para esa IP y el perfil ACME `shortlived`. El certificado se
renueva automáticamente; las claves y el estado de ACME se guardan en el volumen
`web-gateway_caddy_data`. HTTP en el puerto 80 redirige a HTTPS en el 443.
No hace falta un dominio ni instalar certificados en los dispositivos clientes.

## Conectar Netlify

Configurar esta variable de entorno para la compilación en el sitio Netlify:

```text
VITE_API_BASE_URL=https://2.28.118.113
```

Volver a construir y desplegar el frontend. La variable no lleva `/api` ni barra
final: el cliente del repositorio añade las rutas. No se necesitan credenciales
de PostgreSQL en Netlify. La configuración de Netlify no se ha modificado desde
este VPS; falta ese cambio y el nuevo despliegue del frontend.

## Servicios y datos

FastAPI y PostgreSQL están desplegados con Docker Compose, reinicio automático
y volumen persistente `athletes-pair-match_postgres_data`. Docker tiene activado
el inicio con el sistema. PostgreSQL no publica puertos en el host. La API
escucha solamente en `127.0.0.1:8000`; Caddy recibe las conexiones públicas.

`PROXY_TRUSTED_IPS=127.0.0.1,172.19.0.1` permite que Uvicorn reconozca la IP del
visitante enviada por el proxy. Se comprobó que `172.19.0.1` es el origen efectivo
de las conexiones de Caddy al contenedor. Si se elimina y recrea la red Docker
`athletes-pair-match_ingress`, comprobar de nuevo su gateway y actualizar `.env`
si cambia. No confiar en todas las IP con `*`.

Se usa un solo worker de Uvicorn porque el limitador del repositorio almacena
sus contadores en memoria por proceso. La lógica de negocio y los requisitos
Python del repositorio se conservan.

## Verificación

Pruebas disponibles: salud, CORS preflight, creación de partida, ranking,
lectura del leaderboard y rechazo de datos inválidos. La partida temporal se
elimina al terminar. Para probar la ruta pública y validar el certificado:

```bash
cd /home/deploy/projects/athletes-pair-match/backend
# Verifica HTTPS con las autoridades de confianza del contenedor, sin omitir TLS.
docker compose -f compose.production.yml exec -T -e TEST_API_URL=https://2.28.118.113 api python < ops/smoke.py
```

## Operación

Desde el directorio del backend:

```bash
docker compose -f compose.production.yml ps
docker compose -f compose.production.yml logs --tail=100 api
docker compose -f compose.production.yml up -d --build --wait
bash ops/backup.sh
```

Los secretos están en `.env` con permisos 600 y excluidos de Git y del contexto
de construcción. Las copias manuales quedan en `backups/`, también excluidas.
No hay todavía una programación de copias ni almacenamiento fuera del VPS.
No ejecutar `docker compose down -v`: eliminaría los datos persistentes.

## Proxy compartido

Configuración en `/home/deploy/projects/gateway/sites/athletes.caddy`.
La copia versionada del proxy está en `backend/ops/gateway/` (Compose,
`Caddyfile` y configuración del sitio). Para reproducir este despliegue,
copiar su contenido a `/home/deploy/projects/gateway/` antes de iniciar Caddy.
Los cambios futuros deben mantenerse sincronizados con esa copia versionada.
Se pueden añadir otras aplicaciones mediante nuevos archivos `sites/*.caddy`
cuando tengan dominio, o configurar rutas adicionales si comparten la misma IP.

```bash
cd /home/deploy/projects/gateway
docker compose ps
docker compose logs --tail=100 caddy
docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

Mantener disponibles los puertos TCP 80 y 443 para acceso y validación ACME.
No se ha modificado el firewall del VPS. El certificado está vinculado a la IP:
si esta cambia, hay que actualizar Caddy y la variable de Netlify.

Los archivos del despliegue se conservan en el repositorio; los secretos,
las copias de seguridad y los volúmenes de Docker quedan fuera de Git.
