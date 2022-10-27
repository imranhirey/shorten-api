let expres=require('express');
let app=expres();
let bodyParser=require('body-parser');


let cors=require('cors');
const connect = require('./db/connect');
const Shortenedurls = require('./db/schemas/Shortenedurls');
app.use(cors({
    origin:'*'
}));

connect()
app.use(bodyParser.json());
app.get('/:id',(req,res)=>{
    Shortenedurls.findOne({shortenedurl:'bu.up.railway.app/'+req.params.id},async(err,data)=>{
        if(err){
            res.send(err);
        }
        else{
            // update the visited field
            await Shortenedurls.updateOne({shortenedurl:'bu.up.railway.app/'+req.params.id},{$inc:{visited:1}})
            res.send(data.originalurl);
        }
    })
})

app.post('/shorten',async(req,res)=>{
    let url=req.body.urlka;
    // check if url is already in database
    // if yes then return the shortened url
    // if no then create a new shortened url and return it
    console.log('waa lii imaadayeee')
    let isavailable=await Shortenedurls.findOne({originalurl:url});
    if (isavailable){
        
        res.json({
            originalurl:isavailable.originalurl,
            shortenedurl:isavailable.shortenedurl,
            visited:isavailable.visited,
            created:isavailable.created,
            msg:'from hore'
        })
    }
    else{
        let shortenedurl=Math.random().toString(36).substr(2,5);
        let urlka= 'bu.up.railway.app/'+shortenedurl;
        let newurl=new Shortenedurls({
            originalurl:url,
            shortenedurl:urlka,
            visited:0,
            created:new Date()
        })
        await newurl.save();
        res.json({
            originalurl:newurl.originalurl,
            shortenedurl:newurl.shortenedurl,
            visited:newurl.visited,
            created:newurl.created,
             msg:'from dambe'
        })
    }
    

})
app.listen(80,()=>{
    console.log('server started');
})
