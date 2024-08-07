// const fs = require('fs');
// const path = require('path');

// const VideoStream = async (req, res) => {
//     try {
//         const videoPath = path.join(process.cwd(), "videos", req.params.filename);
//         const stat = fs.statSync(videoPath);
//         const fileSize = stat.size;
//         const range = req.headers.range;

//         if (range) {
//             const parts = range.replace(/bytes=/, "").split("-");
//             const start = parseInt(parts[0], 10);
//             let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

//             // Ensure the start and end are within valid range
//             if (start >= fileSize || start < 0 || end >= fileSize || end < start) {
//                 res.status(416).send('Requested Range Not Satisfiable');
//                 return;
//             }

//             const chunksize = (end - start) + 1;
//             const file = fs.createReadStream(videoPath, { start, end });
//             const head = {
//                 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                 'Accept-Ranges': 'bytes',
//                 'Content-Length': chunksize,
//                 'Content-Type': 'video/webm',
//                 'Access-Control-Allow-Headers': 'Range',
//             };

//             res.writeHead(206, head);
//             file.pipe(res);
//         } else {
//             const head = {
//                 'Content-Length': fileSize,
//                 'Content-Type': 'video/webm',
//                 'Access-Control-Allow-Headers': 'Range',
//             };
//             res.writeHead(200, head);
//             fs.createReadStream(videoPath).pipe(res);
//         }
//     } catch (error) {
//         console.error('Error in VideoStream:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

// module.exports = { VideoStream };


const fs = require('fs');
const path = require('path');
const { errorHandler } = require('../utils/errorHandler');
const { sendResponse } = require('../utils/dataHandler');

const VideoStream = async (req, res) => {
    try {
        const videoPath = path.join(process.cwd(), "videos", req.params.filename);
        if (!fs.existsSync(videoPath)) {
            let error = new Error('Video not found');
            error.statusCode = 404;
            throw error;

        }
        // if (!fs.existsSync(videoPath)) {
        //     res.status(400).json({ message: 'Video not found' })
        // }
        // const range = req.headers.range
        // if (!range) {
        //     res.status(400).json({ message: 'Renge is required' })
        // }
        // const stat = fs.statSync(videoPath)
        // const filesize = stat.size
        // console.log("file size", filesize)
        // const chunksize = 10 ** 6
        // const start = Number(range.replace(/\D/g, ""))
        // const end = Math.min(start + chunksize, filesize)
        // const filestream = fs.createReadStream(videoPath, {
        //     start,
        //     end
        // })
        // const head = {
        //     'Content-Range': `bytes ${start}-${end}/${filesize}`,
        //     'Accept-Ranges': 'bytes',
        //     'Content-Length': chunksize,
        //     'Content-Type': 'video/webm',
        //     'Access-Control-Allow-Origin': "*", // Replace with your frontend origin
        //     'Access-Control-Allow-Headers': 'Range',
        //     'Cross-Origin-Resource-Policy': 'cross-origin' // Add this line
        // };
        // res.writeHead(206, head);
        // filestream.pipe(res)
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;
        const Origin = process.env.NODE_ENV === "production" ? "https://securitytool-front.handsintechnology.in" : "http://localhost:3000"
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            // If the range is requesting the entire file (start=0, end=fileSize-1)
            if (start === 0 && end === fileSize - 1) {
                // Serve the entire file
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/webm',
                    'Access-Control-Allow-Origin': Origin, // Replace with your frontend origin
                    'Cross-Origin-Resource-Policy': 'cross-origin' // Add this l
                };
                res.writeHead(200, head);
                fs.createReadStream(videoPath).pipe(res);
                return;
            }

            // Ensure the start and end are within valid range
            if (start >= fileSize || start < 0 || end >= fileSize || end < start) {
                res.status(416).send('Requested Range Not Satisfiable');
                return;
            }

            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/webm',
                'Access-Control-Allow-Origin': Origin, // Replace with your frontend origin
                'Access-Control-Allow-Headers': 'Range',
                'Cross-Origin-Resource-Policy': 'cross-origin' // Add this line
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/webm',
                'Access-Control-Allow-Origin': Origin, // Replace with your frontend origin
                'Cross-Origin-Resource-Policy': 'cross-origin' // Add this line
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {

        return errorHandler(res, null, null, null, error);
    }
};
const DeleteVideo = async (req, res) => {
    try {
        const videoPath = path.join(process.cwd(), "videos", req.params.filename);
        if (!fs.existsSync(videoPath)) {
            let error = new Error('Video not found');
            error.statusCode = 404;
            throw error;
        }
        fs.unlinkSync(videoPath);
        return sendResponse(res, 200, "Video deleted successfully", null);
    }
    catch (error) {
        return errorHandler(res, null, null, null, error);
    }
}


module.exports = { VideoStream, DeleteVideo };