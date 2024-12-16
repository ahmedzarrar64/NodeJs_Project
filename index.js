// // const express = require('express');
// // const path = require('path');
// // const app=express();

// // const { request } = require("express");

// // const reqFilter=(req,resp,next)=>{
// //     if(! req.query.age){
// //         resp.send("Please provide age")
// //     }

// //     else if (req.query.age < 18){
// //         resp.send("you can not access this page")
// //     }
// //     else{
// // next();
// //     }
// // }

// // app.use(reqFilter)

// // app.get('/',(req,resp)=>{
// //     resp.send('Welcome to Home Page')
// // })
// // // const publicPath= path.join(__dirname,'public');
// // // // app.use(express.static(publicPath));
// // // app.set('view engine','ejs');
// // // app.get('',(__,resp)=>{
// // //     resp.sendFile(`${publicPath}/index.html`)
// // // })
// // // app.get('/profile',(__,resp)=>{
// // //     const user={
// // //         name: 'zarrar ahmed',
// // //         email:'ahmedzarrar64@gmail.com',
// // //         city:'karachi',
// // //         country : 'pakistan',
// // //         skills:['php','sql','c','node']

// // //     }
// // //     resp.render('profile',{user});
// // // })
// // // app.get('/login',(__,resp)=>{
// // //     const user={
// // //         name: 'zarrar ahmed',
// // //         email:'ahmedzarrar64@gmail.com',
// // //         city:'karachi',
// // //         country : 'pakistan',
// // //         skills:['php','sql','c','node']

// // //     }
// // //     resp.render('login',{user});
// // // })
// // // app.get('*',(__,resp)=>{
// // //     resp.sendFile(`${publicPath}/nopage.html`)
// // // })

// // app.listen(5000);

// // const {MongoClient} = require('mongodb');
// // const url ='mongodb://localhost:27017';
// // const database = 'A2Z_Store';
// // const client = new MongoClient(url);

// // async function dbConnect()
// // {
// //     let result = await client.connect();
// //     let db = result.db(database);
// //    return db.collection('Items');
// //     // let response = await collection.find({name:'Iphone 12'}).toArray();
// //     // console.log(response);
// // }

// // dbConnect().then((resp)=>{
// //     console.warn(resp.find().toArray())
// // });

// // const fs= require('fs');
// // const input = process.argv;
// // fs.writeFileSync(input[2],input[3]);

// // for(i=1, i<=5, i++)
// //     {
// //     console.log('Hello World!');
// //     }

// //     for (var i=100; i<=341; i++){
// //         console.log('https://ia801207.us.archive.org/BookReader/BookReaderImages.php?zip=/22/items/s_20231218/S_jp2.zip&file=S_jp2/S_0' + i + '.jp2&id=s_20231218&scale=2&rotate=0');
// // request.get('https://ia801207.us.archive.org/BookReader/BookReaderImages.php?zip=/22/items/s_20231218/S_jp2.zip&file=S_jp2/S_0' + i + '.jp2&id=s_20231218&scale=2&rotate=0')
// // .on('error',function(err){console.log(err)})
// // .pipe(fs.createWriteStream('https://ia801207.us.archive.org/BookReader/BookReaderImages.php?zip=/22/items/s_20231218/S_jp2.zip&file=S_jp2/S_0' + i + '.jp2&id=s_20231218&scale=2&rotate=0'))
// // .on('close');
// //     }

// // for (var i=100; i<=341; i++){

// //     url = 'https://ia801207.us.archive.org/BookReader/BookReaderImages.php?zip=/22/items/s_20231218/S_jp2.zip&file=S_jp2/S_0' + i + '.jp2&id=s_20231218&scale=2&rotate=0';
// //     var download = function(url, dest, callback){

// //         request.get(url)
// //             .on('error', function(err) {console.log(err)} )
// //             .pipe(fs.createWriteStream(dest))
// //             .on('close', callback);

// //     };

// //     links.forEach( function(str) {
// //             var filename =  str[0].split('/').pop() + '.jpeg';
// //             console.log(filename);
// //             console.log('Downloading ' + filename);
// //             download(str[0], filename, function(){console.log('Finished Downloading ' + filename)});
// //     });

