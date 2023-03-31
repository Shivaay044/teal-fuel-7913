const express=require("express")
const { connection } = require("./Config/db")
const { adminAuth } = require("./Middlewares/adminAuth.middleware")
const { cartAuth } = require("./Middlewares/cartAuth.middleware")
const { auth } = require("./Middlewares/userAuth.middleware")
const { adminRouter } = require("./Routes/admin.routes")
const { cartRouter } = require("./Routes/cart.routes")
const { productRouter } = require("./Routes/product.routes")
const { userRouter } = require("./Routes/user.routes")
const cors = require("cors")
const app = express()
app.use(express.json())
require("dotenv").config()







app.use(express.json())
app.use(cors())

//Authentication user/admin
app.use("/users",userRouter)



// User Authorization
app.use(auth)

//CRUD Operation (productRoute)
app.use("/products",productRouter)



//  Admin Authorization
app.use(adminAuth)

//CRUD Operation (productRoute)
app.use("/adminProducts",adminRouter)




//Cart Authorization
app.use(cartAuth)

//CRUD Operation (cartRoute)
app.use("/cartProducts",cartRouter)






app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running on port ${process.env.port} `)
})

