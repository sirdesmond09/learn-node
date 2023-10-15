const Employee = require("../model/Employee")



const getAllEmployees =  async (req, res)=>{
    employees = await Employee.find();
    if (!employees) return res.status(204).json({});
    res.json(employees);
}

const createNewEmployee =async (req, res)=>{
    if (!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({"error":"first and last name are required"})
    };
    
    try {
        result = await Employee.create(
            {firstname : req.body.firstname,
            lastname : req.body.lastname
        });
        return res.status(201).json(result);

    } catch (error) {
        console.log(error);
        return res.status(400).json({"error": `failed with the message ${error}`});
    };

}


const updateEmployee = async (req, res) => {
    if (!req?.body?.id){
        return res.status(400).json({"error":"ID is required"})
    };

    const employee = await Employee.findOne({_id:req.body.id}).exec();

    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;

    const result = await employee.save()
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id){
        return res.status(400).json({"error":"ID is required"})
    };
    const employee = await Employee.findOne({_id:req.body.id}).exec();
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    
    const result = await employee.deleteOne({_id:req.body.id});
    res.status(204).json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id){
        return res.status(400).json({"error":"ID is required"})
    };
    const employee = await Employee.findOne({_id:req.params.id}).exec();
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}


module.exports = {getAllEmployees,
                  createNewEmployee, 
                  updateEmployee, 
                  deleteEmployee, 
                  getEmployee}