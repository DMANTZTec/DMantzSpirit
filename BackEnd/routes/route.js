const express=require('express');
var mysql=require('mysql');
var router=express.Router();
var con = mysql.createConnection({
    host: "localhost",
    port:"3306",
    user: "shanti",
    password: "secret",
    database:"dmantz_spirit"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
router.post('/login',function(req,res,next)
{
    var request = req.body;
console.log(request);
var email = request.email;
var password = request.password;
var select = 'SELECT * FROM registeredusers WHERE email = ? limit 1';
con.query(select, [email], function (error, results)
{
    if (error)
    {
        console.log("error occurred");
        res.send({
            "code": 400, "failed": error
        });
    }
    else
    {
        console.log('The solution is', results);
        if (results.length > 0)
        {
            console.log(results[0].password);
            if ((results[0].password) == password)
            {
                var status={"status":"login success"};
                var insert_stmt = 'INSERT INTO loggedinusers(email) SELECT * FROM (SELECT ?) ' +
                    'AS tmp WHERE NOT EXISTS(SELECT email FROM loggedinusers WHERE email = ?)';
                con.query(insert_stmt,[email,email],function (error, results) {
                    if(error) throw error;
                    else{
                        console.log("inserted into loggedinusers");
                    }
                });
                req.session.sessionid=email;
                req.session.cookie.maxAge=3000;
                console.log(status);
                res.send(status);
            }
            else
            {
                var status={"status":"password incorrect"};
                console.log(status);
                res.send(status);
            }
        }
        else
        {
            if (results.length == 0)
            {
                var status={"status":"email not exists"};
                console.log(status);
                res.send(status);
            }
        }
    }
});

});


router.get('/mywork',(req,res,next)=>
{
    var select="select * from mywork";
    con.query(select,function (err,results)
    {
    if(err) throw err;
    else
    {
        res.send(results);
        //console.log(results);
    }
});
});

router.post('/insertmywork',(req,res,next)=>
{
    var request = req.body;
    console.log(request);
    if(request.SUBJECT_NM) {
        var MYWORK_TYPE="TOPIC";
        var insert = "insert into mywork(MYWORK_TYPE,EMPLOYEE_NM,SUBJECT_NM,TOPIC_ID,TOPIC_NM," +
            "TOPIC_START_DT,TOPIC_END_DT,ESTIMATED_TIME,ACTUAL_TIME) values(?,?,?,?,?,?,?,?,?)";
        con.query(insert, [MYWORK_TYPE,request.EMPLOYEE_NM, request.SUBJECT_NM,
            request.TOPIC_ID, request.TOPIC_NM,
            request.TOPIC_START_DT, request.TOPIC_END_DT,
            request.ESTIMATED_TIME, request.ACTUAL_TIME], function (err, results) {
            if (err) throw err;
            else {
                res.send({"success": "success"});
                console.log(results);
            }
        });
    }
    else if(request.PROJECT_NM){
        var MYWORK_TYPE="PROJECT TASK";
        var insert = "insert into mywork(MYWORK_TYPE,EMPLOYEE_NM,SUBJECT_NM,TOPIC_ID,TOPIC_NM," +
            "TOPIC_START_DT,TOPIC_END_DT,ESTIMATED_TIME,ACTUAL_TIME) values(?,?,?,?,?,?,?,?,?)";
        con.query(insert, [MYWORK_TYPE,request.EMPLOYEE_NM, request.PROJECT_NM,
            request.TASK_ID, request.TASK_NM,
            request.TASK_START_DT, request.TASK_END_DT,
            request.ESTIMATED_TIME, request.ACTUAL_TIME], function (err, results) {
            if (err) throw err;
            else {
                res.send({"success": "success"});
                console.log(results);
            }
        });
    }
});

router.post('/updatemywork',(req,res,next)=>
{
    var request = req.body.editdetails;
    console.log(request);
    var current=req.body.currentdetails;
var update="update mywork set EMPLOYEE_NM=?,SUBJECT_NM=?,TOPIC_ID=?,TOPIC_NM=?,TOPIC_START_DT=?,TOPIC_END_DT=?,ESTIMATED_TIME=?,ACTUAL_TIME=? where EMPLOYEE_NM=? AND TOPIC_ID=?";
con.query(update,[request.EMPLOYEE_NM,request.SUBJECT_NM,
    request.TOPIC_ID,request.TOPIC_NM,
    request.TOPIC_START_DT,request.TOPIC_END_DT,
    request.ESTIMATED_TIME,request.ACTUAL_TIME,current.EMPLOYEE_NM,current.TOPIC_ID],function (err,results)
{
    if(err) throw err;
    else
    {
        res.send({"success":"updated successfully"});
        console.log(results);
    }
});
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