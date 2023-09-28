# Task Management System

## How to set up and run the project

  

1. Clone the repository to your local machine.

2. Make sure you are using the node version 18 or above & Install the dependencies using `npm install`.

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```
JWT_SECRET=<your_secret_key>
DATABASE_URL="postgresql://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:5432/<DB_DATABASE>?schema=public"
```

Replace all the placeholder values with your own keys.

4. Run the migrations using `npm run migrate`.

5. Start the server using `npm start`.

6. The server will be running at `http://localhost:3000`.

  

## Brief

- Tech stacks used:
   - Framework: Express.js
   - Database: PostgreSQL
   - ORM: Prisma

## API Documentation

### User Routes:
- Signup: Creates a new user account
   - URL: `/users/signup`
   - Method: `POST`
   - Request Body:
      - `name` (string, required): Name of the user.
      - `email` (string, required): Email of the user.
      - `password` (string, required): Password of the user.
   - Response:
      - `201 OK`: User account created successfully and returns the access token.
      - `400 Bad Request`: Invalid request body or missing required fields.

- Login: Authenticates a user and generates an access token.
   - URL: `/users/login`
   - Method: `POST`
   - Request Body:
      - `email` (string, required): Email of the user.
      - `password` (string, required): Password of the user.
   - Response:
      - `200 OK`: User authenticated successfully. Returns the access token.
      - `400 Bad Request`: Invalid request body or missing required fields.
      - `401 Unauthorized`: Invalid credentials.

### Task Routes:
- Get All Tasks: Retrieves all tasks
   - URL: `/tasks`
   - Method: `GET`
   - Response:
      - `200 OK`: Returns an array of tasks.
      - `500 Internal Server Error`: If there is an error retrieving the tasks.

- Get Task by ID: Retrieves a specific task by its ID
   - URL: `/tasks/:id`
   - Method: `GET`
   - Parameters:
      - `id` (path parameter): The ID of the task to retrieve.
   - Response:
      - `200 OK`: Returns the task object.
      - `400 Bad Request`: If the ID is invalid.
      - `500 Internal Server Error`: If there is an error retrieving the task.
      
- Create Task: Creates a new task.
   - URL: `/tasks/`
   - Method: `POST`
   - Request Body:
      - `title` (string, required): The title of the task.
      - `description` (string, required): The description of the task.
      - `status` (string, required): any one among open, inprogress or completed.
   - Response:
      - `201 Created`: Returns the created task object.
      - `400 Bad Request`: If the request body is invalid.
      - `500 Internal Server Error`: If there is an error creating the task.

- Update Task: Updates an existing task.
   - URL: `/tasks/:id`
   - Method: `PUT`
   - Parameters:
      - `id` (path parameter): The ID of the task to update.
   - Request Body:
      - `title` (string): The updated title of the task.
      - `description` (string): The updated description of the task.
      - `status` (string): any one among open, inprogress or completed.

   - Response:
      - `200 OK`: Returns the updated task object.
      - `400 Bad Request`: If the ID is invalid or the request body is invalid.
      - `500 Internal Server Error`: If there is an error updating the task.

- Delete Task: Deletes a specific task by its ID.
   - URL: `/tasks/:id`
   - Method: `DELETE`
   - Parameters:
      - `id` (path parameter): The ID of the task to delete.
   - Response:
      - `204 No Content`: If the task is successfully deleted.
      - `400 Bad Request`: If the ID is invalid.
      - `500 Internal Server Error`: If there is an error deleting the task.

- Get Metrics: Retrieves metrics related to tasks
   - URL: `/tasks/metrics`
   - Method: `GET`
   - Response:
      - `200 OK`: Returns the metrics object.
      - `500 Internal Server Error`: If there is an error retrieving the metrics.