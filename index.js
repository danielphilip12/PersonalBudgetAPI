const express = require("express");
const { v4: uuidV4} = require("uuid");

const app = express()

app.use(express.json());

// Global Variables
const envelopes = [];
// End Global Variables

app.get("/testRoute", (req, res) => {
    return res.status(200).json({message: "success", input: req.body});
});

app.get("/envelope", (req, res) => {
    return res.status(200).json({envelopes: envelopes})
})

app.get('/envelope/:id', (req, res) => {
    const { id } = req.params;
    const envelope = envelopes.filter(envelope => envelope.id == id)[0];
    return res.status(201).json({envelope})
})

app.post("/envelope", (req, res) => {
    let { name, budget } = req.body;
    budget = Number.parseInt(budget)
    const id = uuidV4();
    envelopes.push({id, name, budget, currentBalance: budget});
    return res.status(202).json({message: `Added ${name} envelope`})
})

app.post("/envelope/:id/extract", (req, res) => {
    const { id } = req.params;
    const { amountToExtract } = req.body;

    const envelopeIndex = envelopes.findIndex(envelope => envelope.id == id);
    if(envelopeIndex === -1) {
        return res.status(404).json({"message": "envelope not found"})
    }
    
    const envelope = envelopes[envelopeIndex]

    if (amountToExtract > envelope.currentBalance) {
        return res.status(403).json({message: `Attempting to extract more money than available. Current amount available: ${envelope.currentBalance}`})
    }

    envelope.currentBalance -= amountToExtract;
    return res.status(202).json({message: `Extracted ${amountToExtract} from budget ${envelope.name}. Remaining Balance ${envelope.currentBalance}`})
})

app.delete("/envelope/:id", (req, res) => {
    const { id } = req.params;

    const envelopeIndex = envelopes.findIndex(envelope => envelope.id == id);
    if(envelopeIndex === -1) {
        return res.status(404).json({"message": "envelope not found"})
    }

    envelopes.splice(envelopeIndex, 1);

    return res.status(204).json({"message": "envelope deleted"})
})

app.post("/envelopes/transfer/:fromId/:toId", (req, res) => {
    const {fromId, toId} = req.params;
    const { amount } = req.body;

    const fromEnvelopeIndex = envelopes.findIndex(envelope => envelope.id == fromId);
    if(fromEnvelopeIndex === -1) {
        return res.status(404).json({"message": "from envelope not found"})
    }

    const toEnvelopeIndex = envelopes.findIndex(envelope => envelope.id == toId);
    if(toEnvelopeIndex === -1) {
        return res.status(404).json({"message": "to envelope not found"})
    }

    const fromEnvelope = envelopes[fromEnvelopeIndex];
    const toEnvelope = envelopes[toEnvelopeIndex];

    if (amount > fromEnvelope.currentBalance) {
        return res.status(403).json({"message": `attempting to transfer more than available. Current available balance: ${fromEnvelope.currentBalance}`})
    }

    fromEnvelope.currentBalance -= amount;
    toEnvelope.currentBalance += amount;

    return res.status(202).json({"message": "transfer complete"})

})

app.listen(3000, () => {
    console.log("listening on port 3000");
    
})