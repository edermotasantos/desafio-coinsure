import React, { useState } from "react";
import CollectContext from "../context/CollectContext";
import PropTypes from 'prop-types';

function CollectProvider({ children }) {
  const [answers, setAnswers] = useState({
    Pergunta1: '',
    Pergunta2: '',
    Pergunta3: '',
    Pergunta4: '',
  });
  const [amount, setAmount] = useState({});
  const [home, setHome] = useState(true);
  const [count, setCount] = React.useState(0);
  const [fewCharacters, setFewCharacters] = useState(<></>);

  const data = {
    answers,
    setAnswers,
    amount,
    setAmount,
    home,
    setHome,
    count,
    setCount,
    fewCharacters,
    setFewCharacters
  };
  
  return (
    <CollectContext.Provider value={ data }>
        { children }
    </CollectContext.Provider>
  );
}

CollectContext.propTypes = ({
    children: PropTypes.element.isRequired,
});

export default CollectProvider;
