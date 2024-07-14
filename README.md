# Dishes Dashboard

A full-stack application for managing and displaying dish information. The dashboard allows users to toggle the published status of dishes and shows real-time updates. 

## Features

- Display a list of dishes with their information.
- Toggle the published status of dishes.
- Real-time updates reflecting changes made directly in the backend.
- Responsive design.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, Socket.IO, Axios
- **Styling:** CSS, Bootstrap (optional)
- **Real-Time:** Socket.IO

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Neha7895928593/Dish-manage-information-with-real-time-useSocket.io
    cd dishes
    ```

2. **Install dependencies:**
    ```bash
    cd Backend
    npm install
    cd ..
    cd dishes
    npm install
    cd..
    
    ```

        ```

3. **Start the server:**
    ```cd Backend
    node seed_mock_dishes.js
    node server.js
    ```

4. **Start the client:**
      add new terminal
    ``` cd dishes
    npm start
    ```



## Usage

### API Endpoints

- **Get all dishes:**
    ```http
    GET /api/dishes
    ```

- **Toggle dish published status:**
    ```http
    PATCH /api/dishes/:id/toggle
    ```

- **Add a new dish:**
    ```http
    POST /api/dishes
    ```

### Real-Time Updates

The application uses Socket.IO to handle real-time updates. Whenever a dish is added or its published status is toggled, the changes are broadcasted to all connected clients.

## File Structure
Euphotic_Labs
|____Backend
└───model
     |
│ dishSchema.js
|________
│ .env
│ .gitignore
│ README.md
│ package.json
│ server.js
| seed_mock_dishes
│
├───client
│ │ package.json
│ │ public
│ │ src
│ └─── ...
│


- **Neha Rani**
- **Email:** neha7895928593@gmail.com
- **GitHub:** [https://github.com/Neha7895928593)


