# 🔧 Solución al Error "Token de pago no definido" en Vercel

## Problema
El error "Token de pago no definido" aparece porque las variables de entorno `NEXT_PUBLIC_*` en Next.js necesitan estar disponibles en **tiempo de compilación (build time)**, no solo en runtime.

## ✅ Solución Paso a Paso

### 1. Verificar Variables en Vercel

Ve a tu proyecto en Vercel:
1. **Proyecto** → **Settings** → **Environment Variables**
2. Verifica que tengas estas variables:
   - `NEXT_PUBLIC_CULQI_PUBLIC_KEY` (empieza con `pk_test_` o `pk_live_`)
   - `CULQI_SECRET_KEY` (empieza con `sk_test_` o `sk_live_`)

### 2. Configurar Variables para TODOS los Entornos

**MUY IMPORTANTE**: Asegúrate de que las variables estén marcadas para:
- ✅ Production
- ✅ Preview
- ✅ Development

![image](https://github.com/user-attachments/assets/ejemplo.png)

### 3. Redesplegar (Redeploy) el Proyecto

Después de agregar/modificar variables de entorno:

**Opción A - Desde el Dashboard de Vercel:**
1. Ve a **Deployments**
2. Encuentra el último deployment
3. Click en los 3 puntos **⋯**
4. Click en **Redeploy**
5. **IMPORTANTE**: Marca la opción **"Use existing Build Cache"** como **NO** (desmarcada)

**Opción B - Desde Git:**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### 4. Limpiar Caché del Navegador

Después del redespliegue:
1. Abre tu sitio en producción
2. Presiona `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)
3. O abre DevTools → Application → Clear Storage

## 🔍 Verificar que Funciona

### En Desarrollo Local:
```bash
# 1. Reinicia el servidor
npm run dev
# o
yarn dev

# 2. Abre la consola del navegador
# Deberías ver: "🔑 Culqi Public Key: Configurada ✅"
```

### En Producción (Vercel):
1. Abre tu sitio
2. Abre DevTools (F12) → Console
3. Busca mensajes de Culqi
4. **NO** deberías ver errores de "public-key está vacía o no definida"

## 🐛 Debug Adicional

Si el error persiste, agrega esto temporalmente a tu componente:

```tsx
useEffect(() => {
  console.log('🔍 Debug Culqi:');
  console.log('Public Key:', process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY);
  console.log('Todas las env:', Object.keys(process.env));
}, []);
```

## ⚠️ Notas Importantes

1. **Variables NEXT_PUBLIC_*** se compilan en el build
   - Cambiarlas requiere un nuevo build
   - No se actualizan automáticamente

2. **No uses valores dinámicos** en `process.env`
   ```tsx
   // ❌ MAL - No funcionará
   const key = 'CULQI_PUBLIC_KEY';
   process.env[`NEXT_PUBLIC_${key}`]
   
   // ✅ BIEN
   process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY
   ```

3. **Verifica el formato de las llaves**
   - Public Key: `pk_test_XXXXXXXXXXXX` o `pk_live_XXXXXXXXXXXX`
   - Secret Key: `sk_test_XXXXXXXXXXXX` o `sk_live_XXXXXXXXXXXX`

## 📋 Checklist de Verificación

- [ ] Variables agregadas en Vercel Dashboard
- [ ] Variables configuradas para Production/Preview/Development
- [ ] Proyecto redespllegado (redeploy) sin caché
- [ ] Caché del navegador limpiada
- [ ] Console.log muestra la llave como "Configurada ✅"
- [ ] No hay errores en la consola del navegador

## 🆘 Si Aún No Funciona

1. **Verifica los logs de build en Vercel**
   - Ve a Deployments → Último deployment → View Build Logs
   - Busca errores relacionados con environment variables

2. **Prueba en modo Preview**
   - Crea un nuevo branch
   - Push cambios
   - Vercel creará un preview deployment
   - Prueba ahí primero

3. **Contacta soporte de Vercel**
   - A veces hay problemas con la propagación de variables
   - El equipo de Vercel puede ayudar a debuggear

## 🔗 Links Útiles

- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Culqi Panel Integración](https://integ-panel.culqi.com/)
