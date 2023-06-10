const express=require('express')
const userController=require('../Controllers/user_controller')

const userRouter=express.Router()

userRouter.post('/create-user',userController.CreateCustomer)
userRouter.get('/login',userController.loginCustomer)
userRouter.put('/update/:id',userController.updateCustomer)
userRouter.delete('/delete/:id',userController.deleteCustomer)


module.exports=userRouter