// const Market=require('../models/market')
const Listing=require('../models/listing')
const User=require('../models/User')
const Cart=require('../models/Cart')
const cloudinary = require("../middleware/cloudinary");

module.exports={
    getMarketMainPage:async(req,res)=>{
        try{
        let listings=await Listing.find()
        res.render('marketmain.ejs',{items:listings,user:req.user})
        }catch(err){
            console.log(err)
        }    
    },
    getProfile:async(req,res)=>{
        try{
        let listings=await Listing.find({user:req.params.id})
        let userProfile=await User.findById(req.params.id)
        res.render('profile.ejs',{items:listings,user:userProfile,currUser:req.user})
        }catch(err){
            console.log(err)
        }    
    },
    createListing:async(req,res)=>{
        try{
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            await Listing.create({
                itemName:req.body.itemName,
                image:result.secure_url,
                cloudinaryId:result.public_id,
                itemDesc:req.body.itemDesc,
                itemSoldQty:0,
                itemStock:req.body.itemStock,
                itemPrice:req.body.itemPrice,
                user:req.user.id
            })
            console.log('Listing added...')
            res.redirect(`/marketMain/profile/${req.user.id}`)
        }catch(err){
            console.log(err)
        }   
    },
    getListing:async(req,res)=>{
        try{
        let listings=await Listing.findById(req.params.id)
        let listingsID=await Listing.findById(req.params.id).select("_id")
        let userProfile=await User.findById(listings.user)
        let cart=await Cart.findOne({item:req.params.id}).select("item -_id")
        console.log(cart)
        res.render('listing.ejs',{items:listings,user:userProfile,currUser:req.user, cartItems:cart.item,itemsID:listingsID})
        }catch(err){
            console.log(err)
        }    
    },
    deleteListing:async(req,res)=>{
        try{
        let listings=await Listing.findById(req.params.id)
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(listings.cloudinaryId);
        await Listing.findOneAndDelete({_id:req.params.id})
        console.log('Listing removed...')
        res.redirect('/marketMain')
        }catch(err){
            console.log(err)
            res.redirect('/marketMain')
        }    
    },
    refreshStockQty: async (req, res) => {
        try {
               await Listing.findOneAndUpdate(
                   { _id: req.params.id,
                   itemStock:{"$gt":0} },
                   {$inc: { itemStock: -1 }},
                   
                 );
               console.log("Stock -1");
               res.redirect('/marketMain'); 
        } catch (err) {
           console.log(err);
         }
     },
}