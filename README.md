## 1. Primeros Pasos:

### 1.1 Instalar dependencias

    
    yarn install

### 1.2 Creacio de la tabla comercio

      create table comercio(
      idComercio int auto_increment primary key,
      nombreComercio varchar(50) not null
      )

### 1.3 Pasos finales

      1 Crear el archivo `.env` en la raíz del proyecto y agregar la variable de entorno `REDIS_URL`, `JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
      2. Abrir en el navegador la dirección `http://localhost:3000/`
      3. Correr en Postman los endpoints descritos en la sección 3 de este documento

### 1.4 Ejecutar el proyecto

### 1.4.1 Ejecutar el proyecto en modo desarrollo

    npm run start

### 1.4.2 Ejecutar el proyecto en modo TEST

    npm run test:e2e

## 2. Descripción del proyecto

El proyecto consiste en recibir los datos de una tarjeta , validarla y luego de eso utilizar jwt para generar un token y enviarlo al cliente.
Tambien recibe el token y lo valida para poder consultar el comercial-x-id y enviarlo al cliente.
Los tokens generados tienen un tiempo de vida de 15 minutos.

## 3. Endpoints - Desarrollo

### 3.1. POST /payment-process/v2/token

    example body:
    {
    "card_number":411090502145433318,
    "cvv":123,
    "expiration_month":"1",
    "expiration_year": "2024",
    "email":"prueba123@gmail.com"
    }
    example response:
    {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDExMDkwNTAyMTQ1NDM
    }

### 3.2 GET payment-process/v2/charge

    Le enviamos por Authorization el token generado en el paso anterior
    Authorization : Bearer Token
    'x-comercial-id' : 150809
    example response:
    {
    "comercio": {
        "idComercio": 150809,
        "nombreComercio": "Charge"
    },
    "succes": true

    }

## 4 . Endpoints - Produccion

### 4.1. POST /dev/payment-process/v2/charge

    URL : https://198vg7790g.execute-api.us-east-1.amazonaws.com/dev/payment-process/v2/charge

### 4.2 GET /dev/payment-process/v2/charge

    URL : https://198vg7790g.execute-api.us-east-1.amazonaws.com/dev/payment-process/v2/charge


### 5 Deploy en aws
  
      -npm run build
      -npm serverless deploy

##  6. Serverless Offline

      - npx serverless offline 

### 7. Credenciales de Desarrollo

```bash
REDIS_URL="rediss://default:7690760f1e544c0c8f5fcce4a65d0f1c@eu2-witty-snail-30884.upstash.io:30884"
JWT_SECRET = "challengeCard@$%"
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=''
DB_NAME=prueba

```
