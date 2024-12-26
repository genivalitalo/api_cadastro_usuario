import express from "express"; //Importação da biblioteca
import { PrismaClient } from "@prisma/client";
import cors from 'cors';
const prisma = new PrismaClient();

// Agora vamos começar a usar, mas primeiro devemos adicional em uma variável para pode utilizar todas as funções do express
const app = express();
app.use(express.json()); //Agora conseguimos utilizar dados no formato Json
// Caso der o erro de Cors que é quando o back não deixa algumas url acessa-lo, vamos fazer o seguinte
app.use(cors())
// Cadastro de usuário
// Veja que estou utilizando função assicrona justamente para o JS tratar melhor as req e res
app.post("/usuarios", async (req, res) => {
  // await vai esperar os dados
  await prisma.users.create({
    data: {
      nome: req.body.nome, 
      email: req.body.email,
      idade: req.body.idade,
    },
  });

  res.status(201).json(req.body);
});
// Aqui estou acessando a rota usuários, que vai listar os usuários
app.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users); // Retorna os usuários
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});
// Para adicionar uma variavel dentro da rota basta adicionar o (:nome)
app.put("/usuarios/:id", async (req, res) => {
  await prisma.users.update({
    // Where -> Onde vai ser atualizado
    where: {
      id: req.params.id,
    },
    data: {
      nome: req.body.nome,
      email: req.body.email,
      idade: req.body.idade,
    },
  });

  res.status(201).json(req.body);
});
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.users.delete({
    // Where -> Onde vai ser deletado
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuário deletado com sucesso" });
});

app.listen(3000);

// Route Params, fazer operações específicas
/*
    Criar Nossa API de usuário

    - Criar usuário
    - Listar usuários
    - Editar um usuário
    - Deletar um usuário
*/
// Métodos HTTP
/**
 *  GET -> Listar
 *  POST -> Criar
 *  PUT -> Editar vários
 *  PATCH -> Editar um
 *  DELETE -> Deletar
 *
 *
 * OBS... Quando for criar uma rota eu preciso falar oq ela vai fazer, com isso usamos o métodos HTTP
 */
// HTTP Status
/**
 * 2xx -> Sucesso
 * 4xx -> Erro Cliente -> Front-end
 * 5xx -> Erro Servidor
 *
 */
// As  rotas precisam de duas coisas:
/**
 *  1) Tipo de rota / Método
 *  2) Endereço
 */

// Login Banco

/**
 * User: users
 * senha: 1234
 *
 */
