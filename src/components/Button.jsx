import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};
function Button({ text, onClick }) {
  return (
    <button className="button-2" onClick={onClick}>
      <span className="text-7">{text}</span>
    </button>
  );
}
export default Button;
