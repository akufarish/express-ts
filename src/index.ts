import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.json("Hello World!");
});

app.get("/user", async (req: Request, res: Response) => {
  const data = await prisma.user.findMany();

  res.json(data);
});

app.post("/user", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  res.json(result);
});

app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(data);
});

app.put("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const post = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      username: username,
      password: password,
    },
  });

  res.json(post);
});

app.delete("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await prisma.user.delete({
    where: { id: Number(id) },
  });

  res.json(post);
});

app.listen(8000, () => {
  console.log("App online running on localhost:8000");
});
