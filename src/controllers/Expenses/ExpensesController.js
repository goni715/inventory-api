const DataModel = require("../../models/Expenses/ExpensesModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");


exports.CreateExpense=async (req, res) => {
    let Result= await CreateService(req,DataModel);
    res.status(200).json(Result)
}

exports.UpdateExpense=async (req, res) => {
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result)
}

exports.ExpensesList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{Note: SearchRgx},{TypeName: SearchRgx}]
    let JoinStage= {$lookup: {from: "expensetypes", localField: "TypeID", foreignField: "_id", as: "Type"}}
    let Projection = {$project:{_id:1, UserEmail:1, TypeID:1, Amount:1, Note:1, createdAt:1, updatedAt:1, TypeName:{$first:"$Type.TypeName"}}}

    let Result=await ListOneJoinService(req,DataModel,SearchArray,JoinStage,Projection);
    res.status(200).json(Result)
}

exports.ExpenseDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}


exports.DeleteExpense=async (req, res) => {
    let Result=await DeleteService(req,DataModel);
    res.status(200).json(Result)
}


