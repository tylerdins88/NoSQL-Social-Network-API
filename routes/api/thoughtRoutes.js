const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/")
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route("/api/:thoughtId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route("/api/:thoughtId/reaction")
    .post(createReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route("/api/:thoughtId/reaction/:reactionId")
    .delete(removeReaction);

module.exports = router;