import React from "react";
import './Body.css';
import ComeTogether from "./ComeTogether";
import imagem from '../img/undraw_knowledge_re_5v9l.svg';

function Body() {
  return (
    <div className="home-container">
      <img alt="banner" src={imagem} />
      <div class="forms-container">
        <ComeTogether/>
      </div>
    </div>
  );
}

export default Body;