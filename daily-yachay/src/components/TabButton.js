import React from 'react';
import '../styles/tabs.css';

const TabButton = ({ id, handleClick, clickedButton, text }) => {
  return (
    <button 
      onClick={() => handleClick(id)}
      className={clickedButton === id ? "col-3 tab-button active no-hover" : "tab-button"}>
      {text}
    </button>
  );
}

export default TabButton;
