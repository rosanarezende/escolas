import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../service/api';

const JogosContext = createContext();

const JogosProvider = ({ children }) => {
  // const [idDoJogoClicado, setIdDoJogoClicado] = useState(undefined);
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    api.get("/Jogos").then((response) => setJogos(response.data));

    return () => setJogos([]);
  }, []);

  return (
    <JogosContext.Provider
      value={{
        // idDoJogoClicado,
        // setIdDoJogoClicado,
        // 
        jogos,
        setJogos,
      }}
    >
      {children}
    </JogosContext.Provider>
  );
}

const useJogosContext = () => useContext(JogosContext);

export { JogosProvider, useJogosContext };