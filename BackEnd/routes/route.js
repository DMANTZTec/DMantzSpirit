const express=require('express');
var mysql=require('mysql');
var router=express.Router();
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "secret",
    database:"dmantzspirit"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
router.all('/login',(req,res,next)=>{
   var request=req.body;
   console.log(request);
   var email=request.email;
   var password=request.password;
var select = 'SELECT * FROM registeredUsers WHERE email = ? limit 1';
connection.query(select, [email], function (error, results, fields) {
    if (error) {
        console.log("error ocurred");
        res.send({
            "code": 400, "failed": "Mail Id Not Exists"
        });
    }
    else {
        console.log('The solution is', results);
        if (results.length > 0) {
            console.log(results[0].password);
            if (results[0].password == password) {
                res.send({"status": "login success"});
            }
        }
    }
});
/*
router.get('/contacts',(req,res,next)=>{
var sql="select * from person";
    con.query(sql,function (err,results) {
            if(err) throw err;
            else
            {
            res.json(results);
            console.log(results);
        }
    });
    //res.send("retrieving response data");
});
router.post('/contact',(req,res,next)=>{
    var newcontact=req.body;
    console.log(req.body);
var sql='INSERT INTO person SET ?';
con.query(sql,[newcontact],function (err,results) {
//var newcontact={ID:req.body.ID,FNAME:req.body.FNAME,LNAME:req.body.LNAME,TOWN:req.body.TOWN};
//var sql="insert into person(ID,FNAME,LNAME,TOWN) values(?,?,?,?)";
//con.query(sql,[newcontact.ID,newcontact.FNAME,newcontact.LNAME,newcontact.TOWN],function (err,results) {
    if(err) throw err;
    else
    {
        console.log("inserted");
        res.send(results);
    }
});
});
router.delete('/contact/:id',(req,res,next)=>{
var ID=req.params.id;
var sql="delete from person where ID=?";
con.query(sql,[ID],function (err,results) {
    if(err) throw err;
    else
    {
        res.send("deleted");
    }
});
});*/
module.exports=router;