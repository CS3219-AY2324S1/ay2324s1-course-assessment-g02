1. Fill up every `.env.example` file and rename to `.env`

User Service

1. Navigate to the `server/users` directory
1. Run `npm i` to install all dependencies
1. Run npx prisma generate
1. Run `npm run dev` to launch the user service in development mode

Question Service

1. Navigate to the `server/questions` directory
1. Run `npm i` to install all dependencies
1. Run `npm run dev` to launch the question service in development mode

Client

1. Navigate to the `client` directory
1. Run `npm i` to install all dependencies
1. Run `npm start` to launch the client in development mode

For development,
run `npm run dev` to start the server in development phase

For production,
run `npm run build` to build .ts files into .js files
