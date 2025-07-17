const express = require('express');
const app = express();
const porta = 3000;
const rotaResultado = app.route("/resultado")
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Página Inicial
app.get('/', (req, res) =>{
    res.render("index")
})

rotaResultado.get((req, res) => {
    res.redirect('/')
})

rotaResultado.post((req, res) =>{
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
    let operacao = req.body.operacao
    let total

    if(operacao == "+") {
        total = num1+num2
    }
    else if(operacao == "-") {
        total = num1-num2
    }
    else if(operacao == "*") {
        total = num1*num2
    }
    else if(operacao == "/") {
        total = num1/num2
    }
    else{
        res.render("/erro")
    }
    res.render("resultado", {total})
})


app.listen(porta,()=>{
    console.log(`Servidor rodando na porta http://localhost:${porta}`);
})
