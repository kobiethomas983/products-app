# Products-App
A node.js app that allows you to do CRUD operations on products. Backend uses express and mongoose
and the front end uses the EJS framework.

## Setup
### 1. Start docker-compose 
The MONGODB database must be available before running this service.
The easiest way to get started locally is by running these commands
in a different terminal:

```
cd /path/to/products-app
cd docker/product
docker-compose up
```

### 2. Run the service
The previous step must be completed in order to run the service locally

1. The easiest way to run `node index.js`
1. To check that the application is running enter url `http://localhost:3000/product

## 3. Seed the database
1. To seed the database execute this command `node seed.js` while the application running.