import { useState, useEffect, useRef } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import style from "./style.module.css";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  // Função para realizar o cadastro do usuário. Vamos utilizar o useRef
  /**
   * useRef = Vamos usar ele para pegar as informações de um elemento como referência, nesse caso vai ser o input(seus valores)
   */
  const inputName = useRef();
  const inputIdade = useRef();
  const inputEmail = useRef();
  async function createUsers(e) {
    e.preventDefault();
    await api.post("/usuarios", {
      nome: inputName.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value,
    });
    // Limpa os campos do formulário
    inputName.current.value = "";
    inputIdade.current.value = "";
    inputEmail.current.value = "";

    // Para chamar os usuários de forma automática e mostrar na tela
    getUsers();
  }
  // Essa função vai no backend pegar as informações
  async function getUsers() {
    try {
      const response = await api.get("/usuarios"); // Chama o backend
      setUsers(response.data); // Atualiza o estado com os dados retornados
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  // Carregar os usuários assim que a tela carregar
  useEffect(() => {
    getUsers();
  }, []);

  // Função para deletar usuários
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers();
  }

  return (
    <div className={style.container}>
      <form action="" className={style.containerForm}>
        <h1>Cadastro de Usuários</h1>
        <input
          name="nome"
          type="text"
          className={style.input}
          id="input-nome"
          placeholder="Nome usuário"
          ref={inputName}
        />
        <input
          name="idade"
          type="text"
          className={style.input}
          id="input-idade"
          placeholder="Idade usuário"
          ref={inputIdade}
        />
        <input
          name="email"
          type="email"
          className={style.input}
          id="input-email"
          placeholder="Email usuário"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers} className={style.button}>
          Cadastrar
        </button>
      </form>
      {/* Vamos usar o map para listar os usuários */}
      {users.map((user) => (
        <div key={user.id} className={style.containerListsUsers}>
          <div className={style.containerInfoUsers}>
            <p className={style.infoUser}>
              Nome: <span className={style.returnInfoUser}>{user.nome}</span>
            </p>
            <p className={style.infoUser}>
              Idade: <span className={style.returnInfoUser}>{user.idade}</span>
            </p>
            <p className={style.infoUser}>
              Email: <span className={style.returnInfoUser}>{user.email}</span>
            </p>
          </div>
          {/* Precisa ser enviado um paramentro */}
          <button className={style.buttonDeleteUser} onClick={() => deleteUsers(user.id)}>
            <FaRegTrashCan size={24} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
