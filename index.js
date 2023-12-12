const app = require("./app");
require('dotenv').config()



app.listen(5000,function(){
    console.log("Server run @"+process.env.RUNNING_PORT);
});