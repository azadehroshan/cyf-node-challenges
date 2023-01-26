const express = require("express");
const app = express();

let people = [
  {
    name: "staff",
    members: ["talea@techtonica.org", "michelle@techtonica.org"],
  },
  {
    name: "students",
    members: ["chris@techtonica.org", "hamid@techtonica.org"],
  },
];

app.listen(5000, () => {
  console.log("listening on port 5000");
});

app.use(express.json());

app.get("/lists", (req, res) => {
  res.send(people);
});
app
  .get("/lists/:name", (req, res) => {
    const reqName = req.params.name;
    const person = people.find((person) => person.name === reqName);

    if (person) {
      res.send(person);
    } else res.status(404).send("not availble");
  })
  .delete("/lists/:name", (req, res) => {
    const reqName = req.params.name;
    const person = people.some((person) => person.name === reqName);

    if (person) {
      people = people.filter((person) => person.name !== reqName);
      res.send("deleted");
    } else res.status(404).send("not availble for delete");
  })
  .put("/lists/:name", (req, res) => {
    const reqName = req.params.name;
    const person = people.find((person) => person.name === reqName);

    if (person) {
      people.map((person) => (person.name === reqName ? (person.members = req.body.members) : person));
      res.send(people);
    } else {
      people.push({ name: reqName, ...req.body });
      res.send(people);
    }
  });

app.get("/lists/:name/members", (req, res) => {
  const reqName = req.params.name;
  const person = people.find((person) => person.name === reqName);

  if (person) {
    res.send(person.members);
  } else res.status(404).send("not availble");
});
