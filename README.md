# Api (netcore 3.1) + frontend (Angular 9) + MongoDB

This project containing an Api developed in .netcore 3.1, frontend application developed in Angular 9 and MongoDb as database.

All aplications can be Containerized with docker following the below instructions:

## Getting Started
### Prerequisites
* Docker
* Docker-Compose

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/esantanasilva/Code7Test.git
   ```

2. Settup Docker
    ```sh
   docker-compose -f "docker-compose.yml" up -d --build
   ```

After runing docker-compose, the applications will be running in the below url/ports:

**Database**

* [MongoDB](http://localhost:27017)    

* [Mongo Express](http://localhost:8081)

**Backend Application**

* [API](http://localhost:8082)

* [API Documentation](http://localhost:8082/swagger/index.html)

**Frontend Application (Register and List customers debts)**
* [Frontend](http://localhost:8083)

## Manualy Installation

### Prerequisites
* [MongoDB](https://docs.mongodb.com/manual/installation/)
* [NodeJs](https://nodejs.org/en/)
* [Angular CLI](https://angular.io/guide/setup-local#install-the-angular-cli)

1. Clone the repo
 ```sh
   git clone https://github.com/esantanasilva/Code7Test.git
   ```
2. Enter in Backend project folder and install the dependences
 ```sh
   dotnet restore
   ```
3. Enter in frontend project folder and install the dependences
 ```sh
   npm install  
   ```
4. Run the Api project (get the port number)

5. Configure the localhost with the given port in frontend application 
    ```sh
    Code7Test\FrontEnd\src\environments
   ```
   ```
    export const environment = {
        production: false,
        baseUrlApi: 'http://localhost',
        baseUrlApiPort: 53318,
    };
   ```
6. Run Frontend App
    ```sh
    ng serve --o
   ```
