import { createContext, useContext, useState } from "react";

const EstudiosContext = createContext();

const EstudiosProvider = ({ children }) => {
  const [idDoEstudioClicado, setIdDoEstudioClicado] = useState(undefined);
  const [estudios, setEstudios] = useState([]);

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
