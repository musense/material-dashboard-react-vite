import { useMemo } from "react";
import { isArray } from "../../../utils/fnHelper";

export default function useNormalize(defaultSelected) {

  const defaultOption = useMemo(() => {
    if (!defaultSelected) return undefined;
    if (isArray(defaultSelected) && defaultSelected.flatMap(selected => Object.keys(selected).some(key => key === '_id'))[0] === true) {
      return defaultSelected.map(selected => ({
        value: selected._id,
        label: selected.name
      }))
    }
    if (Object.keys(defaultSelected).some(key => key === '_id')) {
      return {
        value: defaultSelected._id,
        label: defaultSelected.name
      }
    }

    return defaultSelected
  }, [defaultSelected])

  return defaultOption && defaultOption
}
