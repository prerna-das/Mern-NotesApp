const {Ratelimit} = require('@upstash/ratelimit')
const {Redis} =require('@upstash/redis')
const dotenv=require("dotenv")

dotenv.config()


//create a rate limiter that allows 100 request per minute
const ratelimit=new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s")
});

module.exports=ratelimit
