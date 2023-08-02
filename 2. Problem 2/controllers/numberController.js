const axios = require("axios");
exports.calculate = async(req, res) => {
    try{
        let urls = req.query.url;
        let hashSet = new Set();
        for(let i = 0; i < urls.length; i++){
            const response = await axios.get({
                url: urls[i]
            });
            let arr = response.data.numbers;
            for(let j = 0; j < arr.length;j++){
                hashSet.add(arr[i]);
            }
        }
        let arr = Array.from(hashSet);
        arr.sort((a, b) => a-b);
        res.status(200).json({
            status: "success",
            data: arr
        })
    }catch(err){
        console.log(err);
    }
}