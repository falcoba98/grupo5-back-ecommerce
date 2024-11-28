# Pasos a seguir solo la primera vez que se monta el proyecto o en caso de ser necesarios.
1. Ejecutar `npm install`
2. Cargar credenciales del servidor.
    - En el archivo db.js completar las propiedades user y password con los de tu servidor de MariaDB.
3. Ejecutar `npm run base_de_datos`. Deberias ver el mensaje `Archivo SQL ejecutado correctamente` en la terminal.
- Los pasos anteriores se deben realizar solo la primera vez que se monte el proyecto ya que son pasos de configuracion.

# Correr el backend
- Ejecutar `npm start` en la terminal para que el backend quede funcional. Este paso es necesario realizarlo cada vez que se quiera encender el backend.
- Deberias poder ver en la terminal la url del backend `http://localhost:3000`
