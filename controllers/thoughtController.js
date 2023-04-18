const { Thought, User } = require("../models");

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID :(" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID :(" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(() => res.json({ message: "Thought deleted" }))
            .catch((err) => res.status(500).json(err));
    },
    // add a reatction to a thought
    createReaction(req, res) {
        console.log("You are making a reaction!");
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: "No thought found with that ID :(" })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },
    // remove a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID :(" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}