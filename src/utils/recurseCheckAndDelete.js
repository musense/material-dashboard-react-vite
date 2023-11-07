export default function recurseCheckAndDelete(state, initialState, createType) {
  const hierarchyState = { ...state }
  if (createType === "add_new") {
    for (const key in initialState) {
      const value = initialState[key];
      if (key.toLowerCase().includes('image')) {
        if (hierarchyState[key] === '') {
          delete hierarchyState[key]
        }
      } else if (value && !Array.isArray(value) && typeof value === 'object') {
        const trimmedState = recurseCheckAndDelete(hierarchyState[key], value, createType)
        if (trimmedState && Object.values(trimmedState).length === 0) {
          delete hierarchyState[key]
        }
      } else if (value && Array.isArray(value)) {
        if (JSON.stringify(value) === JSON.stringify(hierarchyState[key])) {
          delete hierarchyState[key]
        }
      }
      if (JSON.stringify(value) === JSON.stringify(hierarchyState[key])) {
        delete hierarchyState[key]
      }
    }

  } else if (createType === "update") {
    for (const key in initialState) {
      let value = initialState[key];
      console.log("🚀 ---------------------------------------------------------------------------------------------------------🚀")
      console.log("🚀 ~ file: recurseCheckAndDelete.js:31 ~ recurseCheckAndDelete ~ value:", value)
      console.log("🚀 ~ file: recurseCheckAndDelete.js:31 ~ recurseCheckAndDelete ~ hierarchyState[" + key + "]:", hierarchyState[key])
      console.log("🚀 ---------------------------------------------------------------------------------------------------------🚀")
      if (key.toLowerCase().includes('image')) {
        if (hierarchyState[key] === value) {
          delete hierarchyState[key]
        }
      } else if (value && !Array.isArray(value) && typeof value === 'object') {
        // 子類別刪除
        const trimmedState = recurseCheckAndDelete(hierarchyState[key], value, createType)
        // 母類別若已無子類別則刪除
        if (trimmedState && Object.values(trimmedState).length === 0) {
          delete hierarchyState[key]
        }
      } else if (Array.isArray(value)) {
        // Array類別刪除
        if (JSON.stringify(value) === JSON.stringify(hierarchyState[key])) {
          delete hierarchyState[key]
        }
      }
      // 類別刪除           
      if (JSON.stringify(value) === JSON.stringify(hierarchyState[key])) {
        delete hierarchyState[key]
      }
    }
  }
  return hierarchyState
}