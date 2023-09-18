import React from "react";
import { useLocation } from "react-router-dom";

export default function useQuery() {
    const { search } = useLocation();
    console.log("🚀 ~ file: useQuery.js:6 ~ useQuery ~ search:", search)

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

