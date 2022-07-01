const router = require("express").Router();

const House = require("../model/House");
const Report = require("../model/Report");
const User = require("../model/User");

router.post('/house', async (req, res) => {
    try {
        const { userId, houseId } = req.body;
        const house = await House.findById(houseId);

        if (!house) {
            throw new Error("House Not Found");
        }

        const residents = house.residents;
        const residentsInfo = [];
        for (let resident of residents) {
            const residentInfo = {};
            const user = await User.findById(resident._id);
            residentInfo.firstName = user.firstName;
            residentInfo.lastName = user.lastName;
            residentInfo.middleName = user.middleName;
            residentInfo.email = user.email;
            residentInfo.phoneNumber = user.phoneNumber.cell;
            residentsInfo.push(residentInfo);
        }

        res
            .status(200)
            .json({
                house: house,
                residents: residentsInfo,
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

        res
            .status(200)
            .json({
                msg: "Report Submitted Successfully",
                report: report
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

        const reports = await Report.find({ userId: userId });
        const user = await User.findById(userId);

        const modifiedReports = [];
        for (const report of reports) {
            modifiedReports.push({
                _id: report._id,
                title: report.title,
                description: report.description,
                username: user.username,
                date: report.date,
                status: report.status
            });
        }

        res
            .status(200)
            .json({
                msg: "The User's Reports Retrieved Successfully",
                reports: modifiedReports
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
        await Report.findByIdAndUpdate(reportId, {
            comments: [...report.comments, {
                description: description,
                userId: userId,
                date: new Date()
            }]
        })

        res
            .status(200)
            .json({
                msg: "Uploaded a comment Successfully"
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
        const report = await Report.findById(reportId);
        const user = await User.findById(report.userId);

        const modifiedComments = [];
        if (report.comments) {
            for (const comment of report.comments) {
                modifiedComments.push({
                    description: comment.description,
                    username: user.username,
                    date: comment.date
                })
            }
        }

        res
            .status(200)
            .json({
                msg: "Comments Retrieved Successfully",
                comments: modifiedComments
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