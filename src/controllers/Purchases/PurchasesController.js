const ParentModel = require("../../models/Purchases/PurchasesModel");
const ChildsModel = require("../../models/Purchases/PurchaseProductsModel");
const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");

exports.CreatePurchase=async (req, res) => {
    let Result= await CreateParentChildsService(req,ParentModel,ChildsModel,'PurchaseID');
    res.status(200).json(Result)
}

exports.PurchasesList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage={$lookup: {from: "suppliers", localField: "SupplierID", foreignField: "_id", as: "Suppliers"}};
    let SearchArray=[{Note: SearchRgx},{SupplierName: SearchRgx},{SupplierAddress: SearchRgx},{SupplierPhone: SearchRgx},{SupplierEmail: SearchRgx}]
    let Projection = {$project:{_id:1, UserEmail:1, SupplierID:1, VatTax:1, Discount:1, OtherCost:1, ShippingCost:1, GrandTotal:1, Note:1, createdAt:1, updatedAt:1, SupplierName:{$first:"$Suppliers.SupplierName"}, SupplierPhone:{$first:"$Suppliers.Phone"}, SupplierAddress:{$first:"$Suppliers.Address"}, SupplierEmail:{$first:"$Suppliers.Email"} }}


    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage, Projection);
    res.status(200).json(Result)
}

exports.PurchasesDelete=async (req, res) => {
    let Result=await  DeleteParentChildsService(req,ParentModel,ChildsModel,'PurchaseID')
    res.status(200).json(Result)
}


