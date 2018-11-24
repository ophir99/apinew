const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tweet = require("./post.model");
mongoose
  .connect(
    "mongodb+srv://adminnew:adminnew@cluster0-9dxpj.mongodb.net/test?retryWrites=true"
  )
  .catch(err => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.post("/tweet", async (req, res) => {
  const tweet_ = new tweet({
    title: req.body.title,
    description: req.body.description,
    hashtags: req.body.hashtags
  });

  try {
    await tweet_
      .save()
      .then(result => {
        res.send({ response: result });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ response: err });
  }
});

app.get("/tweet", async (req, res) => {
  try {
    await tweet
      .find()
      .then(data => {
        res.send({ response: data });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ response: err });
  }
});
app.delete("/tweet/:id", async (req, res) => {
  try {
    await tweet
      .deleteOne({ _id: req.params.id })
      .then(data => {
        res.send({ response: data });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ response: err });
  }
});

app.get("/tweet/:id", async (req, res) => {
  console.log(req.params);

  try {
    await tweet
      .find({ _id: req.params.id })
      .then(data => {
        res.send({ response: data });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ err: err });
  }
});

app.put("/tweet/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await tweet
      .update(
        { _id: id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            hashtags: req.body.hashtags
          }
        }
      )
      .then(data => {
        res.send({ response: data });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ error: err });
  }
});

app.listen("3000");
