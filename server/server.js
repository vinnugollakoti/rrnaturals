const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {ProductRouter} = require("./app")
const app = express()
const PORT = 3001
const CLUSTER_LINK = "mongodb+srv://vinnugollakoti:vinnu1244@cluster0.cwivpr4.mongodb.net/rr_naturals";

app.use(cors())
app.use(express.json())
app.use("/use", ProductRouter)
app.get("/",(req,res)=>{
    res.send("i am alive bro!!")
})
mongoose.connect(CLUSTER_LINK)
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Error in connecting the database.", err)
})
