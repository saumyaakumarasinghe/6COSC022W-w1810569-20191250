const userDao = require("../dao/user.dao");
const passwordService = require("./password.service");

const login = async (req, res) => {
    try {
        res.send("login")
    } catch (err) {
        console.log(err.message);
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //TODO validate request body

        const hashPassword = await passwordService.hashPassword(password);

        const user = await userDao.createUser({ name, email, hashPassword });

        res.send({ hi: "register", name, email, password, hashPassword, user })
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    login,
    register
}