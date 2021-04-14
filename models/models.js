const mongoose = require('mongoose');
    /* Store Schema */
    const storeSchema = mongoose.Schema({
      _id: String,
      name: String,
      address: String,
      zip: String,
      items: [{
        name : String,
        description : String,
        quantity : String
      }]
    });
    mongoose.model('Store', storeSchema);


