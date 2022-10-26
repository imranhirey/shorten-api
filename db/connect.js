let mongoose=require('mongoose');
let connect=()=>{
    mongoose.connect('mongodb+srv://imran:imran321@cluster0.arcqqgl.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
    let db=mongoose.connection;
    db.on('error',console.error.bind(console,'connection error:'));
    db.once('open',()=>{
        console.log('connected to database');
    })
}
module.exports=connect;