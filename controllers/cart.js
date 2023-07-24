const Cart=require('../models/Cart')
const Listing=require('../models/listing')
const Purchase=require('../models/purchase')

module.exports={
    getMyCart:async(req,res)=>{
        try{
        let cartItems=await Cart.find({user:req.user.id})
        let listingInfo=await Listing.find().select('_id')
        res.render('cart.ejs',{items:cartItems, listing:listingInfo})
        }catch(err){
            console.log(err)
        }    
    },
    addtoCart:async(req,res)=>{
        try{
        let listings=await Listing.findById(req.params.id)
        await Cart.create({
            user:req.user.id,
            item:listings._id,
            image:listings.image,
            itemName:listings.itemName,
            quantity:1
        })
        console.log('Item added to cart...')
        res.redirect(`/marketMain/getListing/${listings._id}`)
        // res.json('Success')
        }catch(err){
            console.log(err)
        }    
    },
    deletefromCart:async(req,res)=>{
        try{
        await Cart.findOneAndDelete({item:req.params.id})
        console.log('Listing in cart removed...')
        res.redirect('/marketMainCart')
        }catch(err){
            console.log(err)
            res.redirect('/marketMainCart')
        }    
    },
    addItemQty: async (req, res) => {
        try {
          await Cart.findOneAndUpdate(
            { item: req.params.id },
            {
              $inc: { quantity: 1 },
            }
          );
          console.log("Quantity +1");
          res.redirect('/marketMainCart/');
        } catch (err) {
          console.log(err);
        }
      },
    reduceItemQty: async (req, res) => {
     try {
            await Cart.findOneAndUpdate(
                { item: req.params.id,
                quantity:{"$gte":2} },
                {$inc: { quantity: -1 }},
                
              );
            console.log("Quantity -1");
            res.redirect('/marketMainCart/'); 
     } catch (err) {
        console.log(err);
      }
  },
  purchaseItem:async(req,res)=>{
    try{
    let listings=await Listing.findById(req.params.id)
    let buyqty=await Cart.findOne({item:req.params.id}).select('quantity -_id')
    await Purchase.create({
        user:req.user.id,
        item:listings._id,
        purchaseQuantity:buyqty.quantity
    })
    console.log('Item purchased...')
    res.redirect(`/marketMainCart`)
    }catch(err){
        console.log(err)
    }    
  },     
}