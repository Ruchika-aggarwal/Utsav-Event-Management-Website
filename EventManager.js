var express=require("express");
var mysql=require("mysql");

var path=require("path"); 

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

var app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public")); 
// app.use(express.static(__dirname + '/public'));
var fileup=require("express-fileupload");
app.use(fileup());
app.listen(1001,function(){
    console.log("Server Started");
})
app.use(express.urlencoded({extended:true}));
var dbconfig={
    host:"localhost",
    user:"root",
    password:"",
    database:"eventmanager"
}

var dbcon=mysql.createConnection(dbconfig);
 dbcon.connect(function(err){
     if(err)
     console.log(err.message);

     else console.log("WELCOME");

 })
 
app.get("/home",function(req,resp){
    resp.sendFile(__dirname+"/public/index.html");
    // console.log(__dirname);

})
app.get("/chk-user-in-table",function(req,resp){
    //resp.send("Bale Bale of "+ req.query.thisuser);
   // alert("...........");
    dbcon.query("select * from eventmanager where uid=?",[req.query.thisuser],function(err,result){
        if(err)
        resp.send(err.message);
        else
        resp.send(result);
    })
})
 app.post("/client-save",function(req,resp){
     var filename="";
    if(req.files==null)
    filename="profile.png";
 else
    {
          req.body.picname=req.files.ppic.name;
         var uploadsFolder=path.join(path.resolve(),"public","uploads",req.files.ppic.name);
         //console.log(uploadsFolder);

         //resp.send("File Received:"+req.files.ppic.name);
             req.files.ppic.mv(uploadsFolder);
             //resp.send("Pic saved");
             filename=req.files.ppic.name;
    }

    var data=[req.body.name,req.body.email,req.body.contact,req.body.address,req.body.city,req.body.state,filename];
       dbcon.query("insert into client values(?,?,?,?,?,?,?)",data,function(err){

        if(err)
        resp.send(err.message);
        else
        resp.redirect("/dash-client1.html");
       })
        
})
app.post("/vendor-save",function(req,resp){
    var filename="";
   if(req.files==null)
   filename="profile.png";
else
   {
         req.body.proofpath=req.files.ppic.name;
        var uploadsFolder=path.join(path.resolve(),"public","uploads",req.files.ppic.name);
            req.files.ppic.mv(uploadsFolder);
            filename=req.files.ppic.name;
   }

//    var data=[req.body.email,req.body.name,req.body.contact,req.body.firm,req.body.estab,req.body.adres,req.body.city,req.body.aadhar,filename,req.body.selservice,req.body.other];
var data=[req.body.name,req.body.email,req.body.contact,req.body.address,req.body.city,req.body.firm,req.body.state,req.body.event,filename];
      dbcon.query("insert into vendors values(?,?,?,?,?,?,?,?,?)",data,function(err){

       if(err)
       resp.send(err.message);
       else
       resp.redirect("/index.html");
      })
      
})

 app.post("/client-update",(req,resp)=>{
   
    var filename="";
    if(req.files==null)
    {
       
        filename="profile.png";
    }
    else{
          req.body.picpath=req.files.ppic.name;
         var uploadsFolder=join(resolve(),"public","uploads",req.files.ppic.name);
                req.files.ppic.mv(uploadsFolder);

                filename=req.files.ppic.name;
    }
      
    var data=[req.body.userid,req.body.name,req.body.address,req.body.city,req.body.contact,filename,req.body.email];
   
    dbcon.query("update clients set uid=?,uname=?,address=?,city=?,contact=?,picpath=? where email=? ",data,function(err){
        if(err)
        resp.send(err);
        else
        resp.send("Updated");
   })
        
   })
app.post("/client-go",(req,resp)=>{
   
      
    var data=[req.body.newpwd,req.body.email];
   
    dbcon.query("update users set pwd=? where email=? ",data,function(err){
        if(err)
        resp.send(err);
        else
        resp.send(req.body.email);
   })
        
   })
    

