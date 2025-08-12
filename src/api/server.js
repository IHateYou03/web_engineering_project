import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./users.json";

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// SIGNUP
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(DB_FILE));

  // Email ellenőrzés
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  users.push({ name, email, password });
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered successfully" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(DB_FILE));

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ message: "Login successful", user });
});

app.listen(3500, () => {
  console.log("Server running on http://localhost:3500");
});
