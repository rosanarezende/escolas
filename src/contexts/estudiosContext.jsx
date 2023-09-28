import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";

const EstudiosContext = createContext();

const EstudiosProvider = ({ children }) => {
  const [idDoEstudioClicado, setIdDoEstudioClicado] = useState(undefined);
  const [estudios, setEstudios] = useState([]);

  useEffect(() => {
    api.get("/Estudios").then((response) => setEstudios(response.data));

    return () => setEstudios([]);
  }, []);

  return (
    <EstudiosContext.Provider
      value={{
        idDoEstudioClicado,
        setIdDoEstudioClicado,
        //
        estudios,
        setEstudios,
      }}
    >
      {children}
    </EstudiosContext.Provider>
  );
};

const useEstudiosContext = () => useContext(EstudiosContext);

export { EstudiosProvider, useEstudiosContext };
