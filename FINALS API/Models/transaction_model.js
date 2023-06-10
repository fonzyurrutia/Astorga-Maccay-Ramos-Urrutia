const transactionModel=(user_ID,prod_ID)=>
{
    let Product=
    {
        user_ID: user_ID,
        prod_ID: prod_ID
    }

    //KEY NAME(LEFT SIDE)=>COLUMN NAME IN THE
    //VALUE(RIGHT SIDE)=>WILL COME FROM THE CLIENT REQUEST
    return Product
}

module.exports=
{
    transactionModel
}