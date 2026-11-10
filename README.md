# User Profile Node.js App

A containerized Node.js application featuring a user profile interface, backed by MongoDB and Mongo Express. The entire stack is orchestrated using Docker Compose for seamless local development and deployment.

## Tech Stack

- **Backend:** Node.js (v20), Express.js, MongoDB Native Driver
- **Database:** MongoDB
- **Database GUI:** Mongo Express
- **Infrastructure:** Docker, Docker Compose

## Project Structure

```text
├── src/
│   └── server.js           # Express server and database connection logic
├── assets/                 # Static frontend files served by Express
│   ├── index.html
│   └── profile-picture.jpeg
├── Dockerfile              # Multi-stage instructions for the Node.js container
├── docker-compose.yaml     # Orchestrates Node app, MongoDB, and Mongo Express
├── package.json            # Node.js dependencies
└── .gitignore              # Ignored files (e.g., node_modules, mongo_data)
```

## Prerequisites

Before running this project, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- Git

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mazinghorab/docker-dmeo.git
   cd docker-demo
   ```

2. **Build and start the Docker containers:**
   ```bash
   docker-compose up -d --build
   ```

## Accessing the Services

Once the containers are running, you can access the following services in your web browser:

*   **Node.js Application:** [http://localhost:3000](http://localhost:3000)
    *   View and update the user profile.
*   **Mongo Express:** [http://localhost:8081](http://localhost:8081)
    *   Web-based administrative interface for viewing the database collections.

## Stopping the Stack

To stop the containers and safely shut down the database, run:
```bash
docker-compose down
```