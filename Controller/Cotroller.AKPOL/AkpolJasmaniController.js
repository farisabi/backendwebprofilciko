const AkpolJasmani = require("../../Models/AKPOL/Akpol_Jasmani")
const readXlsxFile = require('read-excel-file/node');

global.__basedir = __dirname;

exports.getAkpolJasmani = async (req, res) => {
    try {
        const tabel = await AkpolJasmani.find();
        res.json(tabel);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAkpolJasmaniById = async (req, res) => {
    try {
        const tabel = await AkpolJasmani.findById(req.params.id);
        res.json(tabel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.saveAkpolJasmani = async (req, res) => {
    const tabel = new AkpolJasmani(req.body);
    try {
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateAkpolJasmani = async (req, res) => {
    try {
        const updatetable = await AkpolJasmani.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(updatetable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAkpolJasmani = async (req, res) => {
    try {
        const deletedtable = await AkpolJasmani.deleteOne({ _id: req.params.id });
        res.status(201).json(deletedtable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.importAkpolJasmani = (req, res) => {

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
                    nilai_jasmani: rows[i][8],
                    nilai_akhir: rows[i][9]
                }

                customers.push(customer);
            }

            AkpolJasmani.insertMany(customers).then(() => {
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