const mongoose = require('mongoose');

const TableAkademik = new mongoose.Schema({
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
    jalur :{
        type: String
    },
    asal_polres :{
        type: String
    },
    nilai_psikologi :{
        type: String
    },
    nilai_akademik :{
        type: String
    },
    nilai_jasmani :{
        type: String
    },
    nilai_akhir :{
        type: String
    }
})

module.exports = mongoose.model('tabel_akademik', TableAkademik);