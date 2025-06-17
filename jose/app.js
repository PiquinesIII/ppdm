const express = require("express");
const app = express();
const porta = 3000

app.set("view engine","ejs")

app.get("/", (req,res)=> {
  res.render("conta")  
})
app.get("/resposta", (req,res)=> {
    let num = Number(req.query.num)
    let total = num**2
    res.render("resposta", {total})  
  })

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta http://localhost:${porta}`)
})
