const { Thought, User } = require("../models");

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // get a single student
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: "No user with this ID :(" })
                    : res.json({
                        student
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // update selected user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this ID :(" })
                    : res.json(user)
            )
            .catch((err) => res.json(500).json(err));
    },
    // delete a user and remove them from the social network
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No such user exists" })
                    : User.findOneAndUpdate(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: "User deleted, but no thoughts found.",
                    })
                    : res.json({ message: "User completely deleted." })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // add thought to a user
    addFriend(req, res) {
        console.log("You have made a friend.");
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { assignments: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "No user found with that ID :(" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // remove thought from a user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "No user found with that ID :(" })
                    : res.json({ message: "You are no longer friends. " })
            )
            .catch((err) => res.status(500).json(err));
    }
}