app.post("/signup",(req,resp)=>{
    var curd=new Date();
    var dos=curd.getFullYear()+"-"+(curd.getMonth()+1)+"-"+curd.getDate();
    var tos=curd.getHours()+":"+curd.getMinutes()+":"+curd.getSeconds();
    req.body.tos=tos;
    // console.log(tos);
    req.body.dos=dos;
      
    var data=[req.body.email,req.body.pass,req.body.option,req.body.date,req.body.dos];
   
    dbcon.query("insert into users values(?,?,?,?,?)",data,function(err){
         if(err)
         resp.send(err);
         else
         resp.redirect("/index.html");
    })
    
    /////////////////////////////////
    
    const output = `
    
    <h3>Here are your Login Credentials!</h3>
    <ul>  
      <li>Email: ${req.body.email}</li>
      <li>Password: ${req.body.pass}</li>
      <li>Service: ${req.body.option}</li>
    
    </ul>
    
  `;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bansalbathinda1234@gmail.com',
      pass: 'Sbin@1234'
    }
  });
  
  var mailOptions = {
    from: 'bansalbathinda1234@gmail.com',
    to: req.body.email,
    subject: 'You have successfully registered to UTSAV',
    text: 'hello',
    html:output
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    //////////////////////////////

    
})
app.post("/login",(req,resp)=>{
    
    //  var data=["hello","1234"];
    var data=[req.body.email,req.body.pswd];
   
    dbcon.query("select type from users where email=? and pwd=?",data,function(err,result){
         if(err)
         resp.send(err);
         else{
             if(result[0].type=="client")
                resp.redirect("/profile-client.html");
         else if(result[0].type=="vendor"){
                resp.redirect("/profile-vendor.html");
         }
         else{
            resp.redirect("/index.html");
         }
         }

    })
   
})
app.post("/client-logout",function(req,resp){
    // resp.sendFile(__dirname+"/public/index.html");
    resp.redirect("/index.html");
})

app.post("/vendor-update",(req,resp)=>{
   
    var filename="";
    if(req.files==null)
    {
       
        filename="profile.png";
    }
    else{
          req.body.picpath=req.files.ppic.name;
         var uploadsFolder=join(resolve(),"public","uploads",req.files.ppic.name);
                req.files.ppic.mv(uploadsFolder);

                filename=req.files.ppic.name;
    }
      
    var data=[req.body.name,req.body.contact,req.body.firm,req.body.estab,req.body.adres,req.body.city,req.body.aadhar,filename,req.body.selservice,req.body.other,req.body.email];
   
    dbcon.query("update vendor set name=?, contact=?,firm=?,established=?,address=?,city=?,acard=?,proofpath=?,selservice=?,otherinfo=? where email=? ",data,function(err){
        if(err)
        resp.send(err);
        else
        resp.send("Updated");
   })
        
   })
   app.get("/vendors-wedding",function(req,resp){
       var data=["Wedding"]
    dbcon.query("select * from vendors where event=?",data,function(err,result)
    {
        //alert();
        if(err)
        resp.send(err);
        else
        resp.send(result);

        // resp.sendFile(__dirname+"/public/dash-admin.html");
    })
   })
   app.get("/vendors-anni",function(req,resp){
    var data=["Anniversary"]
 dbcon.query("select * from vendors where event=?",data,function(err,result)
 {
     //alert();
     if(err)
     resp.send(err);
     else
     resp.send(result);

     // resp.sendFile(__dirname+"/public/dash-admin.html");
 })
})
app.get("/vendors-birth",function(req,resp){
    var data=["Birthday"]
 dbcon.query("select * from vendors where event=?",data,function(err,result)
 {
     //alert();
     if(err)
     resp.send(err);
     else
     resp.send(result);

     // resp.sendFile(__dirname+"/public/dash-admin.html");
 })
})

   app.get("/dash-admin",function(req,resp){
    resp.sendFile(__dirname+"/public/dash-admin.html");
   })
   
   app.get("/client",function(req,resp){
    dbcon.query("select * from client",function(err,result)
    {
        if(err)
        resp.send(err);
        else
        resp.send(result);

        // resp.sendFile(__dirname+"/public/dash-admin.html");
    })
   })

   

