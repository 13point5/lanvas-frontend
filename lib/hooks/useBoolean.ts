import { useState } from "react";

export const useBoolean = () => {
  const [value, setValue] = useState(false);

  return {
    value,
    setValue,
    on: () => setValue(true),
    off: () => setValue(false),
    toggle: () => setValue((prev) => !prev),
  };
};
