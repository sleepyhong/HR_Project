const router = require("express").Router();

const House = require("../model/House");
const Report = require("../model/Report");
const User = require("../model/User");

router.post('/house', async (req, res) => {
    try {
        const { userId, houseId } = req.body;
        const house = await House.findById(houseId)
            .populate('residents.userId');

        if (!house) {
            throw new Error("House Not Found");
        }

        res
            .status(200)
            .json({
                house: house,
                msg: "House Detail Successfully Retrieved"
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: error.toString()
            });
    }
});

router.post("/report", async (req, res) => {
    try {
        const { userId, title, description } = req.body;
        const report = await Report.create({
            title: title,
            description: description,
            userId: userId,
            date: new Date()
        });

        const user = await User.findById(userId);
        console.log(report._id)
        await House.findByIdAndUpdate(user.houseId, {
            $push: {
                reports: {
                    reportId: report._id
                }
            }
        })

        const modifiedReport = {
            ...report._doc,
            username: user.username
        }

        res
            .status(200)
            .json({
                msg: "Report Submitted Successfully",
                report: modifiedReport
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: error.toString()
            });
    }
});

router.post("/get-reports", async (req, res) => {
    try {
        const { userId } = req.body;

        const reports = await Report.find({ userId: userId })
            .populate("userId")
            .populate("comments.userId");

        res
            .status(200)
            .json({
                msg: "The User's Reports Retrieved Successfully",
                reports: reports
            })
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: error.toString()
            });
    }
});

router.post("/comment", async (req, res) => {
    try {
        const { reportId, userId, description } = req.body;

        const report = await Report.findById(reportId);
        const newReport = await Report.findByIdAndUpdate(reportId, {
            comments: [...report.comments, {
                description: description,
                userId: userId,
                date: new Date()
            }]
        }, { 
            new: true 
        })
            .populate("comments.userId");;
        
        res
            .status(200)
            .json({
                msg: "Uploaded a comment Successfully",
                comments: newReport.comments
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: error.toString()
            });
    }
});

router.post("/get-comments", async (req, res) => {
    try {
        const { reportId } = req.body;
        const report = await Report.findById(reportId)
            .populate("comments.userId");

        res
            .status(200)
            .json({
                msg: "Comments Retrieved Successfully",
                comments: report.comments
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: error.toString()
            });
    }
});

router.post("/update-comment", async (req, res) => {
    try {
        const { reportId, commentIndex, description } = req.body;
        const report = await Report.findById(reportId);

        const newComments = [...report.comments];
        newComments[commentIndex].description = description;

        const newReport = await Report.findByIdAndUpdate(reportId, {
            comments: newComments
        })
            .populate("comments.userId");

        res
            .status(200)
            .json({
                msg: "Comments Updated Successfully",
                comments: newReport.comments
            });
    }
    catch (error) {
        res
            .status(400)
            .json({
                msg: error.toString()
            });
    }
});

module.exports = router;