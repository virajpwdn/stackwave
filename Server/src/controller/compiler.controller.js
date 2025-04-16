const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/ApiError");
const AppResonse = require("../utils/ApiResponse");
const config = require("../config/config");
const axios = require("axios");

const options = {
  method: "POST",
  url: "https://judge0-ce.p.rapidapi.com/submissions",
  params: {
    base64_encoded: "true",
    wait: "false",
    fields: "*",
  },
  headers: {
    "x-rapidapi-key": config.JUDGEO_API_KEY,
    "x-rapidapi-host": config.JUDGEO_HOST,
    "Content-Type": "application/json",
  },
  data: {
    language_id: 52,
    source_code:
      "I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=",
    stdin: "SnVkZ2Uw",
  },
};



module.exports.createSubmissionController = asyncHandler(async (req, res) => {
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const check = fetchData();
  res.send(check.res)
});


