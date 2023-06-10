const database=require('../Models/connection_model')
const userModel=require('../Models/user_model')

const CreateCustomer=(req,res,next)=>
{
    let customerName=req.body.customer_name;
    let customerContact=req.body.customer_contact;
    let customerAddress=req.body.customer_address;
    let customerUsername=req.body.customer_username;
    let customerPassword=req.body.customer_password;

    if(customerName==""||customerName==null||customerContact==""||customerContact==null||customerAddress==""||customerAddress==null||customerUsername==""||customerUsername==null||customerPassword==""||customerPassword==null)
    {
        res.status(404).json
        (
            {
                successful: false,
                message:"Invalid information provided"
            }
        )
    }

    else
    {
     let query=`SELECT Customer_Name FROM customer_tbl WHERE Customer_Name='${customerName}'`

        database.db.query
        (query,(err,rows,results)=>
            {
                if(err)
                {
                    res.status(500).json
                    (
                        {
                            successful: false,
                            message: err
                        }
                    )
                }

                else
                {
                    if(rows.length>0)
                    {
                        res.status(400).json
                        (
                            {
                                successful: false,
                                message: "Customer already exist"
                            }
                        )
                    }
                    else
                    {
                        let insertQuery=`INSERT INTO customer_tbl SET ?`
                        let productObj= userModel.user_model(customerName,customerContact,customerAddress,customerUsername,customerPassword)

                        database.db.query
                        (insertQuery,productObj,(err,rows,result)=>
                            {
                                if(err)
                                {
                                    res.status(500).json
                                    (
                                        {
                                            successful: false,
                                            message: err
                                        }
                                    )
                                }
                                else
                                {
                                    res.status(200).json
                                    (
                                        {
                                            successful: true,
                                            message: "Successfully created customer"
                                        }
                                    )
                                }
                            }
                        )
                    }
                }
            }
        )
    }
}

const loginCustomer=(req,res,next)=>{

  let customerUsername=req.body.customer_username;
  let customerPassword=req.body.customer_password;

  if( (customerUsername==""||customerUsername==null) ||(customerPassword==""||customerPassword==null))
  {
      res.status(404).json
      (
          {
              successful: false,
              message:"Invalid information provided"
          }
      )
  }

  else
  {
      let query=`SELECT username, password FROM customer_tbl WHERE username='${customerUsername}'`

      database.db.query
      (query,(err,rows,results)=>
          {
              if(err)
              {
                res.status(500).json
                (
                    {
                        successful: false,
                        message:err
                    }
                )
              }
              else
              {
                  if(rows.length==0)
                  {
                    res.status(404).json
                    (
                        {
                            successful: false,
                            message:"Invalid information provided"
                        }
                    )
                  }
                  else if(rows.length == 1)
                  {
                      if(rows[0].password == customerPassword)
                      {
                        res.status(404).json
                        (
                            {
                                successful: true,
                                message:"Successfully Log in"
                            }
                        )
                    }
                      else
                      {
                        res.status(400).json
                        (
                            {
                                successful: false,
                                message:"You Entered the wrong username/password"
                            }
                        )
                      }
                  }
                  else
                  {
                    res.status(400).json
                    (
                        {
                            successful: false,
                            message:"Multiple Employee Found"
                        }
                    )
                  }
              }
          }
      )
  }
}

const updateCustomer = (req, res, next) => {
    let customerID = req.params.id;
    let CustomerName = req.body.customer_name;
    let CustomerContact = req.body.customer_contact;
    let CustomerAddress = req.body.customer_address;
    let CustomerPassword = req.body.customer_password;
  
    if (CustomerPassword === "" || CustomerPassword === null) {
      res.status(400).json({
        successful: false,
        message: "Information provided is invalid",
      });
    } else if (
      (CustomerName === "" || CustomerName === null) &&
      (CustomerContact === null || CustomerContact === "") &&
      (CustomerAddress === null || CustomerAddress === "")
    ) {
      res.status(400).json({
        successful: false,
        message: "You did not change anything",
      });
    } else {
      let query = `SELECT Customer_ID, Customer_Name, Customer_Contact, address, password FROM customer_tbl WHERE Customer_ID = ${customerID}`;
  
      database.db.query(query, (err, rows, result) => {
        if (err) {
          res.status(500).json({
            successful: false,
            message: err,
          });
        } else {
          if (rows.length === 1) {
            if (rows[0].password !== CustomerPassword) {
              res.status(400).json({
                successful: false,
                message: "You entered the wrong password",
              });
            } else {
              let updateQuery = `UPDATE customer_tbl SET`;
              let hasPrecedence = false;
  
              if (CustomerName !== null && CustomerName !== "") {
                updateQuery += ` Customer_Name = '${CustomerName}'`;
                hasPrecedence = true;
              }
  
              if (CustomerContact !== null && CustomerContact !== "") {
                updateQuery +=
                  (hasPrecedence ? "," : "") +
                  ` Customer_contact = '${CustomerContact}'`;
                hasPrecedence = true;
              }
  
              if (CustomerAddress !== null && CustomerAddress !== "") {
                updateQuery +=
                  (hasPrecedence ? "," : "") +
                  ` address = '${CustomerAddress}'`;
              }
  
              updateQuery += ` WHERE Customer_ID = ${customerID}`;
  
              database.db.query(updateQuery, (err, rows, result) => {
                if (err) {
                  res.status(500).json({
                    successful: false,
                    message: err,
                  });
                } else {
                  res.status(200).json({
                    successful: true,
                    message: "Successfully changed information",
                  });
                }
              });
            }
          } else {
            res.status(400).json({
              successful: false,
              message: "Customer does not exist",
            });
          }
        }
      });
    }
  };

const deleteCustomer=(req,res,next)=>
{
    let id=req.params.id

    if(id==""||id==null)
    {
      res.status(404).json
      (
          {
              successful: false,
              message:"Invalid information provided"
          }
      )
    }
    else
    {
        let query=`SELECT Customer_ID FROM customer_tbl WHERE Customer_Id=${id}`

        database.db.query
        (query,(err,row,result)=>
            {
                if(err)
                {
                  res.status(500).json
                  (
                      {
                          successful: false,
                          message:err
                      }
                  )
                }
                else
                {
                    if(row.length>0)
                    {
                        let deleteQuery=`DELETE FROM customer_tbl WHERE Customer_ID=${id}`
                        database.db.query
                        (deleteQuery,(err,rows,result)=>
                            {
                                if(err)
                                {
                                  res.status(500).json
                                  (
                                      {
                                          successful: false,
                                          message:err
                                      }
                                  )
                                }
                                else
                                {
                                  res.status(200).json
                                  (
                                      {
                                          successful: true,
                                          message:"Successfully deleted customer"
                                      }
                                  )
                                }
                            }
                        )
                    }
                    else
                    {
                      res.status(500).json
                      (
                          {
                              successful: false,
                              message:"Invalid information provided"
                          }
                      )
                    }
                }
            }
        )
    }
}

module.exports=
{
    CreateCustomer,
    loginCustomer,
    updateCustomer,
    deleteCustomer
}