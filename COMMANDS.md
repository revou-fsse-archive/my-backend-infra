# Commands History

All in README.

## Install global dependencies

```sh
$ ni -g @nestjs/cli
$ ni -g prisma
$ ni -g prettier
$ ni -g eslint
```

## Create project

```sh
nest new the-app-name
```

## Create a Prisma service

```sh
# ni -g @nestjs/cli
nest generate module prisma
nest generate service prisma
```

## Setup Swagger

```sh
ni @nestjs/swagger swagger-ui-express
```

## Implement CRUD operations for Article model

### Generate REST resources

```sh
nest generate resource
# articles
```

Implement the resource in controller (endpoint) and service (database)

### Set up ValidationPipe globally

```sh
ni class-validator class-transformer
```

### Filter error exception

```sh
nest generate filter prisma-client-exception
```

## Implement CRUD operations for User model

### Generate User module resources

```sh
nest generate resource
# users
```

### Generate Auth module resources

```sh
nest generate resource
# auth
```

### Setup Passport

```sh
ni @nestjs/passport @nestjs/jwt passport passport-jwt
ni -D @types/passport-jwt
```

### Hashing passwords

```sh
ni bcrypt
ni -D @types/bcrypt
```
