const ProductModel=(name,desc,price)=>
{
    let Product=
    {
        prod_name: name,
        prod_desc: desc,
        price: price
    }

    //KEY NAME(LEFT SIDE)=>COLUMN NAME IN THE
    //VALUE(RIGHT SIDE)=>WILL COME FROM THE CLIENT REQUEST
    return Product
}

module.exports=
{
    ProductModel
}