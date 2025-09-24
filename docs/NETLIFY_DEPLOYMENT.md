# Guía de Despliegue en Netlify

## Problema Identificado
Error de MIME type al cargar módulos JavaScript en Netlify:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"
```

## Solución Implementada

### 1. Configuración de Netlify (`netlify.toml`)
Se ha creado un archivo de configuración que:
- Define headers correctos para archivos JS, CSS y JSON
- Configura redirects para SPA (Single Page Application)
- Establece headers de seguridad

### 2. Headers Alternativos (`public/_headers`)
Archivo de respaldo para configuración de headers específicos de Netlify.

### 3. Redirects (`public/_redirects`)
Asegura que todas las rutas redirijan a `index.html` para el funcionamiento correcto de la SPA.

### 4. Configuración de Vite Mejorada
- `base: './'` - Rutas relativas para mejor compatibilidad
- Configuración de build optimizada para Netlify
- Nombres de archivos consistentes

## Configuración de Netlify Dashboard

### Build Settings
```
Build command: npm run build
Publish directory: dist
```

### Environment Variables (Si es necesario)
Si usas variables de entorno, agrégalas en:
Site settings → Environment variables

Ejemplo:
```
VITE_SUPABASE_URL=tu_url_aqui
VITE_SUPABASE_ANON_KEY=tu_key_aqui
```

## Pasos para Re-desplegar

1. **Hacer rebuild del proyecto:**
   ```bash
   npm run build
   ```

2. **Verificar que `dist/` contiene los archivos correctos**

3. **Subir cambios a Git:**
   ```bash
   git add .
   git commit -m "Fix Netlify MIME type issues"
   git push
   ```

4. **Trigger nuevo deploy en Netlify:**
   - Ve a tu dashboard de Netlify
   - Click en "Trigger deploy" → "Deploy site"
   - O simplemente espera el auto-deploy desde Git

## Verificación Post-Deploy

1. **Verifica que los headers se aplican correctamente:**
   - Abre Developer Tools
   - Ve a Network tab
   - Recarga la página
   - Verifica que los archivos .js tienen `Content-Type: application/javascript`

2. **Prueba la navegación:**
   - Navega por diferentes secciones
   - Refresca en rutas internas
   - Verifica que no hay errores 404

3. **Verifica funcionalidad:**
   - Cambia idiomas
   - Juega una partida completa
   - Guarda puntuaciones

## Troubleshooting Adicional

### Si el problema persiste:

1. **Verifica el dominio personalizado (si lo tienes):**
   - Algunos CDNs pueden interferir con headers

2. **Limpia cache de Netlify:**
   - Site settings → Build & deploy → Post processing → Clear cache

3. **Verifica logs de build:**
   - Ve a Deploys → Click en el deploy → Ver logs

4. **Prueba en incógnito:**
   - Para descartar problemas de cache del navegador

### Headers que deberías ver:
```
Content-Type: application/javascript; charset=utf-8  (para .js)
Content-Type: text/css; charset=utf-8               (para .css)
Content-Type: application/json; charset=utf-8       (para .json)
```

## Archivos Creados/Modificados

- ✅ `netlify.toml` - Configuración principal de Netlify
- ✅ `public/_headers` - Headers específicos por tipo de archivo
- ✅ `public/_redirects` - Redirects para SPA
- ✅ `vite.config.ts` - Configuración mejorada de build

## Comando para Desplegar

```bash
# Build local
npm run build

# Commit y push
git add .
git commit -m "Fix Netlify deployment configuration"
git push

# Netlify detectará automáticamente los cambios y desplegará
```