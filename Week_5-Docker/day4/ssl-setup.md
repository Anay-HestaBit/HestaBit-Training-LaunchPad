# Day 4: SSL/TLS Setup with NGINX and mkcert

## Objective

To secure a local Node.js application using HTTPS, simulating a production environment where traffic is encrypted between the client and the reverse proxy. This ensures sensitive data, such as login credentials, is not transmitted in plain text.

## Architecture Overview

- **Client:** Browser / Curl (Host Machine)
- **Reverse Proxy:** NGINX (Docker Container) listening on Port 443 (SSL) and Port 80 (HTTP).
- **Backend:** Node.js (Docker Container) listening on Port 3000 (Internal Docker Network).
- **Certificate Authority:** Local CA created via `mkcert` to sign trusted certificates for development.

## Implementation Steps

### 1. Certificate Generation

We used `mkcert` to act as a local Certificate Authority and generate valid certificates for the local domain.

**Commands Executed:**

```bash
# Install local CA
mkcert -install

# Generate certificates for localhost and custom domain
mkcert AnayKaApp.local localhost 127.0.0.1

Output Files:

certs/AnayKaApp.local+2.pem (Public Certificate)

certs/AnayKaApp.local+2-key.pem (Private Key)


2. Docker Configuration
Updated docker-compose.yml to mount the certificates and expose the secure port.

services:
  nginx:
    image: nginx:alpine
    container_name: day4-nginx
    ports:
      - "8080:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - backend

3. NGINX Configuration
Configured nginx.conf to handle SSL termination and force HTTPS redirection.

events {
    worker_connections 1024;
}

http {
    # HTTP Block - Redirects to HTTPS
    server {
        listen 80;
        server_name AnayKaApp.local localhost;
        return 301 https://$host$request_uri;
    }

    # HTTPS Block - Handles Secure Traffic
    server {
        listen 443 ssl;
        server_name AnayKaApp.local localhost;

        ssl_certificate /etc/nginx/certs/AnayKaApp.local+2.pem;
        ssl_certificate_key /etc/nginx/certs/AnayKaApp.local+2-key.pem;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://backend:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}

Verification
Browser Test
URL: https://AnayKaApp.local

Result: Connection verified with a valid "Lock Icon". The browser trusts the certificate issuer (mkcert).

API Security Test
Command:

curl -X POST [https://AnayKaApp.local/api/v1/login](https://AnayKaApp.local/api/v1/login) \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "secure123"}'

Result: Request succeeded over HTTPS. The payload was encrypted during transit, preventing interception.

Key Concepts Learned
SSL Termination: The process where NGINX decrypts incoming SSL traffic and passes unencrypted traffic to the backend within the private network.

Chain of Trust: How the browser validates the server's certificate against a trusted Root CA.

Reverse Proxy: Hiding the backend server from direct internet access.
```
