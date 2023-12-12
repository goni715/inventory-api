const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema(
    {
        UserEmail:{type:String},
        TypeName:{type:String,unique:true}
    },
    { timestamps: true, versionKey:false}
);
const ExpenseTypesModel=mongoose.model('expensetypes',DataSchema);
module.exports=ExpenseTypesModel