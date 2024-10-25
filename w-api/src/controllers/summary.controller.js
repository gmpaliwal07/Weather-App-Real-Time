const Weather = require("../models/weather.model");

const getSummary = async (req, res) => {
    try {
        const city = req.query.city;

        const summary = await Weather.aggregate([
            {
                $match: {
                    city: city,
                    datetime: {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$datetime" } },
                    minTemp: { $min: "$temp" },
                    maxTemp: { $max: "$temp" },
                    avgTemp: { $avg: "$temp" },
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    temp: {
                        min: { $round: ["$minTemp", 2] },
                        max: { $round: ["$maxTemp", 2] },
                        avg: { $round: ["$avgTemp", 2] }
                    }
                }
            },
            {
                $sort: { date: -1 }
            }
        ]);

        res.json({
            summary: summary
        });
        
    } catch (error) {
        res.json({ message: error });
    }
};

module.exports = {
    getSummary,
};