const ParentModel = require("../../models/Sales/SalesModel");
const ChildsModel = require("../../models/Sales/SaleProductsModel");
const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");

exports.CreateSales=async (req, res) => {
    let Result= await CreateParentChildsService(req,ParentModel,ChildsModel,'SaleID');
    res.status(200).json(Result)
}

exports.SalesList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage={$lookup: {from: "customers", localField: "CustomerID", foreignField: "_id", as: "Customers"}};
    let SearchArray=[{Note: SearchRgx},{CustomerName: SearchRgx},{CustomerAddress: SearchRgx},{CustomerPhone: SearchRgx},{CustomerEmail: SearchRgx}]
    let Projection = {$project:{_id:1, UserEmail:1, CustomerID:1, VatTax:1, Discount:1, OtherCost:1, ShippingCost:1, GrandTotal:1, Note:1, createdAt:1, updatedAt:1, CustomerName:{$first:"$Customers.CustomerName"}, CustomerPhone:{$first:"$Customers.Phone"}, CustomerAddress:{$first:"$Customers.Address"}, CustomerEmail:{$first:"$Customers.Email"} }}

    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage,Projection);
    res.status(200).json(Result)
}


exports.SaleDelete=async (req, res) => {
    let Result=await DeleteParentChildsService(req,ParentModel,ChildsModel,'SaleID')
    res.status(200).json(Result)
}
