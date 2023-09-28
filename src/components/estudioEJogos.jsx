import React from "react";
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
                      <td>{jogo.dataLancamento}</td>
                      <td>
                        {CATEGORIAS.find(
                          (categoria) => categoria.id === jogo.categoria
                        ).nome}
                      </td>
                      <td onClick={(e) => handleEditJogo(e, jogo)}>Editar</td>
                      <td onClick={(e) => handleDeleteJogo(e, jogo)}>
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
