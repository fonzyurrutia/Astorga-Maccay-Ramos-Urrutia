const database=require('../Models/connection_model')
const ProductModel=require('../Models/product_model')

const CreateProduct = (req, res, next) => {

  let productName=req.body.product_name;
  let productDescription=req.body.product_description;
  let productPrice=req.body.product_price;

  if(productName==""||productName==null||productDescription==""||productDescription==null||productPrice==""||productPrice==null)
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
   let query=`SELECT Prod_Name FROM product_tbl WHERE Prod_Name='${productName}'`

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
                              message: "Product already exist"
                          }
                      )
                  }
                  else
                  {
                      let insertQuery=`INSERT INTO product_tbl SET ?`
                      let productObj= ProductModel.ProductModel(productName,productDescription,productPrice)

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
                                          message: "Successfully created product"
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

const updateProduct = (req, res, next) => {
  let prodID = req.params.prod_ID;
  let ProdName = req.body.Prod_Name;
  let ProdDescription = req.body.Prod_Desc;
  let Price = req.body.price;

  if (!ProdName && !ProdDescription && !Price) {
    res.status(400).json({
      successful: false,
      message: "No information provided for update",
    });
  } else {
    let query = `SELECT prod_ID, Prod_Name, Prod_Desc, price FROM product WHERE prod_ID=${prodID}`;

    database.db.query(query, (err, rows, result) => {
      if (err) {
        res.status(500).json({
          successful: false,
          message: err,
        });
      } else {
        if (rows.length !== 1) {
          res.status(400).json({
            successful: false,
            message: "Product does not exist",
          });
        } else {
          let updateQuery = `UPDATE product SET `;
          let updateData = [];

          if (ProdName) {
            updateQuery += `Prod_Name = ?, `;
            updateData.push(ProdName);
          }

          if (ProdDescription) {
            updateQuery += `Prod_Desc = ?, `;
            updateData.push(ProdDescription);
          }

          if (Price) {
            updateQuery += `price = ?, `;
            updateData.push(Price);
          }

          updateQuery = updateQuery.slice(0, -2); // Remove the trailing comma and space
          updateQuery += ` WHERE prod_ID = ?`;
          updateData.push(prodID);

          database.db.query(
            updateQuery,
            updateData,
            (err, rows, result) => {
              if (err) {
                res.status(500).json({
                  successful: false,
                  message: err,
                });
              } else {
                req.status(200).json({
                  successful: true,
                  message: "Successfully updated product",
                });
              }
            }
          );
        }
      }
    });
  }
}

const deleteProduct = (req, res, next) => {
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
      let query=`SELECT Prod_ID FROM product_tbl WHERE Prod_ID=${id}`

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
                      let deleteQuery=`DELETE FROM product_tbl WHERE Prod_ID=${id}`
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
                                        message:"Successfully deleted product"
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
    CreateProduct,
    updateProduct,
    deleteProduct
}