# Student Management REST API

## Web Development III – Unit 2

The **Student Management REST API** is a backend project developed using **Node.js and Express.js**. It provides REST API endpoints for managing student records through CRUD operations.

The project uses modular routing, custom middleware, error handling, and an in-memory JavaScript array for storing student data.

---

## Project Objectives

The main objectives of this project are:

* Create an Express.js server
* Build REST API endpoints
* Perform CRUD operations on student records
* Use custom middleware
* Implement modular routing
* Handle errors using appropriate HTTP status codes
* Store student information using JavaScript array data
* Test the API using tools such as Postman

---

## Technologies Used

* **Node.js** – JavaScript runtime environment
* **Express.js** – Web framework for creating the REST API
* **Nodemon** – Development tool for automatically restarting the server
* **JavaScript** – Programming language
* **REST API** – API architecture used for student management

---

## Project Structure

```text
Assignment-2/
│
├── app.js
├── package.json
├── package-lock.json
│
├── data/
│   └── students.js
│
├── middleware/
│   └── logger.js
│
├── routes/
│   └── studentRoutes.js
│
└── node_modules/
```

---

## File and Folder Description

### 1. `app.js`

The `app.js` file is the main entry point of the application.

It is responsible for:

* Creating the Express application
* Configuring JSON request handling
* Loading the custom logger middleware
* Connecting the student routes
* Handling unknown routes
* Handling server errors
* Starting the server

The server runs on:

```text
http://localhost:3000
```

---

### 2. `data/students.js`

The `students.js` file contains the student records used by the application.

The student records are stored inside a JavaScript array.

Each student contains:

* ID
* Name
* Age
* Course
* Email

Example:

```javascript
{
  id: 1,
  name: "Aarav Mehta",
  age: 20,
  course: "Computer Applications",
  email: "aarav@example.com"
}
```

The project does not use MongoDB, MySQL, Mongoose, or any other database.

The student records are stored in memory using the JavaScript array.

---

### 3. `middleware/logger.js`

The `logger.js` file contains the custom logger middleware.

It records information about incoming HTTP requests, including:

* Request time
* HTTP method
* Requested URL

Example:

```text
[9/25/2026, 9:30:15 PM] GET /students
```

The middleware is registered in `app.js` using:

```javascript
app.use(logger);
```

---

### 4. `routes/studentRoutes.js`

The `studentRoutes.js` file contains the modular routes for student management.

It handles all major student CRUD operations:

```text
GET     /students
GET     /students/:id
POST    /students
PUT     /students/:id
DELETE  /students/:id
```

The routes are connected to the main application using:

```javascript
app.use("/students", studentRoutes);
```

---

### 5. `package.json`

The `pack
