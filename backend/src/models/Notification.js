const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const notificationSchemea = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        isRead: {
            type: Boolean,
            default: false,
            required: true
        }

    },
    {
        timestamps: true
    }
);

notificationSchemea.plugin(AutoIncrement, {
    inc_field: 'notification_id',
    id: 'notificationNums',
    start_seq: 500
})


module.exports = mongoose.model("Notification", notificationSchemea);

