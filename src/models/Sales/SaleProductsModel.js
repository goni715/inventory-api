const mongoose=require('mongoose');
const DataSchema=mongoose.Schema(
    {
       UserEmail:{type:String},
       SaleID:{type:mongoose.Schema.Types.ObjectId},
       ProductID:{type:mongoose.Schema.Types.ObjectId},
       Qty:{type:Number},
       UnitCost:{type:Number},
       Total:{type:Number},
    },
    { timestamps: true, versionKey:false}
);
const SaleProductsModel=mongoose.model('saleproducts',DataSchema);
module.exports=SaleProductsModel