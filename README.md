# PeerPrep: Candy Crush that Interview!

## Cloud deployment

Go to this link to try out PeerPrep! http://peer-prep-alb-540971804.ap-southeast-1.elb.amazonaws.com/

## Local (Docker)

1. Clone the repository
2. Run the following command in the root directory of the project, define your own ports in env if you want to

```
$ cp .env.example .env
```

3. Ensure that the ports in `/backend/questions`, `/backend/users`, `matching-service`, `frontend` are matched with the ports in `.env`
4. Launch Docker Desktop (or any other Containerization tool compatible with Docker)
5. Run the following command in the root directory of the project

```
docker-compose up -d
```

5. The frontend for the application should be running on `localhost:5173` (default port), with redis running on `localhost:6379` (default port), matching-service on `localhost:3005` (default port), questions-service on `localhost:3000` (default port), and users-service on `localhost:3001` (default port)

6. To stop the application, run the following command in the root directory of the project

```
docker-compose down
```

8. To remove the containers, images and volumes, run the following command in the root directory of the project

```
docker-compose down --rmi all --volumes
```
