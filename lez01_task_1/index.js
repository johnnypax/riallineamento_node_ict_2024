const express = require("express")
const bodyparser = require("body-parser")

const app = new express()
app.use(express.json())
app.use(bodyparser.urlencoded({extended: false}))

const host = "127.0.0.1"
const port = 4000

app.listen(port, host, () => {
    // console.log("Sono in ascolto alla porta: " + port);
    console.log(`Sono in ascolto all'indirizzo: http://${host}:${port}`);
})

let elenco = [
    {
        nome: "Vite a stella",
        codice: "VV1234",
        descrizione: "Prova di descrizione",
        prezzo: 0.25,
        quantita: 582,
        categorie: ["Bricolage", "Fai da te"]
    },
    {
        nome: "Giravite",
        codice: "GV908",
        descrizione: "Descrizione avvitata",
        prezzo: 8.5,
        quantita: 32,
        categorie: ["Bricolage"]
    }
]

app.get("/oggetti", (req, res) => {
    res.json(
        {
            status: "SUCCESS",
            data: elenco
        }
    )
})

app.get("/oggetti/:codOgg", (req, res) => {
    let varCodice = req.params.codOgg;

    for(let [idx,item] of elenco.entries()){
        if(item.codice == varCodice){
            res.json(
                {
                    status: "SUCCESS",
                    data: item
                }
            )
        }
    }

    res.json(
        {
            status: "ERRORE",
            data: "OGGETTO NON ESISTENTE"
        }
    )
})

app.post("/oggetti", (req, res) => {
    let nuovoOgg = {
        nome: req.body.nome,
        codice: req.body.codice,
        descrizione: req.body.descrizione,
        prezzo: req.body.prezzo,
        quantita: req.body.quantita,
        categorie: req.body.categorie
    }

    for(let [idx,item] of elenco.entries()){
        if(item.codice == req.body.codice){
            res.json(
                {
                    status: "ERROR",
                    data: "CODICE ESISTENTE"
                }
            )
        }
    }

    elenco.push(nuovoOgg),

    res.json(
        {
            status: "SUCCESS"
        }
    )
})