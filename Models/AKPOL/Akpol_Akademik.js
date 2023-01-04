const mongoose = require('mongoose');

const AkpolAkademik = new mongoose.Schema({
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

module.exports = mongoose.model('akpol_akademik', AkpolAkademik);