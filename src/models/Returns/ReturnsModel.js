const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema(
    {
        UserEmail:{type:String},
        CustomerID:{type:mongoose.Schema.Types.ObjectId},
        VatTax:{type:Number},
        Discount:{type:Number},
        OtherCost:{type:Number},
        ShippingCost:{type:Number},
        GrandTotal:{type:Number},
        Note:{type:String},
    },
    { timestamps: true, versionKey:false}
);
const ReturnsModel=mongoose.model('returns',DataSchema);
module.exports=ReturnsModel