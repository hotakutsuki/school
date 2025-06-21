# Aplicación de Autenticación Next.js

Esta es una aplicación Next.js con funcionalidad básica de autenticación usando React y TypeScript.

## Características

- **Registro de usuarios**: Formulario para crear nuevas cuentas
- **Login**: Autenticación de usuarios existentes
- **Página de inicio protegida**: Solo accesible para usuarios autenticados
- **Diseño responsive**: Interfaz moderna con Tailwind CSS

## Rutas disponibles

1. `/` - Redirige automáticamente a `/login`
2. `/signup` - Página de registro
3. `/login` - Página de inicio de sesión
4. `/home` - Página principal (requiere autenticación)

## Funcionalidad

### Registro (`/signup`)
- Formulario con campos: Nombre, Teléfono, Email
- Botón de registro (placeholder - no hace nada por ahora)
- Enlace para ir al login

### Login (`/login`)
- Formulario con campos: Email, Contraseña
- Al hacer login exitoso, establece una variable global de usuario
- Redirige automáticamente a `/home`

### Home (`/home`)
- Verifica si el usuario está autenticado
- Si no hay usuario, redirige a `/login`
- Muestra el nombre del usuario en el centro de la pantalla
- Incluye botón de cerrar sesión

## Tecnologías utilizadas

- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS

## Instalación y ejecución

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador

## Notas importantes

- Esta es una implementación básica con variables globales
- En una aplicación real, deberías usar un contexto de React o un estado global más robusto
- La autenticación es simulada (placeholder)
- Los datos no se persisten entre recargas de página
