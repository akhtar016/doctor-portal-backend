const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();



const uri = process.env.DB_PATH;

//const users = ["Nayem", "Khan", "Akhtar", "Akhtaruzzaman"];

const app = express();

app.use(cors());
app.use(bodyParser.json());


let client = new MongoClient(uri, { useNewUrlParser: true });

app.get("/patientInfo", (req, res) => {

    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect((err) => {

        const collection = client.db("doctorPortals").collection("patients");

        // perform actions on the collection object
        collection.find().toArray((err, documents) => {
          if (err) {
            console.log(err);
          } else {
            res.send(documents);
          }
        });
    
        client.close();
      });
    
  });

  app.get("/", (req, res) => {
    res.send("Take Love From Nayem");
  });

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const name = users[id];
  res.send({ id, name });

  console.log(req.params);
});

//post

app.post("/addPatients", (req, res) => {
  
  const user = req.body;

  client = new MongoClient(uri, {useNewUrlParser:true});

  client.connect((err) => {
    const collection = client.db("doctorPortals").collection("patients");
    // perform actions on the collection object
    collection.insertOne(user, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({message:err})
      } else {
        res.send(result.ops[0]);
      }

      console.log("Successfully Inserted", result);
    });

    client.close();
  });
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log("Listening to port 4200"));
