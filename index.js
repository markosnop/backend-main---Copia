const express = require("express");
const app = express();

app.use(express.json())
let listaTarefas = [
  {
    id: 1,
    nome: "Estudar HTML",
  },
  {
    id: 2,
    nome: "Estudar CSS",
  },
  {
    id: 3,
    nome: "estudar React",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Seja bem vindo!</h1>");
});

app.get("/api/lista-tarefas", (request, response) => {
  response.json(listaTarefas);
});
const generateId = () => {
  const maxId = listaTarefas.length > 0
    ? Math.max(...listaTarefas.map((t) => t.id)) : 0;
  return maxId + 1
}
app.post("/api/lista-tarefas", (request, response) => {
  const tarefa = request.body
  if (!tarefa.nome)
    return response.status(400).json({
      error: "No content",
    });

  listaTarefas = listaTarefas.concat(tarefa);
});

app.get("/api/lista-tarefas/:id", (request, response) => {
  const id = Number(request.params.id);
  const tarefa = listaTarefas.find((tarefa) => tarefa.id === id);
  if (tarefa) {
    response.json(tarefa);
  } else {
    response.status(404).end()
  }
});

app.delete("/api/lista-tarefas/:id", (request, response) => {
  const id = Number(request.params.id);
  listaTarefas = listaTarefas.find((tarefas) => tarefas.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
