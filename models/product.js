// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.userId = userId;
//     if(id){
//       this._id = new mongodb.ObjectID(id);
//     }
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if(this._id){
//       dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log('success');
//       })
//       .catch(err => {
//         console.log(err );
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(err => console.log(err));
//   }

//   static fetchById(prodId) {
//     const db = getDb();
//     return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
//     .then(product => {
//       return product;
//     })
//     .catch(err => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(result => {
//       console.log('DESTROYED');
//     })
//     .catch(err => console.log(err));
//   }

  
// }

// module.exports = Product;
