import express from "express";
/* lista de ususarios
   cada item é um objeto
   o objeto possui as seguintes propriedades
    - nome
    - identificador (unico para cada usuario)
    - email
    - senha
*/
const usuarios = [
  {
    nome: "Teste 1",
    identificador: 0,
    email: "teste1@teste.com",
    senha: "teste1",
  },
  {
    nome: "Teste 2",
    identificador: 1,
    email: "teste2@teste.com",
    senha: "teste2",
  },
];
let contador = 2;
const app = express();

app.use(express.json());

app.get("/teste", function (requisicao, resposta) {
  console.log(requisicao.body);
  resposta.send("Olá mundo");
});

app.post("/login", function (requisicao, resposta) {
  const email = requisicao.body.email;
  const senha = requisicao.body.senha;
  //usando for of
  // let existeUsuario = false;
  // for (const usuario of usuarios) {
  //   if (usuario.email === email && usuario.senha === senha) {
  //     existeUsuario = true;
  //   }
  // }

  // usando o some
  // const existeUsuario = usuarios.some(function (usuario) {
  //   if(usuario.email === email && usuario.senha === senha) {
  //     return true;
  //   }
  // });

  // usando o find
  const usuario = usuarios.find(function (usuario) {
    if (usuario.email === email && usuario.senha === senha) {
      return true;
    }
  });

  if (usuario) {
    resposta.status(200);
    resposta.json(usuario);
  } else {
    resposta.status(400);
    resposta.send("usuário inválido");
  }

  // usando o filter
  // const usuariosEncontrados = usuarios.filter(function (usuario) {
  //   if (usuario.email === email && usuario.senha === senha) {
  //     return true;
  //   }
  // });

  // if (usuariosEncontrados.length > 0) {
  //   resposta.status(200);
  //   resposta.send("usuario existe");
  // } else {
  //   resposta.status(400);
  //   resposta.send("usuário inválido");
  // }
});

app.post("/cadastro-de-usuario", function (requisicao, resposta) {
  if (
    requisicao.body.nome === undefined ||
    requisicao.body.email === undefined ||
    requisicao.body.senha === undefined
  ) {
    resposta.status(400);
    resposta.send("Você deve enviar nome, email e senha");
    return;
  }
  const novoUsuario = {
    nome: requisicao.body.nome,
    email: requisicao.body.email,
    senha: requisicao.body.senha,
    identificador: contador,
  };

  let possuiMesmoEmail = false;
  for (const usuario of usuarios) {
    if (usuario.email === novoUsuario.email) {
      possuiMesmoEmail = true;
    }
  }

  if (possuiMesmoEmail) {
    resposta.status(400);
    resposta.send("Já existe um usário cadastrado com esse email");
  } else {
    resposta.send("Usuário cadastrado com sucesso");
    usuarios.push(novoUsuario);
  }

  console.log("possui mesmo", possuiMesmoEmail);
  console.log(usuarios);
  // AQUI DENTRO VAI A REGRA PARA CADASTRAR USUÁRIOS
  contador++;
});

app.get("/recados", function (req, res) {
  if (valido) {
    for (const usuario of usuarios) {
      if (usuario.email == usuarioLogado.email) {
        usuarioLogado = usuario;
        if (usuarioLogado.recados.length == 0) {
          res.status(400).send("Usuário ainda não tem registro de recados");
        } else {
          res.status(200).send(usuario.recados);
        }
      }
    }
  } else {
    res.status(400);
    res.send("É necessário fazer o login para exibir os recados");
  }
});
app.post("/recados/criar", function (req, res) {
  if (valido) {
    if (req.body.titulo == "" || req.body.descricao == "") {
      res.status(400).send("Preencha os campos corretamente");
    } else {
      const recado = {
        id: contadorRecados,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
      };

      for (const usuario of usuarios) {
        if (usuario.email == usuarioLogado.email) {
          usuario.recados.push(recado);
          res.status(200).send("Recados registrado");
          contadorRecados++;
        }
      }
    }
  } else {
    res.status(400).send("É necessário fazer um login para criar recados");
  }
});

app.listen(3000, function () {
  console.log("Aplicação está rodando na porta 3000: http://localhost:3000");
  console.log("ip local: http://:3000");
});
