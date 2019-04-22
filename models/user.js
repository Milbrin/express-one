// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class User{

//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     if(id){
//       this._id = new mongodb.ObjectID(id);
//     }
//   }

//   save(){
//     const db = getDb();
//     let dbOp;
//     if(this._id){
//       dbOp = db.collection('users').updateOne({_id: this._id}, {$set: this });
//     } else {
//       dbOp = db.collection('users').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log('success');
//       })
//       .catch(err => {
//         console.log(err );
//       });
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if(cartProductIndex>=0){
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({productId: product._id, quantity: newQuantity});
//     }
//     const updatedCart = {items: updatedCartItems};
//     const db = getDb();
//     return db.collection('users').updateOne({_id: this._id}, {$set: {cart: updatedCart}});
//   }

//   deleteToCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const updatedCart = {items: updatedCartItems};
//     const db = getDb();
//     return db.collection('users').updateOne({_id: this._id}, {$set: {cart: updatedCart}});
//   }

//   getCart() {
//     const db = getDb();
//     console.log(this.cart);
//     const productsIds = this.cart.items.map(item => item.productId);
//     return db
//       .collection('products')
//       .find({ _id: {$in: productsIds}})
//       .toArray()
//       .then(products => {
//         return products.map(product=> {
//           return {
//             ...product,
//             quantity: this.cart.items.find(item => {
//               return item.productId.toString() === product._id.toString();
//             })
//             .quantity
//           };
//         })
//       })
//       .catch(err => console.log(err));
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectID(this._id),
//             username: this.username,
//             email: this.email
//           }
//         };
//         return db.collection('orders').insertOne(order)
//       })
//       .then(result => {
//         this.cart = {items: []};
//         return db.collection('users').updateOne({_id: this._id}, {$set: {cart: {items: []}}});
//       })
//       .catch(err => console.log(err));
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection('orders').find({'user._id': new mongodb.ObjectID(this._id)}).toArray()
//       .then(orders => {
//         return orders;
//       })
//       .catch(err => console.log(err));
//   }

//   static fetchById(userId){
//     const db = getDb();
//     return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next()
//     .then(user => {
//       return user;
//     })
//     .catch(err => console.log(err));
//   }
// }
// module.exports = User;
