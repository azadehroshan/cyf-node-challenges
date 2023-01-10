// const { response } = require("express");
const express = require("express");
const app = express();
 
const chat = require("./chat.json");

app.get("/messages", (req, res)=>{
  res.send(chat)}
);
  
app.get("/messages/:id", (req, res) => { 
  const final = chat.filter((x) => x.id == req.params.id);
  res.send(final);
});


const port = process.env.PORT || 3030;

const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
