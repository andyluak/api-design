# api-design

## 1.Creating a basic http server

A basic HTTP server can be created with the HTTP package. Inside raw-server, we can create a basic HTTP server with the following code:

```
const http = require("http");

const server = http.createServer((req, res) => {
	if (req.method === "GET" && req.url === "/") {
		res.statusCode = 200;
		res.end();
	}
});

server.listen(3001, () => {
	console.log("Server is running on port http://localhost:3001");
});
```

## 2.API Anatomy

### Server

-   Each API is a server. It has no visual representation and is always running.
-   Usually connected to a network.
-   Usually sit in front of a DB.
-   They operate on a PORT.
-   They have a unique IP adress.

### Route

-   A route is a combination of an HTTP method and a URL path.
-   There are 7 HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.
-   `GET` is used to retrieve data from a server.
-   `POST` is used to send data to a server.
-   `PUT` is used to update data on a server.
-   `DELETE` is used to delete data from a server.
-   `PATCH` is used to update data on a server without replacing the whole object.
-   `HEAD` is used to retrieve the headers of a request.
-   `OPTIONS` is used to retrieve the supported HTTP methods of a server.

Route examples

-   GET `/users` - get all users
-   GET `/users/1` - get user with id 1
-   POST `/users` - create a new user
-   PUT `/users/1` - update user with id 1

#### Handling routes

-   A handle is a function that is called when a route is matched.
-   Depending on the API design and intent of the request, the server may respond with different status codes.

## 3.Express server

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

```
// server.js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
	console.log("Hello from express");
	res.status(200);
	res.json({ message: "Hello" });
});

module.exports = app;

// index.js
const app = require("./server");

app.listen(3001, () => {
	console.log("hello on http://localhost:3001");
});

```

We are going to install ts-node to run our server in typescript and nodemon to restart the server when we make changes.

To setup nodemon we need to create a nodemon.json file in the root of our project and add the following code:

```
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/index.ts"
}
```

And in package.json we need to add the following scripts:

```
"scripts": {
    "watch": "nodemon"
  },
```

We can only call nodemon because there is the configuration in nodemon.json file.

## 4.ORM - Object Relational Mapping ( Prisma )

An ORM is an SDK for a database. It allows us to interact with a database using an object-oriented paradigm. Provides an interface for the database.

The ORM used in this project is [Prisma](https://www.prisma.io/).

-   Primsa is DB agnostic, meaning it can be used with any database.
-   Type safety
-   Handles schema, migrations and seeding

### Installing Prisma

```
npm i typescript ts-node @types/node prisma --save-dev
npx prisma init
```

Creating a global prisma client in a file so we don't have to instantiate it every time

```
// prisma-client.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

Running prisma studio

`npx prisma studio`

## App structure

Recreating the Chronos Changelog App

### Tables

-   User holds the user
-   Product holds the product. A user can have multiple products
-   Update holds the update. A product can have multiple updates
-   UpdatePoint holds the update point. An update can have multiple update points

The tables are connected with foreign keys. The User has a one to many relationship with Product. The Product has a one to many relationship with Update. The Update has a one to many relationship with UpdatePoint.

### Models

As an example how the model looks :

```
model User {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())

  username String @unique
  password String

  products Product[]
}

model Product {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())

  name String @db.VarChar(255)

  belongsToId String
  belongsTo   User   @relation(fields: [belongsToId], references: [id])

  updates Update[]
}
```

### Migrations

Migrations are used to update the database schema. They are used to create, update and delete tables and columns.

`npx prisma migrate dev --name init`

After running a migration, you are good to go and can start using the database. A migration is useful for history tracking. It is possible to rollback to a previous migration.

## 5. Router and routes

The router is used to handle the routes. It is a middleware that handles the routes. It is used to handle the requests and responses.

_See more in router.ts._

Firstly we will set up the actual routes and then we will setup the handlers.

Product route example:

```
router.get("/product", () => {});
router.get("/product/:id", () => {});
router.post("/product", () => {});
router.put("/product/:id", () => {});
router.patch("/product/:id", () => {});
router.delete("/product/:id", () => {});
```

## 6. Middleware

Middleware is a function that is executed before the handler. It is used to handle the request and response. It can be used to validate the request, check if the user is authenticated, etc.

If the middleware is executed, it will call the next function. If the middleware is not executed, it will not call the next function and will return a response usually with a status code.

Example middleware :

```
app.get("/todo/:id", myMiddleware, my2ndMiddleware, handler);
```

_See more in middleware.ts._

1. Morgan - HTTP request logger middleware for node.js `app.use(morgan('dev'));`

2. express.json() - parses incoming requests with JSON payloads - basically allows users to send JSON data to the server

3. express.urlencoded() - parses incoming requests with urlencoded payloads - basically allows users to send form data to the server

4. CORS - Cross-Origin Resource Sharing - allows us to make requests from our frontend to our backend.

5. JWT - JSON Web Token - allows us to authenticate users.

To set this up, we will need to install the following packages:

```
npm i jsonwebtoken bcrypt dotenv
```

Then we need a function that will accept something unique to the user. We choose to select the id and the username. We will use the username to make sure that the user is the same as the one that is logged in.

```
export const createJWT = ({ id, username }) => {
	return jwt.sign({ id: id, username: username }, process.env.SECRET);
};
```

Then we will setup the middleware and check in the header for the authorization token. If the token is valid, we will set the user in the request and call the next function. If the token is not valid, we will return a 401 status code.

## 7. Handlers

The first handler we are setting up is the user handler. It will handle the user routes. It will handle the login, register, etc. The register is going to get the body from the req, hash the password, create the user and return the token. If the application would have a frontend, we would store the token in a cookie and use it for later.

The sign in does pretty much the same thing, but it will check if the user exists and if the password is correct. If the password is correct, it will return the token.

```
export const signIn = async (req, res) => {
	const { username, password } = req.body;

	const user = await prisma.user.findUnique({ where: { username } });
	if (!user) {
		res.status(401);
		return res.send("Invalid username or password");
	}
	const isValid = await comparePasswords(password, user.password);

	if (!isValid) {
		res.status(401);
		return res.send("Invalid username or password");
	}

	const token = createJWT(user);
	res.json({ token });
};

```

### Validation

We will use a package called Express Validator
` npm i express-validator --save`

We will use the following functions:

-   check - checks the value of a field
-   validationResult - returns the result of the validation

```
export const validateRegister = [
  check("username").notEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("email").isEmail().withMessage("Email is not valid"),
];
```

We use the `body` import to check whether the body has the right fields. If the body does not have the right fields, we will return a 400 status code and the errors.

```
router.put("/product/:id", body("name"), (req,res) => {
  const errors = validationResult(req)
});
```


