const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://ji:1@cluster0.y8dlgd4.mongodb.net/account?retryWrites=true&w=majority&appName=Cluster0`);
const db = mongoose.connection;

const userSchema = mongoose.Schema({                          
    // if schema style then
    username : String,
    password:String
})
// module.exports = db.collection('users',userSchema);
    
module.exports = db.collection('userinfo');