# WebAvanzado-Group8-MyBooksBack

# Para iniciar el back sin docker, dentro de carpeta app:

- Crear archivo .env con las variables en ```.env.example```

- Iniciar una base de datos, idealmente postgres

- Instalar dependencias: ```npm install```

- Crear base de datos: ```npm run db:create```

- Migrar base de datos: ```npm run db:migrate```

- Correr app: ```npm run start``` o ```npm run dev```

- Para resetear la base de datos: ```npm run db:drop``` y luego volverla a crear y migrar.

- En ```/thunderApi``` se encuentran colecciones de la extension thunder client con los enpoints existentes en la api. Es posible importar estas colecciones en postman para obtener la documentacion de los enpoints.

# Para iniciar en back con docker, en la raiz del repo:

- Crear contenedores de la api y la bdd: ```docker compose build```
- Iniciar la api: ```docker compose up```