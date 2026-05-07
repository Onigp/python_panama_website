# 🚀 Configuración de Supabase para Python Panamá

## 📋 Pasos para configurar Supabase

### 1. Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Espera a que se configure completamente

### 2. Configurar la base de datos
1. En tu proyecto de Supabase, ve a **SQL Editor** (en el menú lateral)
2. Copia y pega TODO el contenido del archivo `supabase-setup.sql`
3. Haz clic en **Run** para ejecutar el script
4. Verifica que no haya errores y que aparezca "Success"

### 3. Verificar la tabla
1. Ve a **Table Editor** en el menú lateral
2. Deberías ver la tabla `volunteers` en la lista
3. Haz clic en ella para ver la estructura

### 4. Probar la conexión
Ejecuta el script de prueba:
```bash
node test-supabase.js
```

Si todo está bien, deberías ver:
```
✅ Conexión exitosa con Supabase
✅ Inserción exitosa: [...]
🧹 Registro de prueba eliminado
🎉 ¡Supabase está configurado correctamente!
```

## 🔧 Solución de problemas

### Si no aparece la tabla:
1. Asegúrate de que ejecutaste TODO el script SQL
2. Verifica que no haya errores en la consola de Supabase
3. Intenta refrescar la página del Table Editor

### Si hay errores de conexión:
1. Verifica que las variables en `.env` sean correctas
2. Asegúrate de que el proyecto de Supabase esté activo
3. Revisa que las APIs keys no hayan expirado

### Si el formulario no funciona:
1. Abre la consola del navegador (F12)
2. Intenta enviar el formulario y busca errores
3. Verifica que las variables de entorno se estén cargando

## 📊 Estructura de la tabla `volunteers`

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | SERIAL | Auto | ID único |
| name | TEXT | ✅ | Nombre completo |
| email | TEXT | ✅ | Correo electrónico |
| phone | TEXT | ❌ | Teléfono |
| city | TEXT | ✅ | Ciudad |
| experience | TEXT | ❌ | Nivel de experiencia |
| interests | TEXT[] | ❌ | Array de intereses |
| availability | TEXT | ❌ | Disponibilidad |
| message | TEXT | ❌ | Mensaje adicional |
| created_at | TIMESTAMP | Auto | Fecha de creación |

## 🔒 Seguridad
- ✅ RLS habilitado
- ✅ Inserciones públicas permitidas (para el formulario)
- ✅ Lecturas solo para usuarios autenticados
- ✅ Índices optimizados para búsquedas

¡Listo! Tu formulario ahora guarda datos directamente en Supabase. 🎉