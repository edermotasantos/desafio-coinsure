import React from "react";
import './Body.css';
import { Link } from 'react-router-dom';

function ComeTogether() {
  return (
    <div className="text-container">
      <h2>Vamos Juntos</h2>
      <p>A Desafio é formada por uma equipe de especialistas em facilitar a vida do vendedor para o que realmente interessa. Estamos dispostos a diminuir a distância entre as pessoas e entregar a melhor experiência.</p>
      <nav>
        <p>Você já pode começar um anuncio agora! Basta fazer o <Link to="/login">login</Link>.</p>
        <p>Caso você seja novo por aqui, basta se <Link to="/register">cadastrar</Link>.</p>
      </nav>
    </div>
  );
}

export default ComeTogether;