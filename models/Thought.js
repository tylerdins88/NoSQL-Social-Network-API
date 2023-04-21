const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reaction: {
            type: String,
            require: true,
            max_length: 280
        },
        thoughtId: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

const thoughtSchema = new Schema(
    {
        thought: {
            type: String,
            require: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (date) => {
            //     if (date) {
            //         return date.toISOString().split("T")[0];
            //     }
            // }
        },
        username: {
            type: String,
            require: true
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false
    }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;