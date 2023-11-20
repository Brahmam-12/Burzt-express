const jwt = require('jsonwebtoken');
const Secret_Token= 'sdefgrhtn78derfgtrhtnj7sw232453';

const isAuthorized = (req, res, next)=>{
     try{
         const token = req.headers.authorization;
         if(!token){
             res.json({error:"Please Sign In"})
         }else{
             jwt.verify(token, Secret_Token,(error,user)=>{
                 if(error){
                     return res.json({ error: "Unauthorized Request" });
                 }
                 req.user = user;
                 next();
             })
         }
     }catch(error){
         console.log(error);
         res.json({error:"Unauthorized eRquest"})
     }
}

module.exports = isAuthorized;
