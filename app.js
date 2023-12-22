const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://AdminWatermellon:U8pow8JHwZ31QMaH@cluster0.kjdesfd.mongodb.net/find-job";
const client = new MongoClient(uri);
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'puplic/imgs')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("puplic"));
app.set("view engine", "ejs");

async function connectToMongo() {
    await client.connect();
    console.log("Connected to MongoDB");
}
connectToMongo();

async function exportCollectionToJson() {
    const database = client.db("find-job");
    const collection = database.collection("users");
    const data = await collection.find().toArray();
    const jsonFileName = "exportedData.json";
    const jsonData = JSON.stringify(data, null, 2);
    require("fs").writeFileSync(jsonFileName, jsonData);
    return data;
}

mongoose.connect("mongodb+srv://AdminWatermellon:U8pow8JHwZ31QMaH@cluster0.kjdesfd.mongodb.net/find-job");
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contact: Number,
    websiteName: String, //12222222222
    websiteLink: String, //122222222222
    location: String,
    profession: String,
    birthDate: Date,
    cvLink: String,
    skills: String,
    avatar: String
});
const User = mongoose.model("User", userSchema);

app.get("/", async function (req, res) {
    try {
        const data = await exportCollectionToJson();
        res.render("home", { data: data });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/join-us", function (req, res) {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    res.render("join-us", { currentDate });
});

app.post("/join-us", upload.single('avatar'), function (req, res) {
    firstNameu = req.body.firstName;
    lastNameu = req.body.lastName;
    emailu = req.body.email;
    contactu = req.body.conNum;
    websiteNameu = req.body.websiteName;
    websiteLinku = req.body.websiteLink;
    locationu = req.body.location;
    professionu = req.body.profession;
    birthDateu = req.body.date;
    cvLinku = req.body.cvLink;
    skillsu = req.body.skills;
    async function insertData() {
        try {
            const user = new User({
                firstName: firstNameu,
                lastName: lastNameu,
                email: emailu,
                contact: contactu,
                websiteName: websiteNameu,
                websiteLink: websiteLinku,
                location: locationu,
                profession: professionu,
                birthDate: birthDateu,
                cvLink: cvLinku,
                skills: skillsu,
                avatar: req.file.filename
            });
            user.save();
            console.log(req.file.filename)
        } catch (er) {
            console.log(er);
        }
    }
    insertData();
    setTimeout(function () {
        res.redirect("/");
    }, 2000);
});

app.get("/contact-us", function (req, res) {
    res.render("contact-us");
});

app.get("/success", (req, res) => {
    res.render("success");
});

app.post("/success", (req,res)=>{
    res.redirect("/")
})


app.post("/contact-us", async function (req, res) {
    const userEmail = req.body.email;
    const message = req.body.message;
    const userName = req.body.userName;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'basel.ana.2020@gmail.com',
            pass: 'dmcz tixu vceo oemx'
        }
    });

    var mailOptions = {
        from: userEmail,
        to: 'WaterMellonContact@gmail.com',
        subject: 'FeedBack',
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    setTimeout(function () {
        res.redirect("success");
    }, 2000);

});




app.get("/about-us", function (req, res) {
    res.render("about-us");
});

app.listen(3000, function () {
    console.log("Hello from port 3000!");
});
