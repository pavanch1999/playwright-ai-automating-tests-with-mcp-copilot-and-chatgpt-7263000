# BuggyBoard REST API Test Plan

## Overview
This document outlines the test cases for the BuggyBoard REST API endpoints.

## Endpoints

### 1. GET /api/health
- **Description**: Check if the API is running and the database connection status.
- **Positive Test Cases**:
    - [ ] `200 OK`: API returns status and database connection state.

### 2. POST /api/login
- **Description**: Authenticate a user.
- **Positive Test Cases**:
    - [ ] `200 OK`: Successful login with valid username and password.
- **Negative Test Cases**:
    - [ ] `400 Bad Request`: Blank username.
    - [ ] `400 Bad Request`: Blank password.
    - [ ] `400 Bad Request`: Missing credentials.
    - [ ] `401 Unauthorized`: Invalid username or password.

### 3. GET /api/bugs
- **Description**: List all bugs.
- **Positive Test Cases**:
    - [ ] `200 OK`: Returns an array of bugs.

### 4. GET /api/bugs/:id
- **Description**: Get a specific bug by ID.
- **Positive Test Cases**:
    - [ ] `200 OK`: Returns the bug details for a valid ID.
- **Negative Test Cases**:
    - [ ] `400 Bad Request`: Invalid ID (not a number).
    - [ ] `404 Not Found`: Bug ID does not exist.

### 5. PUT /api/bugs/:id
- **Description**: Update an existing bug.
- **Positive Test Cases**:
    - [ ] `200 OK`: Successful update with valid data.
- **Negative Test Cases**:
    - [ ] `400 Bad Request`: Blank title.
    - [ ] `400 Bad Request`: Blank severity or invalid severity.
    - [ ] `400 Bad Request`: Blank owner.
    - [ ] `400 Bad Request`: Blank description.
    - [ ] `400 Bad Request`: Invalid state.
    - [ ] `404 Not Found`: Bug ID does not exist.

### 6. DELETE /api/bugs/:id
- **Description**: Delete a bug.
- **Positive Test Cases**:
    - [ ] `204 No Content`: Successful deletion of a valid bug.
- **Negative Test Cases**:
    - [ ] `400 Bad Request`: Invalid ID (not a number).
    - [ ] `404 Not Found`: Bug ID does not exist.

### 7. POST /api/bugs
- **Description**: Create a new bug.
- **Positive Test Cases**:
    - [ ] `201 Created`: Successful creation with valid data.
- **Negative Test Cases**:
    - [ ] `400 Bad Request`: Blank title.
    - [ ] `400 Bad Request`: Blank severity or invalid severity.
    - [ ] `400 Bad Request`: Blank owner.
    - [ ] `400 Bad Request`: Blank description.
