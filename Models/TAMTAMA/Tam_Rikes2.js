const mongoose = require('mongoose');

const TamRikes2 = new mongoose.Schema({
    nomor_registrasi_online :{
        type: String
    },
    nomor_ujian :{
        type: String
    },
    nama :{
        type: String
    },
    jenis_kelamin :{
        type: String
    },
    asal_polres :{
        type: String
    },
    Hasil :{
        type: String
    }
})

module.exports = mongoose.model('tam_rikes2', TamRikes2);