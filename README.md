# Flight Service Backend

This project is a flight service backend with five microservices implemented using Node.js and RabbitMQ. The microservices are:

1. **AuthService**: This microservice is responsible for authorization and authentication of users.

2. **BookingService**: This microservice handles the booking of flights for users.

3. **SearchService**: This microservice implements CRUD operations on flights. Users can search for flights and view their details.

4. **ReminderService**: This microservice is responsible for sending emails and reminders to users regarding their flight bookings.

5. **API Gateway**: This microservice acts as a proxy server and handles rate limiting. It also routes requests to the appropriate microservice.

## Architecture

The architecture of this project is based on the microservices architecture. Each microservice is implemented as a separate Node.js application, with its own database. RabbitMQ is used as a message broker to facilitate communication between the microservices.

The API gateway is implemented using Node.js and Express.js. It handles all incoming requests and routes them to the appropriate microservice based on the endpoint.

## Technologies Used

This project uses the following technologies:

- Node.js
- MySQL
- RabbitMQ

## Installation and Setup

1. Clone the repository using `git clone <repo_url>`
2. Install Node.js and MySQL on your system
3. Install dependencies for each microservice using `npm install`
4. Set environment variables for each microservice. Sample environment variables are provided in the `.env.example` files for each microservice.
5. Start each microservice using `npm start`. Start the API gateway last.

### Sequelize and Sequelize CLI with MySQL2

This project uses Sequelize as the ORM for the MySQL database. To set up Sequelize and Sequelize CLI with MySQL2, follow these steps:

1. Install Sequelize CLI globally using `npm install -g sequelize-cli`
2. Create a new MySQL database for the project using a MySQL client like MySQL Workbench
3. Edit the `.env` file in the `BookingService` directory with the appropriate database credentials
4. Run the following command in the `BookingService` directory to create the database tables

```
sequelize db:migrate
```
This will create the necessary tables in the MySQL database.

## Usage

The API gateway listens on port 3005 by default(You can change it according to your environment variables). You can send requests to the API gateway using any HTTP client.

## Contributing

Contributions to this project are welcome. To contribute, fork the repository, make your changes, and submit a pull request.
