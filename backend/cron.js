import cron from "cron"
import https from "https"

// send GET request for every 14 minutes
const URL = "https://notion-movie.onrender.com/"

const job = new cron.CronJob("*/14 * * * *",function(){
  https.get(URL, (res) =>{
    if(res.statusCode === 200){
      console.log("GET request sent successfully")
    }else{
      console.log("GET request failed", res.statusCode)
    }
  }).on("error",(e) =>{
    console.error("Error while sending request",e)
  })
})

export default job;