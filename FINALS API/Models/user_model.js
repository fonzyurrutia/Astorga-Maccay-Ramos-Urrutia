const user_model=(Customer_Name,Customer_contact,customer_address,customer_username,customer_password)=>
{
    let userModel=
    {

        Customer_Name: Customer_Name,
        customer_Contact: Customer_contact,
        address: customer_address,
        username: customer_username,
        password: customer_password

    }

    //KEY NAME(LEFT SIDE)=>COLUMN NAME IN THE
    //VALUE(RIGHT SIDE)=>WILL COME FROM THE CLIENT REQUEST
    return userModel
}

module.exports=
{
    user_model
}