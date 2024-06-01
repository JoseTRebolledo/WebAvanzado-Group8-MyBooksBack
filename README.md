# WebAvanzado-Group8-MyBooksBack

# Para iniciar el back

- Crear archivo .env con las variables en ```.env.example```

- Iniciar una base de datos, idealmente postgres

- Instalar dependencias: ```npm install```

- Crear base de datos: ```npm run db:create```

- Migrar base de datos: ```npm run db:migrate```

- Correr app: ```npm run start``` o ```npm run dev```

- Para resetear la base de datos: ```npm run db:drop``` y luego volverla a crear y migrar.

- En ```/thunderApi``` se encuentran colecciones de la extension thunder client con los enpoints existentes en la api. Instalar la extension y luego importar las colecciones para utilizarlas. 