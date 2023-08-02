const axios = require("axios");

exports.protectRoute = async (req, res, next) =>{
    try{
        // console.log(req.headers.authorization);
        let token = req.headers.authorization;
        // console.log(token);
        token = token.split(' ');
        let data = {
                companyName: "Train Central",
                clientID: "da8b2eb4-5c75-4966-87dc-71faf6736a90",
                clientSecret: "pLKzzuuFjTKIOTjS",
                ownerName: "Rahul",
                ownerEmail: "darsigangothri@gmail.com",
                rollNo: "20JR1A4306"            

        };
        const response = await axios.post("http://20.244.56.144/train/auth", data);
        
        if(response.data.access_token == token[1]){
            // grant 
            console.log('granted')
            req.user = token[1];
            // proceed
            next();
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: "error",
            message: err
        })
    }
}

exports.getAllTrains = async (req, res) => {
    try{
        const response = await axios.get({
            url: "http://20.244.56.144/train/trains",
            headers: {
                Authorization: `Bearer ${req.user}`
            }
        });

        if (!response) return res.status(404).json({ message: "No trains found"});
        const responseTrainsData = response.data;

        const currentTime = new Date();
        const limitTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);

        const filteredTrains = responseTrainsData.filter((train) => {
            const dpTime = new Date();
                dpTime.setHours(train.dpTime.Hours);
                dpTime.setMinutes(train.dpTime.Minutes);
                dpTime.setSeconds(train.dpTime.Seconds);
                let test = dpTime > currentTime && dpTime <= limitTime;
                if(test){
                    const delayInMinutes = train.delayedBy || 0;
                    dpTime.setMinutes(dpTime.getMinutes() + delayInMinutes);
                }
                return test;
            });

        const resultTrains = filteredTrains.sort((a, b) => {
        if (a.price.sleeper !== b.price.sleeper) {
            return a.price.sleeper - b.price.sleeper;
        } else if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
            return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
        } else {
            // Sort by departure time in descending order
            const dpTime1 = a.dpTime.getTime();
            const dpTime2 = b.dpTime.getTime();
            return dpTime2 - dpTime1;
        }
        });
        res.status(200).json({
            status: "success",
            data: resultTrains
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: "error",
            message: err
        })
    }
}

exports.getTrainById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get({
            url: `http://20.244.56.144:80/interview/trains/${id}`,
            headers: {
                Authorization: `Bearer ${req.user}`
            }
        });
        if (!response) return res.status(404).json({ message: "No train found" });
      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};