const userDashboard = (req, res) => {
    res.status(200).json({
        status: "This is dashboard!",
    });
};

module.exports = userDashboard;
