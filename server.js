const exp = require("constants");
const express = require("express");
const connection = require("./db.js");
const multer = require("multer");

const PORT = 5000;
const app = express();

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});


// Uploading file/files using multer with MySQL
app.post("/upload", upload.single("file"), (req, res) => {
const { filename, path, originalname, mimetype, size } = req.file;

const query1 = `insert into files (filename,path,originalname,mimetype,size) values (?,?,?,?,?)`;
try {
    connection.query(
    query1,
    [filename, path, originalname, mimetype, size],
    (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        } else {
        res.status(200).send(`${req.file.originalname}`);
        // res.send("file uploaded...");
        }
    }
    );
    } catch (error) {
    console.log(error);
    res.status(500).send(error);
    }
});

// getting the file using multer with MySQL
app.get('/download/:filename', (req,res)=>{
    console.log(req.params.filename);
    query2 = `select * from files where filename = ?`;
    try {
        connection.query(query2, [req.params.filename], (error,result)=>{
            if (error) {
                res.status(500).send('Internal Server Error...');
            }
            // console.log(result);
            // res.send("File download successfully...");
            res.download(result[0].path, result[0].originalname);
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log("Server Started Successfully...");
});
