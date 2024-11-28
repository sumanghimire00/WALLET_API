const userDashboard = (req, res) => {

    console.log(req.user);
    res.status(200).json({
        status: "This is dashboard!",
    });
};

module.exports = userDashboard;
