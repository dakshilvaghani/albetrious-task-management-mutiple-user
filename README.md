# Task Management App with Proper Authentication

## [Live URL](https://albetrious-task-management-mutiple-user-3eoh.onrender.com/)

Visit the live application: [Task Management App]([https://albetrious-task-management.onrender.com/](https://albetrious-task-management-mutiple-user-3eoh.onrender.com/))

## Overview

This Task Management App allows users to manage their tasks effectively by adding, editing, deleting, and filtering tasks based on the due date. Each task has properties such as title, description, due date, and status (completed or pending). Additionally, the app allows different users to log in and register, with each user being able to view only their own tasks.

## Features

### 1. CRUD Functionality
- **Create**: Users can add new tasks with a title, description, and due date.
- **Read**: Users can view their tasks and filter them by due date.
- **Update**: Users can edit the task details including title, description, due date, and status.
- **Delete**: Users can remove tasks from the list.

### 2. Date Filtering
- Users can filter tasks by the due date using a date picker.
- The task list will show only tasks for the selected date.

### 3. Status Toggle
- Users can mark tasks as either completed or pending.

### 4. User Authentication
- Users can register and log in to the app.
- Each user can view and manage **only their own tasks**.

## Tech Stack

### Front-End
- **React**: Used for the front-end interface, components like task list, forms, and date picker.
- **Tailwind CSS**: For styling and creating a responsive and user-friendly UI.

### Back-End
- **Node.js & Express**: The back-end server for handling API requests and CRUD operations.

### Database
- **MongoDB**: Stores tasks with the following fields:
  - `title`: String
  - `description`: String
  - `dueDate`: Date
  - `status`: Boolean (completed or pending)
  - `userId`: Stores the ID of the user who created the task.

### Additional Tools
- **Axios**: For making HTTP requests from the front-end.
- **JWT**: For handling user authentication securely.


### Task Management
- **POST /tasks**: Add a new task (requires user authentication).
- **GET /tasks**: Retrieve tasks based on the selected date (send the date as a query parameter and only return tasks for the logged-in user).
- **PUT /tasks/:id**: Edit an existing task (requires user authentication).
- **DELETE /tasks/:id**: Delete a task (requires user authentication).

### User Authentication
- **POST /user/register**: Register a new user.
- **POST /user/login**: Login to the app and get a token.

