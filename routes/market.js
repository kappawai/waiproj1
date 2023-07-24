const express=require('express')
const router=express.Router()
const upload = require("../middleware/multer")
const marketController=require('../controllers/market')
const { ensureAuth } = require('../middleware/auth')

router.get('/',ensureAuth,marketController.getMarketMainPage)
router.get('/profile/:id',ensureAuth,marketController.getProfile)
router.post("/createListing", upload.single("file"), marketController.createListing)
router.get('/getListing/:id',marketController.getListing)
router.delete('/deleteListing/:id',marketController.deleteListing)
router.put('/refreshStockQty/:id',marketController.refreshStockQty)

module.exports=router