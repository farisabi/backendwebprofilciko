const mongoose = require('mongoose');

const KegiatanTamtama = new mongoose.Schema({
    nama_kegiatan :{
        type: String
    },
    tanggal_mulai :{
        type: Date
    },
    tanggal_akhir :{
        type: Date
    },
    kegiatan :{
        type: String
    }
})

module.exports = mongoose.model('tabel_kegiatan_tamtama', KegiatanTamtama);