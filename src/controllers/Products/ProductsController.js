const DataModel = require("../../models/Products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ReturnProductsModel = require("../../models/Returns/ReturnProductsModel");
const DeleteService = require("../../services/common/DeleteService");
const PurchaseProductsModel = require("../../models/Purchases/PurchaseProductsModel");
const SaleProductsModel = require("../../models/Sales/SaleProductsModel");
const mongoose = require("mongoose");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DropDownService = require("../../services/common/DropDownService");


exports.CreateProduct=async (req, res) => {
    let Result= await CreateService(req,DataModel);
    res.status(200).json(Result)
}

exports.UpdateProduct=async (req, res) => {
    let Result=await UpdateService(req,DataModel)
    res.status(200).json(Result)
}

exports.ProductsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brands"}};
    let JoinStage2= {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "Categories"}};
   let Projection = {$project:{_id:1, UserEmail:1, ProductName:1, Unit:1, CategoryID:1, BrandID:1, Details:1, createdAt:1, updatedAt:1, BrandName:{$first:"$Brands.BrandName"}, CategoryName:{$first:"$Categories.CategoryName"}}}

    let SearchArray=[{ProductName: SearchRgx},{Unit: SearchRgx},{Details: SearchRgx},{BrandName:SearchRgx},{CategoryName:SearchRgx}]
    let Result=await ListTwoJoinService(req,DataModel,SearchArray,JoinStage1,JoinStage2,Projection);
    res.status(200).json(Result)
}


exports.ProductsDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}


exports.DeleteProduct=async (req, res) => {
    let DeleteID=req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    let CheckReturnAssociate= await CheckAssociateService({ProductID:ObjectId(DeleteID)},ReturnProductsModel);
    let CheckPurchaseAssociate= await CheckAssociateService({ProductID:ObjectId(DeleteID)},PurchaseProductsModel);
    let CheckSaleAssociate= await CheckAssociateService({ProductID:ObjectId(DeleteID)},SaleProductsModel);

    if(CheckReturnAssociate){
        res.status(200).json({status: "associate", data: "associated with Return Products"})
    }
    else if(CheckPurchaseAssociate){
        res.status(200).json({status: "associate", data: "associated with Purchase Products"})
    }
    else if(CheckSaleAssociate){
        res.status(200).json({status: "associate", data: "associated with Sale Products"})
    }
    else{
        let Result=await DeleteService(req,DataModel);
        res.status(200).json(Result)
    }
}




exports.ProductsDropDown=async (req, res) => {
    let Result= await DropDownService(req,DataModel,{_id:1,ProductName:1})
    res.status(200).json(Result)
}



