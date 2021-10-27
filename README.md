# Serverless - lambda-graphql-typescript

## This is a boilerplate which can be used to basically have a graphql service which is served through a single AWS lambda function and uses Prisma ORM to communicate with the postgress database

## Prisma ##

### Prisma generates a client which is used to basically communicate with the database through specific models. Inside the schema.prisma we define the provider which is the database provider basically in our case (postgress) and there we can create the models and their relationships. ##

### After we run the below command we generate the client based on the models we currently have ##

```
npm run prisma-generate
```

### If we want to create these tables with their relationships we can use the command

```
npm run prisma-migrate-dev
```

### Format the schema.prisma file when changes are made ##

```
npm run prisma-format
```

### Start the serverless offline locally ##

```
npm run start-dev
```

### We can use an actual postgres database we just need to specify the connection string (url) or we can use the local one in our case postgres . U can install postgres here https://www.postgresql.org/download/ and see how to setup locally on MACOS https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb ###
