const getRouterChildren = (router, path) => {

    let routes = []
    for (let i = 0; i < router.length; i++) {
        let route
        let inheritedPath = path ? `${path}/${router[i].path ?? ''}` : router[i].path ?? ''
        if (router[i].children !== undefined) {
            route = {
                path: inheritedPath,
                name: router[i].name,
                index: router[i].index,
            }
            routes.push(route)
            routes.push(getRouterChildren(router[i].children, inheritedPath).flat())
        }
        else {
            route = {
                path: inheritedPath,
                name: router[i].name,
                index: router[i].index,
            }
        }
        routes.push(route)
    }
    return routes
}

export default getRouterChildren
