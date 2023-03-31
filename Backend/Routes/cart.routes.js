const express = require("express")
const { cartModel } = require("../Models/cart.model")

const cartRouter =  express.Router()




//CREATE
cartRouter.post("/add",async(req,res)=>{
   try {
    const newProduct = new cartModel(req.body)
    await newProduct.save()
    res.status(200).send({"msg":"Product added successfully"})
   } catch (error) {
    res.status(400).send({error:error.message})
   }
})



//READ
cartRouter.get("/",async(req,res)=>{
    console.log(req.query)
    let {category} = req.query
    category = category ?  category.toLowerCase() : null
   try {
    const products = await cartModel.find({"category":category||["mac","iphone","ipad","apple watch"]})
    res.status(200).send(products)
   } catch (error) {
    res.status(400).send({"msg":error.message})
   }
})



//DELETE
cartRouter.delete("/:id",async(req,res)=>{
  try {
     const idExist = await cartModel.findOne({"_id":req.params.id})
     if(idExist){
        await cartRouter.findByIdAndDelete(req.params.id)
        res.status(200).send({"msg":"Product deleted successfully"})
     }else{
        res.status(400).send({"msg":"Product id invalid"})
     }
  } catch (error) {
    res.status(400).send({"msg":error.message})
  }
})



//UPDATE
cartRouter.patch("/:id",async(req,res)=>{
    try {
       const idExist = await cartModel.findOne({"_id":req.params.id})
       if(idExist){
          await cartRouter.findByIdAndUpdate(req.params.id,req.body)
          res.status(200).send({"msg":"Product updated successfully"})
       }else{
          res.status(400).send({"msg":"Product id invalid"})
       }
    } catch (error) {
      res.status(400).send({"msg":error.message})
    }
  })


//SEARCH
cartRouter.get("/search",async(req,res)=>{
    const {q} = req.query
    try {
        const products = await cartModel.find({ title: { $regex: new RegExp(q, "i") } })
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})


//GET BY ID
cartRouter.get("/search/:id",async(req,res)=>{
   const {id} = req.params
   try {
       const products = await produtModel.findOne({_id:id})
       res.status(200).send(products)
   } catch (error) {
       res.status(400).send({"msg":error})
   }
})




module.exports = {cartRouter}