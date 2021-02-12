import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1154782",
  key: "ad9ab5efd2f69258edda",
  secret: "bbc974e1c6fc192d701b",
  cluster: "us3",
  useTLS: true,
});


// middleware
app.use(express.json());

//DB config. This is a test. Leaving password visible for now. 
const connection_url =
  "mongodb+srv://admin:p1dT23E4o5xG437S3d8Qe989o8HgR32Zx1OpI@cluster0.ea2ae.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// api routes
app.get('/', (req,res)=> res.status(200).send('hello world'));

//gets data
app.get("/messages/sync", (req, res) => {

  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});



app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });

});

app.listen(port, () => console.log(`Listening on localhost:${port}`));