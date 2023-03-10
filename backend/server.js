const express = require("express");
const connectDB = require("./db/connectDB");
const app = express();
const Eq = require("./modals/equipments");
const cors = require("cors");

const MONGO_URI =
  "mongodb+srv://rajat4984:rajat4984@nodeexpressproject.zv05z.mongodb.net/Gym?retryWrites=true&w=majority";
const port = 5000;

app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

// -------------------ALL-EQ------------------
app.get("/allEq", async (req, res) => {
  const eq = await Eq.find({});
  res.status(200).send({ eq });
});

// -------------SINGLE-GET-REQUEST-----------------
app.get("/getSingleEq/:id", async (req, res) => {
  const id = req.params.id;
  const eq = await Eq.findOne({ _id: id });

  if (!eq) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(200).json(eq);
});

// ----------------------POST-REQUEST------------

app.post("/newEq", async (req, res) => {
  const eq = await Eq.create(req.body);
  res.status(204).send({ eq });
});

// ---------------DELETE-REQUEST------------------

app.delete("/deleteEq/:id", async (req, res) => {
  const id = req.params.id;
  const eq = await Eq.findByIdAndRemove({ _id: id });
  if (!eq) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(200).send({ eq });
});

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
