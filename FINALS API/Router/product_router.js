 const express=require('express')
 const admin_prod_control=require('../Controllers/admin_prod_control')

 const productrouter=express.Router()

 productrouter.post('/create-product',admin_prod_control.CreateProduct)
 productrouter.put('/update/:id',admin_prod_control.updateProduct)
 productrouter.delete('/delete/:id',admin_prod_control.deleteProduct)


 module.exports=productrouter