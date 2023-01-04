const TamSidangAkhir = require("../../Models/TAMTAMA/Tam_SidangAkhir")
const readXlsxFile = require('read-excel-file/node');

global.__basedir = __dirname;

exports.getTamSidangAkhir = async (req, res) => {
    try {
        const tabel = await TamSidangAkhir.find();
        res.json(tabel);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getTamSidangAkhirById = async (req, res) => {
    try {
        const tabel = await TamSidangAkhir.findById(req.params.id);
        res.json(tabel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.saveTamSidangAkhir = async (req, res) => {
    const tabel = new TamSidangAkhir(req.body);
    try {
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateTamSidangAkhir = async (req, res) => {
    try {
        const updatetable = await TamSidangAkhir.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(updatetable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteTamSidangAkhir = async (req, res) => {
    try {
        const deletedtable = await TamSidangAkhir.deleteOne({ _id: req.params.id });
        res.status(201).json(deletedtable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.importTamSidangAkhir = (req, res) => {

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
                    nilai_SidangAkhir: rows[i][7],
                    nilai_SidangAkhir: rows[i][8],
                    nilai_akhir: rows[i][9]
                }

                customers.push(customer);
            }

            TamSidangAkhir.insertMany(customers).then(() => {
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