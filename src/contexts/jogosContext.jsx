import { createContext, useContext, useState } from 'react';

const JogosContext = createContext();

const JogosProvider = ({ children }) => {
  const [jogos, setJogos] = useState([]);

  return (
    <JogosContext.Provider
      value={{
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