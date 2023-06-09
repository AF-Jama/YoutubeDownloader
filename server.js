const ytdl = require('ytdl-core');
const express = require('express');
var cors = require('cors')
const fs = require('fs');
const { getInfo } = require('ytdl-core');
require('dotenv').config();

const app = express();

app.use(cors());

console.log(process.env.PORT);

app.get('/',async (req,res)=>{
    console.log("HIT");
    try{
        let yt_download = ytdl(req.query.url,{filter:"audioandvideo",quality:"highest",});
        let info = await getInfo(req.query.url); // returns getInfo promise value
        return res.json({
            // x:yt_download,
            title:info.videoDetails.title,
            liveStatus:info.videoDetails.isLiveContent,
            description:info.videoDetails.description,
            image:info.videoDetails.thumbnails[2].url,
            download_link:yt_download,
        }) // returns json promise value
    }catch(error){
        // return res.json({
        //     statusCode:404,
        //     message: `Error ${error}`  
        // })

        return null;
    }
})

app.get('/download',(req,res)=>{
    const { url,type } = req.query; // returns url amd type from destructured query object

    mediaExtension = type==="mp4"?"video.mp4":"audio.mp3"; // ternary operator which returns media extension
    mediaFilter = type==="mp4"?"audioandvideo":"audioonly"; // ternary operator which returns audioandvideo or audioonly
    
    res.header('Content-Disposition', `attachment; filename=${mediaExtension}`);
    ytdl(url, {
        filter:mediaFilter,
        quality:"highest"
        }).pipe(res);
})

app.get("/test",(req,res)=>{
    return res.json({
        test:true
    })
})





app.listen(5000||process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT} `)
})