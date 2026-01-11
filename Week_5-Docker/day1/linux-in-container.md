anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker build -t day1-app .
[+] Building 4.4s (10/10) FINISHED docker:default
=> [internal] load build definition from Dockerfile 0.0s
=> => transferring dockerfile: 175B 0.0s
=> [internal] load metadata for docker.io/library/node:20-alpine 3.6s
=> [internal] load .dockerignore 0.0s
=> => transferring context: 2B 0.0s
=> [1/5] FROM docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c 0.0s
=> => resolve docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c 0.0s
=> [internal] load build context 0.0s
=> => transferring context: 39.04kB 0.0s
=> CACHED [2/5] WORKDIR /app 0.0s
=> CACHED [3/5] COPY package\*.json ./ 0.0s
=> CACHED [4/5] RUN npm ci --only=production 0.0s
=> CACHED [5/5] COPY . . 0.0s
=> exporting to image 0.6s
=> => exporting layers 0.0s
=> => exporting manifest sha256:0a1286f8273e60e86776fac3b7cb323fca3e54bf 0.0s
=> => exporting config sha256:a0e133c1b375508e542aa0edf5abdd71580367b0c1 0.0s
=> => exporting attestation manifest sha256:a18cb26c76afcc0f1c6bb809e304 0.0s
=> => exporting manifest list sha256:18d6f00dc59ab436b0a9cf5ffed26cf2e0a 0.0s
=> => naming to docker.io/library/day1-app:latest 0.0s
=> => unpacking to docker.io/library/day1-app:latest 0.5s
anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker images
i Info → U In Use
IMAGE ID DISK USAGE CONTENT SIZE EXTRA
day1-app:latest 18d6f00dc59a 204MB 49.9MB  
anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker run -d --name day1-container -p 3000:3000 day1-app
6be730956b0956baf071fb282294a63dc47b4d6490ff2bfab2f1102d03a07918
anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
6be730956b09 day1-app "docker-entrypoint.s…" 5 minutes ago Up 5 minutes 0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp day1-container

anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ curl http://localhost:3000
{"message":"Hello from Docker Container!","timestamp":"2026-01-09T08:04:14.572Z"}anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker exec -it day1-container /bin/sh
/app # whoami
root
/app # ps aux | head -3
PID USER TIME COMMAND
1 root 0:00 node index.js
18 root 0:00 /bin/sh
/app # pwd
/app
/app # ls -la
total 56
drwxr-xr-x 1 root root 4096 Jan 9 07:38 .
drwxr-xr-x 1 root root 4096 Jan 9 07:58 ..
-rw-rw-r-- 1 root root 136 Jan 9 07:38 Dockerfile
-rw-rw-r-- 1 root root 379 Jan 9 07:35 index.js
drwxrwxr-x 1 root root 4096 Jan 9 07:13 node_modules
-rw-rw-r-- 1 root root 28919 Jan 9 07:13 package-lock.json
-rw-rw-r-- 1 root root 287 Jan 9 07:24 package.json
/app # df -h | head -2
Filesystem Size Used Available Use% Mounted on
overlay 232.6G 32.0G 188.7G 14% /
/app # exit
anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker logs day1-container
Server running on http://0.0.0.0:3000
naygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker rm day1-container
day1-container
anaygupta@HESTABIT:~/Desktop/LaunchPad/Week-5-Docker/day1$ docker rmi day1-app:latest
Untagged: day1-app:latest
Deleted: sha256:18d6f00dc59ab436b0a9cf5ffed26cf2e0a6f81ec7b8ef8205b169a71b0ab331
