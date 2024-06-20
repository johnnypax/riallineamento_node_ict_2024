// Importa i pacchetti
const express = require("express");
const bodyParser = require("body-parser");

// Avvia la applicazione
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// Determina l'accesso
const host = "127.0.0.1";
const port = 4000;

// Database Mock
let eventi = [
    {
        "codice": "evto1",
        "nome": "viva",
        "descrizione": "evento per la vita",
        "data": "26/04/2024",
        "location": "lanciano hall",
        "partecipanti": 0
    },
    {
        "codice": "evto2",
        "nome": "festa san giovanni",
        "descrizione": "evento per san giovanni",
        "data": "24/06/2024",
        "location": "cruz das almas",
        "partecipanti": 3
    }
]

app.listen(port, host, () => {
    console.log("Sono in ascolto nella porta: ", port);
})

//Endpoint
app.get("/events", (req, res) => {
    res.json({
        status: "SUCCESS",
        data: eventi
    })
})

app.get("/events/:cod", (req, res) => {
    let varCod = req.params.cod;

    for(let [idx, item] of eventi.entries()){
        if(item.codice == varCod){
            res.json({
                status: "SUCCESS",
                data: item
            })
            return;
        }
    }

    res.json({
        status: "ERROR",
        data: "Oggetto non trovato"
    })
})

app.post("/events", (req, res) => {
    let evento = {
        "codice": "evto" + (eventi.length + 1),
        "nome": req.body.nome,
        "descrizione": req.body.descrizione,
        "data": req.body.data,
        "location": req.body.location,
        "partecipanti":req.body.partecipanti
    }
    eventi.push(evento);

    res.json({
        "status": "SUCCESS"
    });
})


app.delete("/events/:cod", (req, res) => {
    let varCod = req.params.cod;

    for(let [idx, item] of eventi.entries()){
        if(item.codice == varCod){
            eventi.splice(idx, 1)

            res.json({
                status: "SUCCESS"
            })
            return;
        }
    }

    res.json({
        status: "ERROR",
        data: "Oggetto non trovato"
    })
})

//UPDATE 24

app.get("/events/:cod/:tipo", (req, res) => {
    let varCod = req.params.cod;
    let varTip = req.params.tipo;

    switch(varTip){
        case "INC":
            for(let [idx, item] of eventi.entries()){
                if(item.codice == varCod){
                    item.partecipanti++;
        
                    res.json({
                        status: "SUCCESS"
                    })
                    return;
                }
            }
            break;
        case "DEC":
            for(let [idx, item] of eventi.entries()){
                if(item.codice == varCod){
                    if(item.partecipanti > 0){
                        item.partecipanti--;

                        res.json({
                            status: "SUCCESS"
                        })
                        return;
                    }
                    else{
                        res.json({
                            status: "ERROR",
                            data: "Partecipanti assenti"
                        })
                    }
                    
                }
            }
            break;
        default:
            res.json({
                status: "ERROR",
                data: "COMANDO NON RICONOSCIUTO"
            })
            break;
    }
})