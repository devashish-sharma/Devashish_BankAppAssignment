const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const { CheckingAccount, SavingAccount, LoanAccount } = require('./models');

const port = 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//connection String
mongoose.connect("mongodb://0.0.0.0:27017/BankApp",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DataBase Connected");
    });

//testing Purpose
app.get("/accounts", async (req, res) => {
    const checkingbank = await CheckingAccount.find();
    const savingBank = await SavingAccount.find();
    return res.status(200).json(("Checking Bank " + checkingbank + " Saving Bank " + savingBank));
})

//Create New Checking Account
app.post("/accounts/checking", async (req, res) => {
    const newBank = new CheckingAccount({ ...req.body });
    if (!newBank) {
        req.status(400).json({ error: 'You are missing with Name of User', status: 400 });
        return;
    }
    console.log(newBank);
    const insertedBank = await newBank.save(newBank);
    res.status(201).json({ insertedBank }, { message: 'Checking Account Created' }, { error: "Errror COmes here" });
})

//Get ALl Checking Accounts
app.get("/accounts/checking", async (req, res) => {
    const allBank = await CheckingAccount.find();
    return res.status(200).json(allBank);
})

// Get Checking Accounts by accountno
app.get("/accounts/checking/:accountno", async (req, res) => {
    const accountno = parseInt(req.params.accountno);
    const existingBank = await CheckingAccount.findOne({ accountno: accountno });
    return res.status(200).json(existingBank);
})

//SAVING ACCOUNT
app.post("/accounts/savings", async (req, res, next) => {

    const newBank = new SavingAccount({ ...req.body });
    if (!newBank) {
        req.status(400).json({ error: 'You are missing with Name of User', status: 400 });
        return;
    }
    console.log(newBank);
    const insertedBank = await newBank.save(newBank);
    res.status(201).json({ insertedBank }, { message: 'Checking Account Created' }, { error: "Errror Comes here" });
})

//Get ALl Saving Accounts
app.get("/accounts/savings", async (req, res) => {
    const allBank = await SavingAccount.find();
    return res.status(200).json(allBank);
})

// Get Saving Accounts by ID
app.get("/accounts/savings/:accountno", async (req, res) => {
    const accountno = parseInt(req.params.accountno);
    const existingBank = await SavingAccount.findOne({ accountno: accountno });
    console.log(existingBank)
    return res.status(200).json(existingBank);
})

//Deposit Amount to account for CHECKING ACCOUNT
app.put("/accounts/checking/:id/deposit/", async (req, res) => {
    const id = parseInt(req.params.id);
    const checkingaccount = await CheckingAccount.findOne({ id: id });
    const amount = parseInt(checkingaccount.balance);
    const updatevalue = amount + req.body.balance;
    try {
        await CheckingAccount.updateOne({ id: id }, { balance: updatevalue })
        return res.status(200).json({ msg: 'Amount Deposited into Checking Account Sucessful.' })
    } catch (error) {
        return res.status(500).json({ msg: 'Error while Updating Value' })
    }
})

//Withdrawn Amount to account for CHECKING ACCOUNT
app.put("/accounts/checking/:id/withdraw/", async (req, res) => {
    const id = parseInt(req.params.id);
    const checkingaccount = await CheckingAccount.findOne({ id: id });
    const amount = parseInt(checkingaccount.balance);
    const updatevalue = amount - req.body.balance;
    try {
        await CheckingAccount.updateOne({ id: id }, { balance: updatevalue })
        return res.status(200).json({ msg: 'Amount Withdrawn Sucessful.' })
    } catch (error) {
        return res.status(500).json({ msg: 'Error while Updating Value' })
    }
})

//Deposit Amount to account for SAVING ACCOUNT
app.put("/accounts/savings/:id/deposit/", async (req, res) => {
    const id = parseInt(req.params.id);
    const savingaccount = await SavingAccount.findOne({ id: id });
    const amount = parseInt(savingaccount.balance);
    const updatevalue = amount + req.body.balance;
    try {
        await SavingAccount.updateOne({ id: id }, { balance: updatevalue })
        return res.status(200).json({ msg: 'Successfully Updated.' })
    } catch (error) {
        return res.status(500).json({ msg: 'Error while Updating Value' })
    }
})

//Withdrawn Amount to account for SAVING ACCOUNT
app.put("/accounts/saving/:id/withdraw/", async (req, res) => {
    const id = parseInt(req.params.id);
    const savingaccount = await SavingAccount.findOne({ id: id });
    const amount = parseInt(savingaccount.balance);
    const updatevalue = amount - req.body.balance;
    try {
        await SavingAccount.updateOne({ id: id }, { balance: updatevalue })
        return res.status(200).json({ msg: 'Amount Withdrawn Sucessful.' })
    } catch (error) {
        return res.status(500).json({ msg: 'Error while Updating Value' })
    }
})

//Apply for the Loan
app.post("/accounts/checking", async (req, res) => {
    const newBank = new CheckingAccount({ ...req.body });
    if (!newBank) {
        req.status(400).json({ error: 'You are missing with Name of User', status: 400 });
        return;
    }
    console.log(newBank);
    const insertedBank = await newBank.save(newBank);
    res.status(201).json({ insertedBank }, { message: 'Checking Account Created' }, { error: "Errror COmes here" });
})

//Apply for the Loan
app.post("/loans", async (req, res) => {
    const loanBank = new LoanAccount({ ...req.body });

    
    
    if (!loanBank) {
        req.status(400).json({ error: 'You are missing Something', status: 400 });
        return;
    }
    console.log(loanBank);
    const loanAc = await loanBank.save(loanBank);
    res.status(201).json(loanAc);
})

//List All Loan Accounts
app.get("/loans", async (req, res) => {
    const allBank = await LoanAccount.find();
    return res.status(200).json(allBank);
})

//running server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});