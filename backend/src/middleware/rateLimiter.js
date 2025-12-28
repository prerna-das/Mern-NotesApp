const ratelimit=require("../config/upstash.js")

const rateLimiter=(async(req,res,next)=>{
    try{
        const {success}=await ratelimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({
                message:"TOO MANY REQUESTS, Please Try Again LAter!"
            })
        }
         next();

    }
    catch(err){
        console.log("Rate limit Error",err)
        next()

    }
})

module.exports=rateLimiter;