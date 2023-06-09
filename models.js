const { mongoose } = require("mongoose");

const BankSchema = new mongoose.Schema({
    id: {
        type :Number,
        require :true,
    },
    type: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    accountno: {
        type: Number,
        require: true,
        unique: true
    },
    balance: {
        type: Number,
        require: true
    }
});

const CheckingAccount = mongoose.model("CheckingAccount", BankSchema);
const SavingAccount = mongoose.model("SavingAccount", BankSchema);
const LoanAccount = mongoose.model("LoanAccount", BankSchema);

module.exports = { CheckingAccount, SavingAccount, LoanAccount };