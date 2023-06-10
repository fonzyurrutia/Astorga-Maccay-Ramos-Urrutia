const express=require('express')
const transactionController=require('../Controllers/transaction_controller')

const transaction_router=express.Router()


transaction_router.post('/create-transaction',transactionController.CreateTransaction)
transaction_router.delete('/delete/:transactionID',transactionController.deleteTransaction)


module.exports=
transaction_router