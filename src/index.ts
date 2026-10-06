import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db.js";
import { UserMiddleware } from "./middleware.js";
const JWT_PASSWORD = "123123";


const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    //zod validation and hash password 
    const username = req.body.username;
    const password = req.body.password;
   
    //risky statements put in try catch 
    try{
        await UserModel.create({
            username:username,
            password:password
        })
        res.json({
            message : "user signed up"
        })
    } catch(e) {
        res.status(411).json({
            "message": "user aldready exist"
        })
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const username =  req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_PASSWORD)
            res.json({
                token 
            })

    } else {
        res.json({
            "message":"incoorect credentials "
        })
    }

})

app.post("/api/v1/content",UserMiddleware, async (req, res) => {
    const link = req.body.link;
    //i remove type and put title 
    const title = req.body.title
    await ContentModel.create({
        link,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    return res.json({
        message: "content added"
    })


})

app.get("/api/v1/content", UserMiddleware, async (req, res) => {
    //@ts-ignore
    const userID = req.userId;
    const content = await ContentModel.find({
        userId: userID
    }).populate("userId","username")
    res.json({
        content
    })


})

app.delete("/api/v1/content", UserMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "Deleted"
    })

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000);