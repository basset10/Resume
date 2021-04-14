const mongoose = require('mongoose');
const Store = mongoose.model('Store');

module.exports = {
  addStores: async () => {
    await Store.create({
      _id: 'abc123def',
      name: 'University Bookstore',
      address: '11000 University Pkwy. Bldg. 22',
      zip : '32514',
      items: [
        {
          name: "Nintendo Switch",
          description: "Console Gray",
          quantity: "7",
        },
        {
          name: "Samsung Galaxy Fold",
          description: "Silver",
          quantity: "3",
        },
      ]
    });

    await Store.create({
      _id: '123456789',
      name: 'Atlanta Wal-Mart',
      address: '1801 Howell Mill Rd',
      zip : '30303',
      items: [
        {
          name: "Airpods Pro",
          description: "White",
          quantity: "8",
        },
        {
          name: "Playstation 5",
          description: "Console White",
          quantity: "10",
        },
      ]
    });


    await Store.create({
      _id: 'abcdefghi',
      name: 'Tallahassee Target',
      address: '1861 W Tennessee St',
      zip : '32305',
      items: [
        {
          name: "Xbox Series X",
          description: "Console Black",
          quantity: "2",
        },
        {
          name: "iPhone 12",
          description: "Red",
          quantity: "3",
        },
      ]
    });


  }
};