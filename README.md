<p align="center">
  <a href="http://nestjs.com" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="NestJS Logo" /></a>
</p>

<p align="center">NestJS is a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>

# My Backend Infra

Simple REST API made with [NestJS](https://github.com/nestjs/nest) and Containerized with Docker.

- Live: <https://my-backend-infra.mhaidarhanif.com>
- Image: <https://hub.docker.com/r/mhaidarh/my-backend-infra>
- Repo: <https://github.com/revou-fsse/my-backend-infra>

## API Documentation

Base API URLs:

- <http://localhost:4000/api>
- <https://my-backend-infra.mhaidarhanif.com/api>

Endpoints:

| HTTP     | Endpoint     | Description |
|:-------- |:------------ |:----------- |
| `GET`     | `/`              | Show welcome |
| `POST`    | `/auth/register` | Register new user |
| `POST`    | `/auth/login`    | Login to user |
| `GET`     | `/articles`      | Get all articles |
| `GET`     | `/articles/drafts` | Get all draft articles |
| `GET`     | `/articles/:id`  | Get one article by id |
| `POST`    | `/articles`      | Create new article |
| `PUT`     | `/articles/:id`  | Update one article by id |
| `PATCH`   | `/articles/:id`  | Update one article by id |
| `DELETE`  | `/articles`      | Delete all articles |
| `DELETE`  | `/articles/:id`  | Delete one article by id |

## Architecture Diagram

![diagram](assets/architecture-diagram.png)

## Prepare Database

Make sure the database is ready before doing any dependency installation.

Edit `.env` file for the app:

```sh
DATABASE_URL="postgres://myuser:mypassword@localhost:5432/db"
JWT_SECRET="abdefghijklmnopqrstuvwxyzabcdefghi"
```

- `DATABASE_URL`, can be retreived from your choice:
  - Local database instance
  - Local database container, explained below to run it
- `JWT_SECRET`, recommended to generate with `scripts/random.sh`

Run Docker on your machine and run Docker Compose that specifically only run the database instance in the background:

```sh
$ docker compose -f docker-compose.dev.yaml up -d
```

## Install Dependencies

Install local dependencies:

```sh
$ pnpm i
```

Install global dependencies:

```sh
$ pnpm i -g @nestjs/cli
$ pnpm i -g prettier
$ pnpm i -g eslint
```

Check available scripts/commands:

```sh
$ pnpm run
```

## Run for Development

Push schema to the database or generate Prisma schema while in development:

```sh
$ pnpm prisma:push      # prisma db push
$ pnpm prisma:generate  # prisma generate
```

Run the NestJS server:

```sh
# with watch
$ pnpm dev

# without watch
$ pnpm start
```

Then open <http://localhost:4000> on your browser.

## API Documentation with Swagger

After running the server on local, open <http://localhost:4000/docs> on your browser. Or if already deployed, check the `/docs` route.

## Database Operation on Development

Check the Prisma commands accordingly:

```sh
$ pnpm prisma:format
$ pnpm prisma:validate
$ pnpm prisma:generate
$ pnpm prisma:push
$ pnpm prisma:studio
$ pnpm prisma:seed
```

## Build for Production

```sh
$ pnpm build
$ pnpm start:prod
```

## Build for Production with Container

Build the app image only:

```sh
$ docker compose build
```

Run Docker Compose for both app container and database container:

```
$ docker compose up
$ curl -i localhost:4000/api
```

To stop compose that was run without `-d`:

```sh
$ docker compose down
```

## Push the Image to Docker Hub

Login, tag, and push the image:

```
$ docker login
$ docker tag my-backend-extra mhaidarh/my-backend-extra
$ docker push mhaidarh/my-backend-extra
```

## Pull and Run the Container from Docker Hub

Check if it can be pulled and run:

```sh
$ docker pull mhaidarh/my-backend-extra
$ docker run -p 4000:4000 -d --name my-backend-extra-container mhaidarh/my-backend-extra
```

## Check Docker image size

```sh
docker inspect -f "{{ .Size }}" mhaidarh/my-backend-extra | numfmt --to=si
```

## Deployment on Railway

1. Create a new project
2. Create a PostgreSQL instance
3. Connect GitHub repo to Railway project, add the environment variables
   - `DATABASE_URL`, get automatically from Railway `${{Postgres.DATABASE_URL}}`
   - `JWT_SECRET`, recommended to generate with `scripts/random.sh`

## Test for Assurance

```sh
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## License

[MIT](LICENSE).

## References

- [NestJS + Redis + Postgres Local Development With Docker Compose](https://tomray.dev/nestjs-docker-compose-postgres)
- [AlexSKuznetsov/prisma-express](https://github.com/AlexSKuznetsov/prisma-express)
