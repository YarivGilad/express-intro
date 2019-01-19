const marker = require('@ajar/marker'); 
const express = require('express')
const router  = express.Router()


const paymentVerify = (req,res,next)=>{
  marker.green(`check user paid for service...`)
  next()
  // res.redirect('/login')
}
const myLog = (req,res,next)=>{
  marker.info(`req.url:`,` ${req.url}`)
  next()
}
//routes
router.get('/', (req, res)=> {
  res.json({msg:'main api route'})
})
router.get('/pop', (req, res)=> {
  res.json({msg:'pop api route'})
})
router.get('/payedOnly',myLog , paymentVerify, (req, res)=> {
  res.json({msg:'payed route'})
})

module.exports = router
