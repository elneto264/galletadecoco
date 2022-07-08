Tecnología usada:
NodeJs


Prueba técnica para conexión de APIs GuestPro y Holded


## Instalaciones

```sh
cd pruebaCeroOne
npm install
```

Usar ```npm install``` para instalar los modulos correspondientes.

Una vez terminadas las instalaciones requeridas, crear el archivo .env en el root
del proyecto y agregar las key acorde al .example para el uso de las variables de entorno.


Usar el siguiente comando para lanzar la aplicación desde la terminal.
```sh 
npm start
```
En la pantalla de la terminal vamos a ver el siguiente titulo:

---------------Guest Pro-------------------------

Con el output del invoice que viene desde guestPro.

Luego más abajo veremos el titulo de Holded de la siguiente manera:

-----------------Holded-----------------------

a continuacion veremos el invoice con los datos provenientes de guest pro que se envia a 
Holded en un objeto. Luego de este veremos el mensaje de "Lista de pagos en Holded" mostrara un
array vacio [] , lo cual es correcto si no se tiene pagos (el cual es el caso con una Key nueva).
Y en la última linea veremos lo siguiente:
```sh
En Holded { status: 1, info: 'Created', id: '62c805946af09f95f00761e6' }
```

Significa que se creo el pago y nos dara el id de este que vemos como ultimo campo entre las llaves.

## Autor

[Ernesto Silva Languasco](https://www.linkedin.com/in/esilvalan/)
