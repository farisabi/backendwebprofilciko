const mongoose = require('mongoose');

const TamJasmani = new mongoose.Schema({
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

module.exports = mongoose.model('tam_jasmani', TamJasmani);