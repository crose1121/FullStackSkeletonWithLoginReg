// import controller file using require() and save it as a variable (ex: NameController)

const controllerFile = "user.controller" //change this for each project

const UserController = require(`../controllers/${controllerFile}`) //change NameController for each project

module.exports = (app) => {
    // routes go here along with functions from controller
    // ex: app.get("/api/users", UserController.getAllUsers)

    app.get("/api/users", UserController.getAllUsers)
    app.post("/api/users/register", UserController.register)
    app.post("/api/users/login", UserController.login)
    app.get("/api/users/getloggedinuser", UserController.getLoggedInUser)
    app.get("/api/users/logout", UserController.logout)
}
