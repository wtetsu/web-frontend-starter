import React, { FC } from "react";

type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  busy?: boolean;
};

const DEFAULT_STYLE: React.CSSProperties = {
  width: 80,
};

const Button: FC<ButtonProps> = (props) => {
  const inner = props.busy ? <img src="img/loading.gif" /> : props.children;
  const style = { ...DEFAULT_STYLE, ...props.style };

  return (
    <button type="button" className="button is-link" style={style} onClick={(e) => props.onClick(e)}>
      {inner}
    </button>
  );
};

export { Button };
