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

