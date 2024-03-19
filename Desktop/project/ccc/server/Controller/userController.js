const User = require("../Model/userModel")
const bcrypt = require('bcrypt')
const createNewUser = async (req, res) => {

    if (req.user.role == "admin") {
        const { name, username, password, email, role } = req.body
        console.log(name, username, password, email, role)
        const hashPass = await bcrypt.hash(password, 10)
        if (!username) return res.status(400).send("userName is require!")
        const checkUserName = await (await User.find()).map(use => use.userName)

        if (checkUserName.includes(username)) return res.status(400).send("userName is invalid!")
        if (username.toLowerCase() != username) return res.status(400).send("userName must be lowercase!")

        if (!password) return res.status(400).send("password is require!")

        if (!name) return res.status(400).send("name is require!")

        // if(email?.toLowerCase()!=email) return res.status(400).send("email must be lowercase!")
        if (role)
            if (role !== "admin" && role !== "user") return res.status(400).send("invalid!")

        await User.create({ username, password: hashPass, email, role, name })
        return res.json({ username, email, role, name })
    }
    return res.json({ msg: 'denied' }).status(401)
}

const getAllUsers = async (req, res) => {
    if (req.user.role == "admin") {

        const allUsers = await User.find({}, { password: 0 }).sort({ name: 1 }).lean()
        return res.json(allUsers)
    }
    return res.json({ msg: 'denied' }).status(401)
}

const getUsersById = async (req, res) => {
    if (req.user.role == "admin") {
        const { id } = req.params
        if (!id) return res.status(400).send("id is require!")
        console.log(typeof (id));
        const user = await User.findOne({ _id: id }, { password: 0 })
        return res.json(user)
    }
    if (req.user.role == "user") {
        const _id = req.user._id
        const user = await User.findOne({ _id }, { password: 0 }).lean()
        return res.json(user)
    }

}

const updateUser = async (req, res) => {
    if (req.user.role == "admin") {
        const { _id, role } = req.body
        console.log("user", { _id, role })

        if (!_id) return res.status(400).send("id is require!")

        if (role) {
            if (role != "admin" && role != "user") return res.status(400).send("invalid!")
        }

        const userUp = await User.findById(_id).exec()

        if (!userUp) return res.status(400).send("not found")

        userUp.role = role
        const update = await userUp.save()
        console.log(update);
        return res.json(update)
    }
    if (req.user.role == "user") {
        let hashPass
        const _id = req.user._id;
        const { username, password, email, name } = req.body
        if (!_id) return res.status(400).send("id is require!")
        if (!username) return res.status(400).send("usermame is require!")

        const checkUserName = await User.findOne({ _id })
        if (checkUserName.username !== username) {
            const newUserName = await User.find({ username })
            if (newUserName?.length && newUserName?._id != _id) return res.status(400).send("userName is invalid!")
        }

        if (username.toLowerCase() != username) return res.status(400).send("userName must be lowercase!")

        if (password) {
            if (password === 0) return res.status(400).send("password=0!")
            hashPass = await bcrypt.hash(password, 10)
        }
        const user = await User.findById(_id).exec()

        if (!user) return res.status(400).send("not found")

        user.username = username
        user.password = hashPass? hashPass:user.password
        user.email = email
        user.name = name

        const update = await user.save()
        console.log(update);
        return res.json(update)
    }
}


const deleteUser = async (req, res) => {
    console.log('idddd' + req.user._id);
    if (req.user.role == "user") {
        const _id = req.user._id
        console.log(_id);
        const user = await User.findById(_id)
        console.log(user);
        if (!user) return res.status(400).send("not found")

        const result = await user.deleteOne()

        const deleted = `${_id} deleted`
        return res.send(deleted)
    }
    else {
        const { _id } = req.body
        const user = await User.findById(_id)
        if (!user) return res.status(400).send("not found")

        const result = await user.deleteOne()

        const deleted = `${_id} deleted`
        return res.send(deleted)
    }
}

module.exports = { createNewUser, getAllUsers, getUsersById, updateUser, deleteUser }



