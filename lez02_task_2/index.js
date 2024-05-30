const express = require("express")
const bodyParser = require("body-parser")

const app = new express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

const host = "127.0.0.1"
const port = 4000

app.listen(port, host, () => {
    console.log("Sono in ascolto!");
})

//----------------------- MOCK -----------------------

let elencoClienti = [
    {
        nome: "Giovanni",
        cognome: "Pace",
        cod_fis: "PCAGNN",
        data_nas: new Date(1995, 11, 17)
    },
    {
        nome: "Valeria",
        cognome: "Verdi",
        cod_fis: "VLRVRD",
        data_nas: new Date(1999, 10, 18)
    }
];

let elencoPrenotazioni = [
    {
        codicePren: "AB1234",
        stanza: "Peonia",
        inizio: new Date(2024, 5, 10),
        fine: new Date(2024, 5, 15),
        utente: "VLRVRD"
    },
    {
        codicePren: "AB1235",
        stanza: "Simba",
        inizio: new Date(2024, 6, 1),
        fine: new Date(2024, 7, 9),
        utente: "VLRVRD"
    },
    {
        stanza: "Antani",
        codicePren: "AB1236",
        inizio: new Date(2025, 1, 10),
        fine: new Date(2025, 2, 9),
        utente: "PCAGNN"
    },
];

app.get("/utenti", (req, res) => {
    res.json(
        {
            status: "SUCCESS",
            data: elencoClienti
        }
    )
})

// app.get("/utenti/:cf", (req, res) => {

//     let varCf = req.params.cf;

//     for(let [idx, item] of elencoClienti.entries()){
//         if(item.cod_fis == varCf){
//             res.json(
//                 {
//                     status: "SUCCESS",
//                     data: item
//                 }
//             )
//         }
//     }

//     res.json({
//         status: "ERROR",
//         data: "UTENTE NON TROVATO"
//     })
// })

app.get("/utenti/:cf", (req, res) => {

    let varCf = req.params.cf;

    for(let [idx, item] of elencoClienti.entries()){
        if(item.cod_fis == varCf){
            
            item.prenotazioni = []
            for(let [idx, pren] of elencoPrenotazioni.entries())
                if(pren.utente == varCf)
                    item.prenotazioni.push(pren)

            res.json(
                {
                    status: "SUCCESS",
                    data: item
                }
            )
        }
    }

    res.json({
        status: "ERROR",
        data: "UTENTE NON TROVATO"
    })
})

app.post("/utenti", (req, res) => {
    let ute = {
        nome: req.body.nome,
        cognome: req.body.cognome,
        cod_fis: req.body.cod_fis,
        data_nas: new Date(req.body.data_nas)
    }

    for(let [idx, item] of elencoClienti.entries())
        if(item.cod_fis == req.body.cod_fis)
            res.json({
                status: "ERROR",
                data: "CODICE FISCALE PRESENTE IN DATABASE"
            })

    elencoClienti.push(ute);

    res.json({
        status: "SUCCESS",
        data: ""
    })
})

//TODO: Elenco prenotazioni

// app.get("/prenotazioni/:codice", (req, res) => {
//     let varCodice = req.params.codice;

//     for(let [idx, item] of elencoPrenotazioni.entries())
//         if(item.codicePren == varCodice)
//             res.json({
//                 status: "SUCCESS",
//                 data: item
//             })
 
// })

app.get("/prenotazioni/:codice", (req, res) => {
    let varCodice = req.params.codice;

    for(let [idx, item] of elencoPrenotazioni.entries())
        if(item.codicePren == varCodice)
            for(let [idx, ute] of elencoClienti.entries())
                if(ute.cod_fis == item.utente){
                    item.utente = ute
                    res.json({
                        status: "SUCCESS",
                        data: item
                    })
                }

    res.json({
        status: "ERROR",
        data: "Prenotazione non trovata"
    })
})