// // }

// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const request = require('request');

// // download function

// function download(files, callback) {
//     let index = 0;
//     var data = setInterval(async () => {
//         let i = index++
//         if (i === files.length)
//             clearInterval(data)
//         else {
//             request.head(files[i % files.length], function (err, res, body) {
//                 request(files[i % files.length])
//                     .pipe(fs.createWriteStream(`image${i}.jpg`))
//                     .on("close", callback);
//             });
//         }
//     }, 4000);
// }

// let scrape = async ()=> {

//     const browser = await puppeteer.launch({
//         "headless": false
//     });

//     const page =await browser.newPage();        //opening new page

//     await page.goto("https://www.wikipedia.org/");  // go to url

//     const xpathselector = `//span[contains(text(), "Commons")]`;    //click on the commons buttons

//     const commonlinks = await page.waitForXPath(xpathselector);

//     await page.waitFor(3000);

//     await commonlinks.click();

//     await page.waitFor(2000)

//     const xpath = '//*[@id="mainpage-potd"]/div[1]/a/img';

//     const imageXpath = await page.waitForXPath(xpath);
//     const src = await imageXpath.evaluate(el => el.src)

//     //downloading the 1st image from the page

//     download(src, "image.jpg", function() {
//         console.log("Image downloaded");
//     });

//     await page.waitFor(2000)

//     //here we are going to another page

//     const xpathselector1 ='//*[@id="mf-picture-picture"]/div[2]/ul/li[4]/a'
//     const previousPictture = await page.waitForXPath(xpathselector1);
//     await page.waitFor(2000);
//     previousPictture.click();

//     await page.waitFor(1500);

//     //getting urls of images

//     const link_start = 0;
//     const cue_card_links = await page.evaluate((selector) => {
//         const anchors_node_list = document.querySelectorAll(selector);
//         const anchors = [...anchors_node_list];
//         return anchors.map(link => link.href);
//       }, '#mw-content-text > div > table > tbody > tr > td > div > div > a');

//       console.log("[#] Done getting links\n");

//     for (let i = link_start; i < cue_card_links.length; i++) {
//         let link = cue_card_links[i];

//         //downloading all images from second page

//         download(link, `image${i}.jpg`, function() {
//             console.log("Image downloaded");
//         });
//     }

// }

// scrape();

// const express = require("express");
// require("./config");
// const Items = require("./Items");

// const app = express();
// app.use(express.json());
// app.post("/create", async (req, resp) => {
//   let data = new Items(req.body);
//   let result = await data.save();
//   console.log(result);
//   resp.send("Done");
// });

// app.get("/list", async (req, resp) => {
//   let data = await Items.find();
//   resp.send(data);
// });

// app.delete("/delete/:_id", async (req, resp) => {
//   console.log(req.params);
//   let data = await Items.deleteOne(req.params);
//   resp.send(data);
// });
// app.put("/update/:_id", async (req, resp) => {
//   // console.log(req.params);
//   let data = await Items.updateOne(req.params, {
//     $set: req.body,
//   });
//   resp.send(data);
// });

// app.get("/search/:key", async (req, resp) => {
//   console.log(req.params.key);
//   let data = await Items.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { brand: { $regex: req.params.key } },
//     ],
//   });
//   resp.send(data);
// });

// const multer = require('multer');
// const upload = multer({
//   storage:multer.diskStorage({
//     destination:function(req,file,cb){
//       cb(null,"uploads")
//     },
//     filename:function(req,file,cb){
//       cb(null,file.filename+"-"+Date.now()+".jpg")
//     },

//   })
// }).single("user_file")
// app.post("/upload",upload,async (req,resp)=>{

//   resp.send("file Uploaded")
// })
// app.listen(5000);

// const os = require('os');
// console.log(os.arch());
// console.log(os.freemem()/(1024*1024*1024));
// console.log(os.totalmem()/(1024*1024*1024));
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.userInfo())

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "adms_db",
});

con.connect((err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("connectd");
  }
});

con.query("select * from brand_list", (err, result) => {
  console.warn("result", result);
});
