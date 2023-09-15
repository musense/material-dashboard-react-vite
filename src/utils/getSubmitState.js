// const checkSubmitState = (selectedObject, updatedKeysArray) => {
//     for (const [key,] of Object.entries(selectedObject)) {
//         const index = key.toString().lastIndexOf('.') !== -1 ? key.toString().lastIndexOf('.') + 1 : 0
//         const actualKey = key.slice(index, key.toString().length)
//         if (actualKey.indexOf('!~') !== -1 && actualKey.indexOf('!~') === 0) {
//             updatedKeysArray.push(key.replace('!~', ''))
//         }
//     }
// }

const getSubmitObject = (selectedObject, submitState = {}) => {
    for (const [key,] of Object.entries(selectedObject)) {
        const index = key.toString().lastIndexOf('.') !== -1 ? key.toString().lastIndexOf('.') + 1 : 0
        const actualKey = key.slice(index, key.toString().length)
        if (actualKey.indexOf('!~') !== -1 && actualKey.indexOf('!~') === 0) {
            submitState[actualKey.replace('!~', '')] = selectedObject[key.replace('!~', '')]
        }
    }
}

const getSubmitState = (selectedObject) => {

    let submitState = {}
    // let updatedKeysArray = []

    // checkSubmitState(selectedObject, updatedKeysArray)
    getSubmitObject(selectedObject, submitState)

    console.log("🚀 ~ file: getSubmitState.js:24 ~ getSubmitState ~ submitState:", submitState)
    // updatedKeysArray.map(key => {
    //     const index = key.toString().lastIndexOf('.') !== -1 ? key.toString().lastIndexOf('.') + 1 : 0
    //     const actualKey = key.slice(index, key.toString().length)
    //     submitState[actualKey] = selectedObject[key]
    // })

    return submitState
}


export default getSubmitState;