const express=require('express')
const router=express.Router()
const cartController=require('../controllers/cart')
const { ensureAuth } = require('../middleware/auth')

router.get('/',ensureAuth,cartController.getMyCart)
router.post("/addtoCart/:id", ensureAuth,cartController.addtoCart)
router.delete("/deletefromCart/:id", ensureAuth,cartController.deletefromCart)
router.put("/addItemQty/:id",cartController.addItemQty)
router.put("/reduceItemQty/:id",cartController.reduceItemQty)
router.post("/purchaseItem/:id", ensureAuth,cartController.purchaseItem)

module.exports=router