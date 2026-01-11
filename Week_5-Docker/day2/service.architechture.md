# Multi-Container Todo Application

## Services

### Client

- React application
- Runs on port 3000
- Communicates with backend via HTTP

### Server

- Node.js + Express API
- Runs on port 5000
- Connects to MongoDB using Docker service name

### MongoDB

- Official MongoDB image
- Data persisted using named volume

## Networking

- All containers share default Docker Compose network
- Service discovery via container names

## Volumes

- mongo-data stores database files
- Prevents data loss on container restart

## Startup

- Entire system starts using:
  docker compose up -d
