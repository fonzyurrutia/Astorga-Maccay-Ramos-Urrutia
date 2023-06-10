//THIS IS OUR MIDDLEWARE

//IMPORT OUR DEPENDENCIES
const express=require('express')
const app=express()
const morgan=require('morgan')
const bodyParser=require('body-parser')
//THIS IS WHERE WE WILL PLACE THE DB CONNECTION
const db=require("./FINALS API/Models/connection_model")
db.connectDatabase()
//THIS IS WHERE WE WILL PLACE OUR ROUTERS
const product_router=require('./FINALS API/Router/product_router')
const user_router=require('./FINALS API/Router/user_router')
const employee_router=require('./FINALS API/Router/employee_router')
const transaction_router=require('./FINALS API/Router/transaction_router')
//DEFINE SETTING FOR BODY-PARSER AND MORGAN
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//define header settings
app.use
((req, res, next)=>
    {
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Headers","*")

        if (req.method==='OPTIONS')
        {
            res.header("Access-Control-Allow-Methods","*")
            return res.status(200).json({})
        }

        next()
    }
)

//DEFINE OUR MODULE ENDPOINT PLUS THE ROUTER
app.use('/product',product_router)
app.use('/customer',user_router)
app.use('/employee',employee_router)
app.use('/transaction',transaction_router)
//ERROR MIDDLEWARE

app.use
((req, res, next)=>
    {
        const error=new Error('Not found')
        error.status=404
        next(error)
    }
)

app.use
((error, req, res, next)=>
    {
        res.status(error.status||500)
        res.json
        (
            {
                error:
                {
                    message: error.message
                }
            }
        )
    }
)

module.exports=app
