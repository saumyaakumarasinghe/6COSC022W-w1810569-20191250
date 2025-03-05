const login = async (req, res) => {
    try {
        res.send("login")
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    login
}