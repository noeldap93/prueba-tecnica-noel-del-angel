# Frontend
Hecho por Noel Del Angel para una prueba tecnica. noel.delangel@outlook.com

## Que incluye?
- Manejo de autorizacion con jwt.
- Uso de auth guards, auth interceptor
- Uso de error interceptor mostrar toast con errores y regirigir a login en status 401.
- Se maneja el estado del auth en toda la aplicacion con observables.
- Se manejan permisos de administrador y usuario (no fue necesario guard pues solo se solicitaron rutas de user y dashboard).
- Type to search con rxjs para buscar users en el servidor controlando tiempo entre solicitudes y con multicast para evitar solicitudes repetidas .
- Uso de angular-routing


## Para correr el proyecto
- Antes de iniciar:
```
npm i
```

- Para iniciar el servidor de pruebas:
```
npm start
```
