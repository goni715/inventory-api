const mongoose = require("mongoose");

const DeleteParentChildsService= async (Request, ParentModel,ChildsModel,JoinPropertyName) => {

    const session = await mongoose.startSession();

    try{

        // Begin Transaction
        await session.startTransaction();

        // ParentDelete
        let DeleteID=Request.params.id;
        let UserEmail=Request.headers['email'];

        let DeleteChildQueryObject={};
        DeleteChildQueryObject[JoinPropertyName]=DeleteID;
        DeleteChildQueryObject[UserEmail]=UserEmail;

        /*let ParentQueryObject={};
        ParentQueryObject['_id']=DeleteID;
        ParentQueryObject[UserEmail]=UserEmail; */

        let DeleteParentQueryObject = {_id:DeleteID, UserEmail:UserEmail};


        // First Process
        let ChildsDelete=  await ChildsModel.deleteMany(DeleteChildQueryObject).session(session);

        // Second Process
        let ParentDelete= await ParentModel.deleteMany(DeleteParentQueryObject).session(session)



        // Commit Transaction
        await session.commitTransaction();
        session.endSession();

        
        return {status: "success",Parent:ParentDelete,Childs:ChildsDelete}

    }
    catch (error) {
        // Roll Back Transaction
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", data: error.toString()}
    }
}
module.exports=DeleteParentChildsService