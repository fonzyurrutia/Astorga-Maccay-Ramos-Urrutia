const express=require('express')
const employeeController=require('../Controllers/admin_user_controller')

const employeeRouter=express.Router()

employeeRouter.post('/create-employee',employeeController.CreateEmployee)
employeeRouter.get('/login',employeeController.loginEmployee)
employeeRouter.delete('/delete/:id',employeeController.deleteCustomer)


module.exports=employeeRouter