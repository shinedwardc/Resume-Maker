import express from "express"; // We are using express beta to allow for async
import morgan from "morgan";
import { URL, fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";
import * as ss from "superstruct"; // validator
import { initializeApp } from "firebase-admin/app";
import { getAuth, DecodedIdToken } from "firebase-admin/auth";
import { User, UserModify } from "shared"; // schemas
import "dotenv/config"; // Loads environment variables from .env file

initializeApp();
const auth = getAuth();

const port = process.env.PORT ?? 3000;
const client = new MongoClient(process.env.MONGODB_URI as string, {
  serverApi: ServerApiVersion.v1,
});
const db = client.db("resume");
const users = db.collection("users");
const requests = db.collection("requests");
const app = express();

interface Context {
  token?: DecodedIdToken;
}
const contextMap: WeakMap<express.Request, Context> = new WeakMap();

const api = express();
api.use(
  express.json(), // parse json request body
  express.urlencoded({ extended: false }) // parse urlencoded request body
);
app.use(
  morgan("dev"), // log requests to the console
  express.static(
    fileURLToPath(new URL("../../frontend/dist/resume-maker", import.meta.url))
  ) // Serve static files from the frontend folder
);

app.use("/api/v1", api);
// if no api function matches then return index.html
app.use(function (req, res, _next) {
  return res.sendFile(
    fileURLToPath(
      new URL("../../frontend/dist/resume-maker/index.html", import.meta.url)
    )
  );
});
// Checks and gets the current authenticated user of the request
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const checkAuth: express.RequestHandler = async function checkAuth(
  req,
  res,
  next
) {
  if (req.headers.authorization === undefined) {
    return res.sendStatus(401);
  }
  const tokenMatch = req.headers.authorization.match(/Bearer (.+)/);
  if (tokenMatch === null) {
    return res.sendStatus(401);
  }
  let token;
  try {
    token = await auth.verifyIdToken(tokenMatch[1], true);
  } catch (err) {
    return res.sendStatus(401);
  }
  const context = getContext(req);
  context.token = token;
  next();
};

function getContext(req: express.Request): Context {
  let context = contextMap.get(req);
  if (context === undefined) {
    context = {};
    contextMap.set(req, context);
  }
  return context;
}

// Endpoint to create a new user
api.post("/user", checkAuth, async function (req, res) {
  const context = getContext(req);
  if (context.token === undefined) {
    return res.sendStatus(401);
  }
  const [err, body] = ss.validate(req.body, User);
  if (err !== undefined) {
    return res.status(400).json(err.failures());
  }
  try {
    const existingUser = await users.findOne({ userId: context.token.uid });
    if (existingUser !== null) {
      return res.status(409).json({ error: "User already exists" });
    }
  } catch (e) {
    console.dir(e);
    return res.status(500).json({ error: "Failed to query DB" });
  }
  // Everything above checks for an existing user
  if (req.body === undefined) {
    return res.sendStatus(400);
  }
  try {
    const user = {
      ...body,
      userId: context.token.uid,
    };
    await users.insertOne(user);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
});

const Message = ss.object({
  name: ss.string(),
  email: ss.string(),
  subject: ss.string(),
  message: ss.string(),
});

api.post("/send", checkAuth, async function (req, res) {
  const context = getContext(req);
  if (context.token === undefined) {
    return res.sendStatus(401);
  }
  console.log(req.body);
  const [err, body] = ss.validate(req.body, Message);
  if (err !== undefined) {
    return res.status(400).json(err.failures());
  }
  // Everything above checks for an existing user
  if (req.body === undefined) {
    return res.sendStatus(400);
  }
  try {
    const message = {
      ...body,
    };
    await requests.insertOne(message);
    return res.status(201).json(message);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Requests to get or modify a user
api
  .route("/user/:id")
  .all(checkAuth)
  .get(async function (req, res) {
    const context = getContext(req);
    if (context.token === undefined) {
      return res.sendStatus(401);
    }
    if (req.params.id !== context.token.uid) {
      return res.sendStatus(403);
    }
    const user = await users.findOne(
      { userId: req.params.id },
      { projection: { _id: 0 } }
    );
    if (user === null) {
      return res.sendStatus(404);
    }
    res.json(user);
  })
  .put(async function (req, res) {
    const context = getContext(req);
    if (context.token === undefined) {
      return res.sendStatus(401);
    }
    if (req.params.id !== context.token.uid) {
      return res.sendStatus(403);
    }
    const [err, body] = ss.validate(req.body, UserModify, { coerce: true });
    if (err !== undefined) {
      return res.status(400).json(err.failures());
    }
    // Patch a user
    // Takes an object of keys and values to update
    // If value is empty it is removed
    const update: {
      $set: Record<string, unknown>;
      $unset: Record<string, unknown>;
    } = { $set: {}, $unset: {} };
    for (const entries of Object.entries(body)) {
      if (
        entries[1] === "" ||
        entries[1] === undefined ||
        entries[1].length === 0
      ) {
        update.$unset[entries[0]] = undefined;
      } else {
        update.$set[entries[0]] = entries[1];
      }
    }

    try {
      const updateResult = await users.findOneAndUpdate(
        { userId: req.params.id },
        update,
        { projection: { _id: 0 } }
      );
      res.status(200).json(Object.assign(updateResult.value, update.$set));
    } catch (e) {
      return res.status(500).json(e);
    }
  });

api.use(function (_req, res, _next) {
  return res.sendStatus(404);
});
// if no api routes matched do 404

// The app should only launch after the DB is connected
client
  .connect()
  .then(() =>
    app.listen(3000, () => {
      console.log(`Listening on http://localhost:${port}/`);
    })
  )
  .catch(console.dir);
