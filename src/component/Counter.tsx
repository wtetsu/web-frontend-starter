import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <input type="button" onClick={() => setCount(count + 1)} value="+" className={"button-small"} />
      {count}
    </div>
  );
};

export { Counter };
