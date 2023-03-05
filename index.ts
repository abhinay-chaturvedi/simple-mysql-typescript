

import express,{Request,Response} from "express"
import mysql from "mysql"
import { title } from "process";

const app =express();
app.use(express.json());
// created an connection with mysql server
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'chaturvedi', 
    database: 'test',
})
// db connection with my sql server
db.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }else{
        console.log("database connected");
    }
})
// get request book api
app.get("/",(req:Request,res:Response)=>{
    const q:string="SELECT * FROM books"

    db.query(q,(err,result)=>{
        if(err){
            res.status(500).json(err);
        }
        else res.status(200).json(result);
    })

})
// POST
app.post("/",(req:Request,res:Response)=>{

    const q:string= "INSERT INTO books(`id`, `title`, `desc`, `cover`) VALUES (?)";
    console.log(req.body)
    const v=[
        req.body.id,
        req.body.title,
        req.body.desc,
        req.body.cover
      ];
    db.query(q, [v],(err,result)=>{
        console.log("post error")
        if(err)res.status(500).json(err);
        else
         res.status(200).json(result);
      })
})
// PUT
app.put("/:id",(req:Request,res:Response)=>{
    
    const q:String= "UPDATE books SET  `title`= ?, `desc`= ?,  `cover`= ? WHERE id = ?";
    const v=[
     
        req.body.title,
        req.body.desc,
        req.body.cover
      ];
    db.query(q, [...v,req.params.id],(err,result)=>{
        console.log("post error")
        if(err)res.status(500).json(err);
        else
         res.status(200).json(result);
      })
})
// DELETE
app.delete("/:id",(req:Request,res:Response)=>{
    const q:string = " DELETE FROM books WHERE id = ? ";
    db.query(q, [req.params.id],(err,result)=>{
        console.log("post error")
        if(err)res.status(500).json(err);
        else
         res.status(200).json(result);
      })
})

app.listen(8800,()=>{
    // db.connect()
    console.log("server is listenig on port 8800")
})
