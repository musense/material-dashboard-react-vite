import { useEffect, useState } from "react";

export default function useSetSelectorValue(defaultSelected) {

  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected]);

  return { selected, setSelected }
}
