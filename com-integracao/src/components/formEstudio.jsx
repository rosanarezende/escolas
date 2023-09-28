import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { api } from "../service/api";

export default function FormEstudio() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [estudio, setEstudio] = useState({});

  useEffect(() => {
    if (id) {
      api
        .get(`/Estudios/${id}`)
        .then((response) => {
          setEstudio(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleAddEstudio = async (e) => {
    e.preventDefault();

    const data = {
      ...estudio,
      id: uuid(),
    };

    try {
      await api.post("/Estudios", data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEstudio = async (e) => {
    e.preventDefault();

    const data = {
      ...estudio,
      id: id,
    };

    try {
      await api.put(`/Estudios/${id}`, data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar " : "Cadastrar "} estúdio</h2>
      <form onSubmit={id ? handleEditEstudio : handleAddEstudio}>
        <label htmlFor="nomeDoEstudio">Nome do estúdio</label>
        <br />
        <input
          required
          type="text"
          placeholder="Nome do estúdio"
          value={estudio.nome || ""}
          onChange={(e) => {
            setEstudio({ ...estudio, nome: e.target.value });
          }}
        />
        <br />
        <br />

        <label htmlFor="dataCriacao">Data de lançamento</label>
        <br />
        <input
          type="date"
          value={estudio.dataCriacao ? estudio.dataCriacao.split("T")[0] : ""}
          onChange={(e) => {
            const data = new Date(e.target.value).toISOString();
            setEstudio({ ...estudio, dataCriacao: data });
          }}
        />
        <br />
        <br />

        <label htmlFor="endereco">Endereco</label>
        <br />
        <input
          required
          type="text"
          placeholder="Endereco"
          value={estudio.endereco || ""}
          onChange={(e) => {
            setEstudio({ ...estudio, endereco: e.target.value });
          }}
        />
        <br />
        <br />

        <button type="submit">{id ? "Editar " : "Cadastrar "}</button>
      </form>
    </div>
  );
}
