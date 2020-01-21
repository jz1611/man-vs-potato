module.exports = {
  getAllItems: async (req, res, next) => {
    const db = req.app.get('db');
    const items = await db.get_all_items();
    res.status(200).send(items);
  }

  // getItem: async (req, res, next) => {
  //   const db = req.app.get('db');
  //   const {item_id} = req.params;
  //   const item = await db.get_item(item_id);
  //   res.status(200).send(item[0]);
  // }

  // addItemToCart: async (req, res, next) => {
  //   let item_already_in_cart = false;
  //   const { item_id, quantity } = req.body;
  //   if(!req.session.user) {
  //     res.status(401).send("You must be logged in to add to cart.");
  //   } else {
  //     if (req.session.user.cart) {
  //       req.session.user.cart.forEach(item => {
  //         if (item_id === item.item_id) {
  //           item_already_in_cart = true;
  //           item.quantity += quantity;
  //         }
  //       });
  //       if (!item_already_in_cart){
  //         req.session.user.cart.push({item_id, quantity});
  //       }
  //     } else {
  //       req.session.user = {
  //         ...req.session.user,
  //         cart: [{ item_id, quantity }]
  //       }
  //     }
  //     res.status(200).send(req.session.user)
  //   }
  // }
}