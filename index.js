const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// file upload
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// file upload
app.use(methodOverride('_method'));


const conn = mongoose.createConnection(
    process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
    () => console.log('db connect')
);

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});


const storage = new GridFsStorage({
    url: process.env.DB_CONNECT,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

app.post('/files', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No Files Exist',
            });
        }
        return res.json(files);
    });
});

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No File Exist'
            });
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image' });
        }
    });
});

app.delete('/files/:id', async (req, res) => {

    const fileExist = await Uploads.find();
    if (!fileExist) return res.status(404).send('No files found');

    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: 'Error Occured' });
        }
        res.status(200).send('success');
    })
});

app.use('/api/auth', require('./routes/auth/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/role', require('./routes/api/role'));
app.use('/api/recipe', require('./routes/api/recipe'));
app.use('/api/ingredient', require('./routes/api/ingredient'));
app.use('/api/step', require('./routes/api/step'));
app.use('/api/like', require('./routes/api/like'));
app.use('/api/subscribe', require('./routes/api/subscribe'));
app.use('/api/save', require('./routes/api/save'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
