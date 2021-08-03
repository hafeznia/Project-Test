import React from "react";
import Styled from "styled-components";
import Loading from "Assets/Loading";

type ButtonProps = {
  label: string;
  loading?: boolean;
  onClick: Function;
};

const Button = ({ label, onClick, loading }: ButtonProps) => {
  const Button = Styled.button`
    all: unset;
    background: var(--green-light-color);
    color: #000;
    font-weight: bold;
    padding: 10px;
    border-radius: 9px;
    cursor: pointer;
    display: flex;
    margin: 0 auto;

    span {
      margin-right: 5px;
    }

  `;

  return (
    <Button onClick={() => onClick()}>
      <span>{label}</span>
      {loading && <Loading />}
    </Button>
  );
};

export default Button;
