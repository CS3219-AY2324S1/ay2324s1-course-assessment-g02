# PeerPrep: Candy Crush that Interview!

## Cloud deployment

Go to this link to try out PeerPrep! http://peer-prep-alb-540971804.ap-southeast-1.elb.amazonaws.com/

## Local (Docker)

1. Clone the repository
2. Run the following command in the root directory of the project, define your own ports in env if you want to

```
$ cp .env.example .env
```

3. Fill in secrets in the `.env` file
4. Repeat steps 2-3 for the following folders `/backend/questions`, `/backend/users`, `matching-service`, `interview-service`, `supabase-service`, `frontend`
5. Ensure that the ports in `/backend/questions`, `/backend/users`, `matching-service`, `interview-service`, `supabase-service`, `frontend` are matched with the ports in `.env`
6. Launch Docker Desktop (or any other Containerization tool compatible with Docker)
7. Run the following command in the root directory of the project

```
docker-compose up -d
```

8. The frontend for the application should be running on `localhost:5173` (default port)

9. To stop the application, run the following command in the root directory of the project

```
docker-compose down
```

10. To remove the containers, images and volumes, run the following command in the root directory of the project

```
docker-compose down --rmi all --volumes
```
