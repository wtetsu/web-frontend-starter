import React, { CSSProperties, FC, useState, useEffect } from "react";

type MessageProps = {
  text: string;
};

const Message: FC<MessageProps> = (props) => {
  const [visible, setVisible] = useState(true);

  const visibility = props.text && visible ? "visible" : "hidden";

  useEffect(() => {
    if (props.text) {
      setVisible(true);
    }
  }, [props.text]);

  return (
    <div
      className="message is-danger"
      style={{ cursor: "pointer", visibility, bottom: 0, position: "fixed" }}
      onClick={() => setVisible(false)}
    >
      <div className="message-body">{props.text}</div>
    </div>
  );
};

export { Message };
