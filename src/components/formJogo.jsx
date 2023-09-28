import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { useEstudiosContext } from "../contexts/estudiosContext";
import { api } from "../service/api";
import { CATEGORIAS } from "../constants";
import { useJogosContext } from "../contexts/jogosContext";

export default function FormJogo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { estudios, setIdDoEstudioClicado, setEstudios } = useEstudiosContext();
  const { jogos, setJogos } = useJogosContext();
  const [jogo, setJogo] = useState({});
  console.log({ jogo });

  useEffect(() => {
    if (id) {
      api
        .get(`/Jogos/${id}`)
        .then((response) => {
          setJogo(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, setJogo]);

  useEffect(() => {
    api.get("/Estudios").then((response) => setEstudios(response.data));

    return () => setEstudios([]);
  }, []);

  const handleAddJogo = async (e) => {
    e.preventDefault();

    const data = {
      id: uuid(),
      ...jogo,
      categoria: Number(jogo.categoria),
    };

    try {
      await api.post("/Jogos", data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditJogo = async (e) => {
    e.preventDefault();

    const data = {
      ...jogo,
      categoria: Number(jogo.categoria),
    };

    setIdDoEstudioClicado(undefined);
    try {
      await api.put(`/Jogos/${id}`, data);
      setJogos(jogos.map((j) => (j.id === id ? data : j)));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar" : "Adicionar"} Jogo</h2>
      <form onSubmit={id ? handleEditJogo : handleAddJogo}>

        <label htmlFor="estudio">Estúdio</label>
        <br />
        <select
          required
          onChange={(e) => {
            setJogo({ ...jogo, estudioId: e.target.value });
          }}
          value={jogo.estudioId || ""}
        >
          <option
            value=""
            style={{
              display: "none",
            }}
          >
            Escolha um estúdio
          </option>
          {estudios.map((estudio, index) => {
            return (
            <option
              value={estudio.id}
              key={index}
            >
              {estudio.nome}
            </option>
          )})}
        </select>
        <br />
        <br />

        <label htmlFor="nome">Nome</label>
        <br />
        <input
          required
          type="text"
          placeholder="Nome do jogo"
          value={jogo.nome}
          onChange={(e) => {
            setJogo({ ...jogo, nome: e.target.value });
          }}
        />
        <br />
        <br />

        <label htmlFor="dataLancamento">Data de lançamento</label>
        <br />
        <input
          type="date"
          value={jogo.dataLancamento ? jogo.dataLancamento.split("T")[0] : ""}
          onChange={(e) => {
            const data = new Date(e.target.value).toISOString();
            setJogo({ ...jogo, dataLancamento: data });
          }}
        />
        <br />
        <br />

        <label htmlFor="categoria">Categoria</label>
        <br />
        <select
          onChange={(e) => {
            setJogo({ ...jogo, categoria: e.target.value });
          }}
          value={jogo.categoria || ""}
        >
          <option value="" style={{ display: "none" }}>
            Escolha uma categoria
          </option>
          {CATEGORIAS.map((categoria, index) => (
            <option value={categoria.id} key={index}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button type="submit">{id ? "Editar" : "Adicionar"}</button>
      </form>
    </div>
  );
}
