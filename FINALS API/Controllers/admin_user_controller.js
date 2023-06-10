const database=require('../Models/connection_model')
const EmployeeModel=require('../Models/employee_model')

const CreateEmployee=(req,res,next)=>
{
    let employeeName=req.body.employee_name;
    let employeeUsername=req.body.employee_username;
    let employeePassword=req.body.employee_password;

    if(employeeName==""||employeeName==null||employeeUsername==""||employeeUsername==null||employeePassword==""||employeePassword==null)
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
     let query=`SELECT employee_Name FROM employee_tbl WHERE employee_Name='${employeeName}'`

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
                                message: "Employee already exist"
                            }
                        )
                    }
                    else
                    {
                        let insertQuery=`INSERT INTO employee_tbl SET ?`
                        let productObj= EmployeeModel.EmployeeModel(employeeName,employeeUsername,employeePassword)

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
                                            message: "Successfully created employee"
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

const loginEmployee=(req,res,next)=>{

  let employeeUsername=req.body.employee_username;
  let employeePassword=req.body.employee_password;

  if( employeeUsername==""||
      employeeUsername==null ||
      employeePassword==""||
      employeePassword==null)
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
      let query=`SELECT username, password FROM employee_tbl WHERE username='${employeeUsername}'`

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
                      if(rows[0].password == employeePassword)
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
                        let deleteQuery=`DELETE FROM customer WHERE Customer_ID=${id}`
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
    CreateEmployee,
    loginEmployee,
    deleteCustomer
}