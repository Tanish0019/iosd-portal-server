import mongoose, {Schema} from 'mongoose';

const CourseSchema = new Schema({
    title: String,
    sub_title: String,
    description: String,
    image : String,

    // review: [Review],

    prerequisites: [{
        req: String
    }],

    Instructor: [{
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
    }],

    videos: [{
        id: Schema.Types.ObjectId(),
        title: String,
        url: String,
        section : String,
        duration: String
    }]
});

CourseSchema
    .virtual('total_videos')
    .get(function () {
        return this.videos.length;
    });

CourseSchema
    .virtual('duration')
    .get(function () {
        let d = 0;
        this.videos.map(video => {
            d += video.duration
        });
        return d;
    });

module.exports = mongoose.model("Course", CourseSchema);