import { createContext, useContext, useState } from 'react';

const JogosContext = createContext();

const JogosProvider = ({ children }) => {
  // const [idDoJogoClicado, setIdDoJogoClicado] = useState(undefined);
  const [jogos, setJogos] = useState([]);

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