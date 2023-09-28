import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useEstudiosContext } from "../contexts/estudiosContext";
import { useJogosContext } from "../contexts/jogosContext";
import { api } from "../service/api";
import { CATEGORIAS } from "../constants";

export default function EstudioEJogos() {
  const navigate = useNavigate();
  const { estudios, setEstudios, idDoEstudioClicado, setIdDoEstudioClicado } =
    useEstudiosContext();
  const {
    jogos,
    setJogos,
    // idDoJogoClicado, setIdDoJogoClicado
  } = useJogosContext();
  // const [idDoJogoClicado, setIdDoJogoClicado] = useState(undefined);

  useEffect(() => {
    api.get("/Jogos").then((response) => setJogos(response.data));

    return () => setJogos([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteEstudio = async (e, estudioId) => {
    e.preventDefault();

    try {
      await api.delete(`/Estudios/${estudioId}`);

      setEstudios(estudios.filter((estudio) => estudio.id !== estudioId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEstudio = async (e, estudioToEdit) => {
    e.preventDefault();
    console.log({ estudioToEdit });

    navigate(`/estudio/${estudioToEdit.id}`);
    setIdDoEstudioClicado(undefined);
  };

  const handleDeleteJogo = async (e, jogoId) => {
    e.preventDefault();

    try {
      await api.delete(`/Jogos/${jogoId}`);

      setJogos(jogos.filter((jogo) => jogo.id !== jogoId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditJogo = async (e, jogoToEdit) => {
    e.preventDefault();
    console.log({ jogoToEdit });

    navigate(`/jogo/${jogoToEdit.id}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <button onClick={() => navigate("/estudio")}>Adicionar estúdio</button>
        <button onClick={() => navigate("/jogo")}>Adicionar jogo</button>
      </div>

      <h2>Estúdios e jogos</h2>

      {estudios.map((estudio, index) => (
        <React.Fragment key={`${estudio.id}-${index}`}>
          <h3>
            {estudio.nome}
            <button
              onClick={() => {
                if (idDoEstudioClicado === estudio.id) {
                  setIdDoEstudioClicado("");
                } else {
                  setIdDoEstudioClicado(estudio.id);
                }
              }}
            >
              {idDoEstudioClicado === estudio.id ? "Fechar" : "Ver jogos"}
            </button>
            <button onClick={(e) => handleEditEstudio(e, estudio)}>
              Editar
            </button>
            <button onClick={(e) => handleDeleteEstudio(e, estudio.id)}>
              Excluir
            </button>
          </h3>

          {idDoEstudioClicado === estudio.id && (
            <table>
              <thead>
                <tr>
                  <th>Jogo</th>
                  <th>Data de lançamento</th>
                  <th>Categoria</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {jogos
                  .filter((jogo) => jogo.estudioId === estudio.id)
                  .map((jogo, index) => (
                    <tr key={`${jogo.id}-${index}`} className="jogo">
                      <td>{jogo.nome}</td>
                      <td>
                        {jogo.dataLancamento
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                      </td>
                      <td>
                        {
                          CATEGORIAS.find(
                            (categoria) => categoria.id === jogo.categoria
                          ).nome
                        }
                      </td>
                      <td onClick={(e) => handleEditJogo(e, jogo)}>Editar</td>
                      <td onClick={(e) => handleDeleteJogo(e, jogo.id)}>
                        Excluir
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
