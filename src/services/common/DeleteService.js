const mongoose = require("mongoose");
const DeleteService= async (Request, Model) => {

    try{
        let DeleteID=Request.params.id;
        let userEmail=Request.headers['email'];

        const ObjectId = mongoose.Types.ObjectId;

        let DeleteQueryObject = {_id: ObjectId(DeleteID)};



        let Delete=  await Model.deleteMany(DeleteQueryObject)

        return {status: "success",Delete:Delete}

    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=DeleteService