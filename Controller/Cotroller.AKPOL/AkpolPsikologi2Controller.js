const AkpolPsikologi2 = require("../../Models/AKPOL/Akpol_Psikologi2")
const readXlsxFile = require('read-excel-file/node');

global.__basedir = __dirname;

exports.getAkpolPsikologi2 = async (req, res) => {
    try {
        const tabel = await AkpolPsikologi2.find();
        res.json(tabel);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAkpolPsikologi2ById = async (req, res) => {
    try {
        const tabel = await AkpolPsikologi2.findById(req.params.id);
        res.json(tabel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.saveAkpolPsikologi2 = async (req, res) => {
    const tabel = new AkpolPsikologi2(req.body);
    try {
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateAkpolPsikologi2 = async (req, res) => {
    try {
        const updatetable = await AkpolPsikologi2.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(updatetable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAkpolPsikologi2 = async (req, res) => {
    try {
        const deletedtable = await AkpolPsikologi2.deleteOne({ _id: req.params.id });
        res.status(201).json(deletedtable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.importAkpolPsikologi2 = (req, res) => {

    try {
        let filePath = __basedir + "/public/uploads/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);

            // Remove Header ROW
            rows.shift();

            const customers = [];

            let length = rows.length;

            for (let i = 0; i < length; i++) {

                let customer = {
                    nomor_registrasi_online: rows[i][0],
                    nomor_ujian: rows[i][1],
                    nama: rows[i][2],
                    jenis_kelamin: rows[i][3],
                    jalur: rows[i][4],
                    asal_polres: rows[i][5],
                    nilai_psikologi: rows[i][6],
                    nilai_akademik: rows[i][7],
                    nilai_Psikologi2: rows[i][8],
                    nilai_akhir: rows[i][9]
                }

                customers.push(customer);
            }

            AkpolPsikologi2.insertMany(customers).then(() => {
                const result = {
                    status: "ok",
                    filename: req.file.originalname,
                    message: "Upload Successfully!",
                }

                res.json(result);
            });
        });
    } catch (error) {
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}