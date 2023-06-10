const EmployeeModel=(employee_name,username,password)=>
{
    let employeeModel=
    {

        Employee_Name: employee_name,
        username: username,
        password: password,

    }

   
    return employeeModel
}

module.exports=
{
    EmployeeModel
}