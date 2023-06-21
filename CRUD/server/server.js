const express= require(`express`);
const app=express();
app.use(express.json());

const cors=require(`cors`);
app.use(cors());

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//DB connection
const mysql=require(`mysql2`);
const connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'crud'
})
//api
app.get('/',(req,res,next)=>{
   //insert data from api/////////


    // const insertData ="INSERT INTO employee (name,email,post) VALUES ('pranto','pranto@gmail.com','manger')";
    // connection.query(insertData,(error,result)=>{
    //     console.log(`error`,error)
    //     console.log(`result`,result)
    //     res.send(`home `)
    // })   
    res.send(`home page`)
})

app.get("/api/elist",(req,res,next)=>{
    //fetchData from database


    const fetchData="SELECT * FROM employee";
    connection.query(fetchData,(error,result)=>{
        //console.log("error",error);
        res.send(result);
    })
})
//add employee api
app.post("/api/eadd",(req,res,next)=>{
    const {name,email,post}=req.body;
    const insertData="INSERT INTO employee (name,email,post) VALUES(?,?,?)"
    connection.query(insertData,[name,email,post],(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(`edd`)
    })
})
//delete employee api
app.delete("/api/remove/:id",(req,res,next)=>{
    const {id}=req.params
    const deleteData="DELETE FROM employee WHERE   id=?"
    connection.query(deleteData,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(`edelete`)
    })
})
// view employee api
app.get("/api/elist/:id",(req,res,next)=>{
    const {id}=req.params;
    const viewData ="SELECT * FROM employee WHERE id=?"
    
    connection.query(viewData,id,(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})
//update employe api
 app.put("/api/update/:id",(req,res,next)=>{
    const {id}=req.params;
    const {name,email,post}=req.body;
    const updateData="UPDATE employee SET name=?, email=? ,post=? WHERE id=?"
    connection.query(updateData,[name,email,post,id],(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(`eupdate`)
    })
})

//port 
const port=process.env.PORT|| 5000;
app.listen(port,()=>{
    console.log(`server is running ${port}`);
});