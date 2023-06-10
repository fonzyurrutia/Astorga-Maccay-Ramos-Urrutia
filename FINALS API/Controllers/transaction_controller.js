const database= require(`../Models/connection_model`)
const transactionModel = require(`../Models/transaction_model`)

const CreateTransaction = (req, res, next)=>{
    let userID = req.body.user_ID
    let prodID = req.body.prod_ID

    if(userID === ""     || userID === null||
       prodID === ""     || prodID === null)
    {
        res.status(404)({
            successful:false,
            message: "Invalid information provided"
        })  
    }
    else{
        let insertQuery = `INSERT INTO transaction_tbl SET ? ` //assume kolang yung user_table
        let transaction= transactionModel.transactionModel(userID,prodID)
        database.db.query
        (insertQuery,transaction,(err,rows,result)=>
            {
                if(err)
                {
                  res.status(500).json({
                      successful: false,
                      message: err
                  })
              }
                else
                {
                  res.status(200).json({
                      successful: true,
                      message:"Transaction view successfully!"
                  })
              }
            }
        )
    }
}

const deleteTransaction = (req, res, next) => {
    let transactionID = req.params.transactionID;

    if (transactionID == "" || transactionID == null) {
        res.status(404).json({
            successful: false,
            message: "Invalid Transaction ID"
        });
    } else {
        let query = `SELECT trans_ID FROM transaction_tbl WHERE trans_ID = ${transactionID}`;
        database.db.query(query, (err, rows, result) => {
            if (err) {
                res.status(500).json({
                    successful: false,
                    message: err
                });
            } else {
                if (rows.length > 0) {
                    let deleteQuery = `DELETE FROM transaction_tbl WHERE trans_ID = ${transactionID}`;
                    database.db.query(deleteQuery, (err, rows, result) => {
                        if (err) {
                            res.status(500).json({
                                successful: false,
                                message: err
                            });
                        } else {
                            res.status(200).json({
                                successful: true,
                                message: "Successfully deleted Transaction"
                            });
                        }
                    });
                } else {
                    res.status(404).json({
                        successful: false,
                        message: "Transaction not found"
                    });
                }
            }
        });
    }
};


module.exports ={
    CreateTransaction,
    deleteTransaction
}

