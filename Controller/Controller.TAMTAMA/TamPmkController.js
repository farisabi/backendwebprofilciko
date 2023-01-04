const TamPmk = require("../../Models/TAMTAMA/Tam_Pmk")
const readXlsxFile = require('read-excel-file/node');

global.__basedir = __dirname;

exports.getTamPmk = async (req, res) => {
    try {
        const tabel = await TamPmk.find();
        res.json(tabel);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getTamPmkById = async (req, res) => {
    try {
        const tabel = await TamPmk.findById(req.params.id);
        res.json(tabel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.saveTamPmk = async (req, res) => {
    const tabel = new TamPmk(req.body);
    try {
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateTamPmk = async (req, res) => {
    try {
        const updatetable = await TamPmk.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(updatetable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteTamPmk = async (req, res) => {
    try {
        const deletedtable = await TamPmk.deleteOne({ _id: req.params.id });
        res.status(201).json(deletedtable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.importTamPmk = (req, res) => {

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
                    nilai_Pmk: rows[i][7],
                    nilai_Pmk: rows[i][8],
                    nilai_akhir: rows[i][9]
                }

                customers.push(customer);
            }

            TamPmk.insertMany(customers).then(() => {
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