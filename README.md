1. Fill up every `.env.example` file and rename to `.env`
2. In the `server` directory, run npx prisma generate
3. Run `npm i` in the folders for each service (e.g. `server/questions` and `server/users`)
4. In `server` folder, run `chmod +x copySchema.sh` then `./copySchema.sh` or `npm copy-schema`

For development,
run `npm run dev` to start the server in development phase

For production,
run `npm run build` to build .ts files into .js files