const { response } = require("express");
const mysql = require("mysql");
const data_export = require("json2csv").Parser;


const con=mysql.createPool({
    host : process.env.Host,
    user : process.env.User,
    password : process.env.Pass,
    database: process.env.Name
});




exports.view=(req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err
        connection.query("SELECT * FROM employee",(err,rows) => {
            connection.release();
            if(!err){
                res.render("home",{rows});
            }else{
                console.log("error in listing data"+err);
            }
        });
    
    });
};

exports.addemp=(req,res) => {
    res.render("addemp");
}

exports.save=(req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err

        const {name,email,mobile,location}=req.body

        connection.query("INSERT INTO employee (Name,Email,Mobile,Location) VALUES (?,?,?,?)",[name,email,mobile,location],(err,rows) => {
            connection.release();
            if(!err){
                res.render("addemp",{mesg:"Details Added"});
            }else{
                console.log("error in listing data"+err);
            }
        });
    
    });
    
}

exports.editemp=(req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err
        //get ID from url
        let id=req.params.id;

        connection.query("SELECT * FROM employee where ID=?",[id],(err,rows) => {
            connection.release();
            if(!err){
                res.render("editemp",{rows});
            }else{
                console.log("error in listing data"+err);
            }
        });
    
    });
};

exports.edit=(req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err

        const {name,email,mobile,location}=req.body;
        let id=req.params.id;


        connection.query("UPDATE employee SET Name=?,Email=?,Mobile=?,Location=? WHERE ID=?",[name,email,mobile,location,id],(err,rows) => {
            connection.release();
            if(!err){
                con.getConnection((err,connection) => {
                    if(err) throw err
                    //get ID from url
                    let id=req.params.id;
            
                    connection.query("SELECT * FROM employee where ID=?",[id],(err,rows) => {
                        connection.release();
                        if(!err){
                            
                            res.render("editemp",{rows,mesg:"Details Updated"});
                        }else{
                            console.log("error in listing data"+err);
                        }
                    });
                
                });
            };
            
        });
    
    });
    
}



exports.delete=(req,res) => {
    con.getConnection((err,connection) => {
      if(err) throw err
      let id=req.params.id;
      connection.query("DELETE FROM employee WHERE ID=?",[id],(err,rows) => {
        connection.release();
        if(!err) {
            res.redirect("/");
        }else{
            console.log(err);
        }
      });
    });
};

exports.download=(req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err
        connection.query("SELECT * FROM employee", function(error, rows){
            res.render("home",{rows});
        });
    });
    
}

exports.download=(req,res) => {
    connection.query("SELECT * FROM employee",function(err,rows){
        var mysql_data = JSON.parse(JSON.srtingyfy(data));
        //convert json to csv
        var file_header = ['ID','NAME','EMAIL','MOBILE','LOCATION'];
        var json_data = new data_export({file_header});
        var csv_data = json_data.parse(mysql_data);
        response.setHeader("Content-Type", "text/csv");
        response.setHeader("Content_Disposition", "attachment:filename=employee.csv");
        response.status(200).end(csv_data);

    });

}

    
