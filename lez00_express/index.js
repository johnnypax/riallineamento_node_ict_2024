const express = require("express");
const bodyParser = require('body-parser')

const app = new express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const host = "127.0.0.1";
const port = 4000;

app.listen(port, host, () => {
    console.log("Server in ascolto!")
})

let elenco = [
    {
        nome: "Il signore degli agnelli",
        autore: "JRRT",
        isbn: "1234-1234-1234",
        prezzo: 12.5
    },
    {
        nome: "Harry Poster",
        autore: "JKR",
        isbn: "1234-1234-1235",
        prezzo: 18.5
    }
];

// http://127.0.0.1:4000/lista
app.get("/lista", (req, res) => {
    res.json(elenco);
})

// http://127.0.0.1:4000/dettaglio/1234-1234-1234
app.get("/dettaglio/:isbnDaCercare", (req, res) => {
    let varIsbn = req.params.isbnDaCercare;
    
    for(let [idx, item] of elenco.entries()){
        if(item.isbn == varIsbn){
            res.json(item)
        }
    }

    res.json({
        status: "ERRORE"
    })
})

app.post("/inserisci", (req, res) => {
    let nuovoLibro = {
        nome: req.body.nome,
        autore: req.body.autore,
        isbn: req.body.isbn,
        prezzo: req.body.prezzo
    }

    console.log(nuovoLibro);

    elenco.push(nuovoLibro);

    res.json(
        {status: "STAPPOOOOOOO"}
    )
})

app.delete("/elimina/:isbnDaEliminare", (req, res) => {
    let varIsbn = req.params.isbnDaEliminare;

    for(let [idx, item] of elenco.entries()){
        if(item.isbn == varIsbn){
            elenco.splice(idx, 1)
            res.json(
                {status: "STAPPOOOOOOOO"}
            )
        }
    }

    res.json(
        {status: "ERRORE"}
    )
})

app.put("/modifica/:isbnDaModificare", (req, res) => {

    let varIsbn = req.params.isbnDaModificare;

    for(let [idx, item] of elenco.entries()){
        if(item.isbn == varIsbn){
            item.nome = req.body.nome ? req.body.nome : item.nome;
            item.autore = req.body.autore ? req.body.autore : item.autore;
            item.prezzo = req.body.prezzo ? req.body.prezzo : item.prezzo;

            res.json(
                {status: "STAPPOOOOOOOO"}
            )
        }
    }

    res.json(
        {status: "ERRORE"}
    )
})