const { Op } = require("sequelize");
const AkpolAkademik = require("../../Models/AKPOL/Akpol_Akademik.js")
const readXlsxFile = require('read-excel-file/node');

global.__basedir = __dirname;

exports.getAkpolAkademik = async (req, res) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    let totalItems;

    const tabel = await AkpolAkademik.find()
        .countDocuments()
        .then
        (count => {
            totalItems = count;
            return AkpolAkademik.find()
                .skip((parseInt(currentPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage))
        })
        .then(result => {
            res.status(200).json({
                message: 'Data Berhasil Di Panggil',
                data: result,
                total_data: totalItems,
                per_page: parseInt(perPage),
                current_page: parseInt(currentPage)
            })
       
        })
        .catch((error) => {
            res.status(500).json({ message: error.message })
        })

        const {q} = req.query;
        const keys = ["nomor_registrasi_online", "nomor_ujian", "nama"];
        const search = (data) => {
            return data.filter((item) =>
              keys.some((key) => item[key].toLowerCase().includes(q))
            );
        };

        // q ? res.json(search(AkpolAkademik).slice(0, 10)) : res.json(AkpolAkademik.slice(0, 10));

    // try {
    //     const tabel = await AkpolAkademik.find().countDocuments();
    //     const count = () => {
    //         totalItems = count 
    //         return AkpolAkademik.find()
    //             .skip((parseInt(currentPage) - 1) * parseInt(perPage))
    //             .limit(parseInt(perPage))
    //     }
    //     const result =() => {
    //         res.status(200).json({
    //             message: 'Data Berhasil Di Panggil',
    //             data: result,
    //             total_data: totalItems,
    //             per_page: parseInt(perPage),
    //             current_page: parseInt(currentPage)
    //         })
    //     }
    //     res.json(tabel);
    // } catch (error) {
    //     res.status(500).json({ message: error.message })
    // }
}

exports.getAkpolAkademikById = async (req, res) => {
    try {
        const tabel = await AkpolAkademik.findById(req.params.id);
        res.json(tabel);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.saveAkpolAkademik = async (req, res) => {
    const tabel = new AkpolAkademik(req.body);
    try {
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateAkpolAkademik = async (req, res) => {
    try {
        const updatetable = await AkpolAkademik.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json(updatetable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAkpolAkademik = async (req, res) => {
    try {
        const deletedtable = await AkpolAkademik.deleteOne({ _id: req.params.id });
        res.status(201).json(deletedtable);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.importAkpolAkademik = (req, res) => {

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
                    asal_polres: rows[i][4],
                    Hasil: rows[i][5]
                }

                customers.push(customer);
            }

            AkpolAkademik.insertMany(customers).then(() => {
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

exports.getAkpolPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";

        const akpolakademik = await AkpolAkademik.find({ nama: { $regex: search, $options: "i" } })
            .skip(page * limit)
            .limit(limit);

        const total = await AkpolAkademik.countDocuments({
            nama: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            akpolakademik,

        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};
