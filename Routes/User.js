const express       = require('express');
const router        = express.Router()
const upload = require('../Controller/Multer');

const { DaftarUser, LoginUser, getUser }  = require ('../Controller/UserController');
const { runValidation, validationDaftar, validationLogin } = require('../validation')
const middleware  = require('../middleware/middleware')

const { getAkpolPsikologi, getAkpolPsikologiById, saveAkpolPsikologi, importAkpolPsikologi, updateAkpolPsikologi, deleteAkpolPsikologi } = require('../Controller/Cotroller.AKPOL/AkpolPsikologiController');
const { getAkpolAkademik, getAkpolAkademikById, saveAkpolAkademik, importAkpolAkademik, updateAkpolAkademik, deleteAkpolAkademik, getPage, getAkpolPage } = require('../Controller/Cotroller.AKPOL/AkpolAkademikController');
const { getAkpolJasmani, getAkpolJasmaniById, saveAkpolJasmani, importAkpolJasmani, updateAkpolJasmani, deleteAkpolJasmani } = require('../Controller/Cotroller.AKPOL/AkpolJasmaniController');
const { getBakPsikologi, getBakPsikologiById, saveBakPsikologi, importBakPsikologi, updateBakPsikologi, deleteBakPsikologi } = require('../Controller/Controller.BAKOMSUS/BakPsikologiController');
const { getBakAkademik, getBakAkademikById, importBakAkademik, updateBakAkademik, deleteBakAkademik, saveBakAkademik } = require('../Controller/Controller.BAKOMSUS/BakAkademikController');
const { getBakJasmani, getBakJasmaniById, saveBakJasmani, importBakJasmani, updateBakJasmani, deleteBakJasmani } = require('../Controller/Controller.BAKOMSUS/BakJasmaniController');
const { getAkpolPmk, getAkpolPmkById, saveAkpolPmk, importAkpolPmk, updateAkpolPmk, deleteAkpolPmk } = require('../Controller/Cotroller.AKPOL/AkpolPmkController');
const { getAkpolPsikologi2, getAkpolPsikologi2ById, saveAkpolPsikologi2, importAkpolPsikologi2, updateAkpolPsikologi2, deleteAkpolPsikologi2 } = require('../Controller/Cotroller.AKPOL/AkpolPsikologi2Controller');
const { getAkpolRakminAwal, getAkpolRakminAwalById, saveAkpolRakminAwal, importAkpolRakminAwal, updateAkpolRakminAwal, deleteAkpolRakminAwal } = require('../Controller/Cotroller.AKPOL/AkpolRakminAwalController');
const { getAkpolRakminAkhir, getAkpolRakminAkhirById, saveAkpolRakminAkhir, importAkpolRakminAkhir, updateAkpolRakminAkhir, deleteAkpolRakminAkhir } = require('../Controller/Cotroller.AKPOL/AkpolRakminAkhirController');
const { getAkpolRikes1, getAkpolRikes1ById, saveAkpolRikes1, importAkpolRikes1, updateAkpolRikes1, deleteAkpolRikes1 } = require('../Controller/Cotroller.AKPOL/AkpolRikes1Controller');
const { getAkpolRikes2, getAkpolRikes2ById, saveAkpolRikes2, importAkpolRikes2, updateAkpolRikes2, deleteAkpolRikes2 } = require('../Controller/Cotroller.AKPOL/AkpolRikes2Controller');
const { getAkpolSidangAkhir, getAkpolSidangAkhirById, saveAkpolSidangAkhir, importAkpolSidangAkhir, updateAkpolSidangAkhir, deleteAkpolSidangAkhir } = require('../Controller/Cotroller.AKPOL/AkpolSidangAkhirController');
const { getAkpolSidangRikes2, getAkpolSidangRikes2ById, saveAkpolSidangRikes2, importAkpolSidangRikes2, updateAkpolSidangRikes2, deleteAkpolSidangRikes2 } = require('../Controller/Cotroller.AKPOL/AkpolSidangRikes2Controller');
const { getBakPsikologi2, getBakPsikologi2ById, saveBakPsikologi2, importBakPsikologi2, updateBakPsikologi2, deleteBakPsikologi2 } = require('../Controller/Controller.BAKOMSUS/BakPsikologi2Controller');
const { getBakPmk, getBakPmkById, saveBakPmk, importBakPmk, updateBakPmk, deleteBakPmk } = require('../Controller/Controller.BAKOMSUS/BakPmkController');
const { getBakRakminAkhir, getBakRakminAkhirById, saveBakRakminAkhir, importBakRakminAkhir, updateBakRakminAkhir, deleteBakRakminAkhir } = require('../Controller/Controller.BAKOMSUS/BakRakminAkhirController');
const { getBakRakminAwal, getBakRakminAwalById, saveBakRakminAwal, importBakRakminAwal, updateBakRakminAwal, deleteBakRakminAwal } = require('../Controller/Controller.BAKOMSUS/BakRakminAwalController');
const { getBakRikes1, getBakRikes1ById, saveBakRikes1, importBakRikes1, updateBakRikes1, deleteBakRikes1 } = require('../Controller/Controller.BAKOMSUS/BakRikes1Controller');
const { getBakRikes2, getBakRikes2ById, saveBakRikes2, importBakRikes2, updateBakRikes2, deleteBakRikes2 } = require('../Controller/Controller.BAKOMSUS/BakRikes2Controller');
const { getBakSidangAkhir, getBakSidangAkhirById, saveBakSidangAkhir, importBakSidangAkhir, updateBakSidangAkhir, deleteBakSidangAkhir } = require('../Controller/Controller.BAKOMSUS/BakSidangAkhirController');
const { getBakSidangRikes2, getBakSidangRikes2ById, saveBakSidangRikes2, importBakSidangRikes2, updateBakSidangRikes2, deleteBakSidangRikes2 } = require('../Controller/Controller.BAKOMSUS/BakSidangRikes2Controller');
const { getTamPsikologi, getTamPsikologiById, saveTamPsikologi, importTamPsikologi, updateTamPsikologi, deleteTamPsikologi } = require('../Controller/Controller.TAMTAMA/TamPsikologiController');
const { getTamPsikologi2, getTamPsikologi2ById, saveTamPsikologi2, importTamPsikologi2, updateTamPsikologi2, deleteTamPsikologi2 } = require('../Controller/Controller.TAMTAMA/TamPsikologi2Controller');
const { getTamAkademik, getTamAkademikById, saveTamAkademik, importTamAkademik, updateTamAkademik, deleteTamAkademik } = require('../Controller/Controller.TAMTAMA/TamAkademikController');
const { getTamJasmani, getTamJasmaniById, saveTamJasmani, importTamJasmani, updateTamJasmani, deleteTamJasmani } = require('../Controller/Controller.TAMTAMA/TamJasmaniController');
const { getTamPmk, getTamPmkById, saveTamPmk, importTamPmk, updateTamPmk, deleteTamPmk } = require('../Controller/Controller.TAMTAMA/TamPmkController');
const { getTamRakminAkhir, getTamRakminAkhirById, saveTamRakminAkhir, importTamRakminAkhir, updateTamRakminAkhir, deleteTamRakminAkhir } = require('../Controller/Controller.TAMTAMA/TamRakminAkhirController');
const { getTamRakminAwal, getTamRakminAwalById, saveTamRakminAwal, importTamRakminAwal, updateTamRakminAwal, deleteTamRakminAwal } = require('../Controller/Controller.TAMTAMA/TamRakminAwalController');
const { getTamRikes1, getTamRikes1ById, saveTamRikes1, importTamRikes1, updateTamRikes1, deleteTamRikes1 } = require('../Controller/Controller.TAMTAMA/TamRikes1Controller');
const { getTamRikes2, getTamRikes2ById, saveTamRikes2, importTamRikes2, updateTamRikes2, deleteTamRikes2 } = require('../Controller/Controller.TAMTAMA/TamRikes2Controller');
const { getTamSidangAkhir, saveTamSidangAkhir, importTamSidangAkhir, updateTamSidangAkhir, deleteTamSidangAkhir } = require('../Controller/Controller.TAMTAMA/TamSidangAkhirController');
const { getTamSidangRikes2, getTamSidangRikes2ById, saveTamSidangRikes2, importTamSidangRikes2, updateTamSidangRikes2, deleteTamSidangRikes2 } = require('../Controller/Controller.TAMTAMA/TamSidangRikes2Controller');
const { getKegiatanAkpol, getKegiatanAkpolById, saveKegiatanAkpol, updateKegiatanAkpol, deleteKegiatanAkpol } = require('../Controller/Controller.Kegiatan/Akpol');
const { getKegiatanBintara, getKegiatanBintaraById, saveKegiatanBintara, updateKegiatanBintara, deleteKegiatanBintara } = require('../Controller/Controller.Kegiatan/Bintara');
const { getKegiatanTamtama, getKegiatanTamtamaById, saveKegiatanTamtama, updateKegiatanTamtama, deleteKegiatanTamtama } = require('../Controller/Controller.Kegiatan/Tamtama');




// Route Tabel User
router.post('/daftar', validationDaftar, runValidation, DaftarUser);
router.post('/login', validationLogin, runValidation, LoginUser);
router.get('/user', middleware, getUser);

// Route Tabel Kegiatan
//Akpol
router.get('/kegiatanakpol', getKegiatanAkpol)
router.get('/kegiatanakpol/:id', getKegiatanAkpolById)
router.post('/kegiatanakpol', saveKegiatanAkpol)
router.patch('/kegiatanakpol/:id', updateKegiatanAkpol)
router.delete('/kegiatanakpol/:id', deleteKegiatanAkpol)

//Binatara
router.get('/kegiatanbintara', getKegiatanBintara)
router.get('/kegiatanbintara/:id', getKegiatanBintaraById)
router.post('/kegiatanbintara', saveKegiatanBintara)
router.patch('/kegiatanbintara/:id', updateKegiatanBintara)
router.delete('/kegiatanbintara/:id', deleteKegiatanBintara)

//Tamtama
router.get('/kegiatantamtama', getKegiatanTamtama)
router.get('/kegiatantamtama/:id', getKegiatanTamtamaById)
router.post('/kegiatantamtama', saveKegiatanTamtama)
router.patch('/kegiatantamtama/:id', updateKegiatanTamtama)
router.delete('/kegiatantamtama/:id', deleteKegiatanTamtama)



//Route Tabel Akpol
//Psikologi
router.get('/tabelakpolpsikologi', getAkpolPsikologi);
router.get('/tabelakpolpsikologi/:id', getAkpolPsikologiById);
router.post('/tabelakpolpsikologi', saveAkpolPsikologi);
router.post('/tabelimportakpolpsikologi', upload.single("excel"), importAkpolPsikologi);
router.patch('/tabelakpolpsikologi/:id', updateAkpolPsikologi);
router.delete('/tabelakpolpsikologi/:id', deleteAkpolPsikologi);

//Akademik
router.get('/tabelakpolakademik', getAkpolAkademik);
router.get('/tabelakpolakademik/:id', getAkpolAkademikById);
router.post('/tabelakpolakademik', saveAkpolAkademik);
router.post('/tabelimportakpolakademik', upload.single("excel"), importAkpolAkademik);
router.patch('/tabelakpolakademik/:id', updateAkpolAkademik);
router.delete('/tabelakpolakademik/:id', deleteAkpolAkademik);
// router.get('/tabelakpolakademik', getAkpolPage);

//Jasmani
router.get('/tabelakpoljasmani', getAkpolJasmani);
router.get('/tabelakpoljasmani/:id', getAkpolJasmaniById);
router.post('/tabelakpoljasmani', saveAkpolJasmani);
router.post('/tabelimportakpoljasmani', upload.single("excel"), importAkpolJasmani);
router.patch('/tabelakpoljasmani/:id', updateAkpolJasmani);
router.delete('/tabelakpoljasmani/:id', deleteAkpolJasmani);

//PMK
router.get('/tabelakpolpmk', getAkpolPmk);
router.get('/tabelakpolpmk/:id', getAkpolPmkById);
router.post('/tabelakpolpmk', saveAkpolPmk);
router.post('/tabelimportakpolpmk', upload.single("excel"), importAkpolPmk);
router.patch('/tabelakpolpmk/:id', updateAkpolPmk);
router.delete('/tabelakpolpmk/:id', deleteAkpolPmk);

//Psikologi2
router.get('/tabelakpolpsikologi2', getAkpolPsikologi2);
router.get('/tabelakpolpsikologi2/:id', getAkpolPsikologi2ById);
router.post('/tabelakpolpsikologi2', saveAkpolPsikologi2);
router.post('/tabelimportakpolpsikologi2', upload.single("excel"), importAkpolPsikologi2);
router.patch('/tabelakpolpsikologi2/:id', updateAkpolPsikologi2);
router.delete('/tabelakpolpsikologi2/:id', deleteAkpolPsikologi2);

//RakminAwal
router.get('/tabelakpolrakminawal', getAkpolRakminAwal);
router.get('/tabelakpolrakminawal/:id', getAkpolRakminAwalById);
router.post('/tabelakpolrakminawal', saveAkpolRakminAwal);
router.post('/tabelimportakpolrakminawal', upload.single("excel"), importAkpolRakminAwal);
router.patch('/tabelakpolrakminawal/:id', updateAkpolRakminAwal);
router.delete('/tabelakpolrakminawal/:id', deleteAkpolRakminAwal);

//RakminAkhir
router.get('/tabelakpolrakminakhir', getAkpolRakminAkhir);
router.get('/tabelakpolrakminakhir/:id', getAkpolRakminAkhirById);
router.post('/tabelakpolrakminakhir', saveAkpolRakminAkhir);
router.post('/tabelimportakpolrakminakhir', upload.single("excel"), importAkpolRakminAkhir);
router.patch('/tabelakpolrakminakhir/:id', updateAkpolRakminAkhir);
router.delete('/tabelakpolrakminakhir/:id', deleteAkpolRakminAkhir);

//Rikes 1
router.get('/tabelakpolrikes1', getAkpolRikes1);
router.get('/tabelakpolrikes1/:id', getAkpolRikes1ById);
router.post('/tabelakpolrikes1', saveAkpolRikes1);
router.post('/tabelimportakpolrikes1', upload.single("excel"), importAkpolRikes1);
router.patch('/tabelakpolrikes1/:id', updateAkpolRikes1);
router.delete('/tabelakpolrikes1/:id', deleteAkpolRikes1);

//Rikes2
router.get('/tabelakpolrikes2', getAkpolRikes2);
router.get('/tabelakpolrikes2/:id', getAkpolRikes2ById);
router.post('/tabelakpolrikes2', saveAkpolRikes2);
router.post('/tabelimportakpolrikes2', upload.single("excel"), importAkpolRikes2);
router.patch('/tabelakpolrikes2/:id', updateAkpolRikes2);
router.delete('/tabelakpolrikes2/:id', deleteAkpolRikes2);

//SidangAkhir
router.get('/tabelakpolsidangakhir', getAkpolSidangAkhir);
router.get('/tabelakpolsidangakhir/:id', getAkpolSidangAkhirById);
router.post('/tabelakpolsidangakhir', saveAkpolSidangAkhir);
router.post('/tabelimportakpolsidangakhir', upload.single("excel"), importAkpolSidangAkhir);
router.patch('/tabelakpolsidangakhir/:id', updateAkpolSidangAkhir);
router.delete('/tabelakpolsidangakhir/:id', deleteAkpolSidangAkhir);

//SidangRikes2
router.get('/tabelakpolsidangrikes2', getAkpolSidangRikes2);
router.get('/tabelakpolsidangrikes2/:id', getAkpolSidangRikes2ById);
router.post('/tabelakpolsidangrikes2', saveAkpolSidangRikes2);
router.post('/tabelimportakpolsidangrikes2', upload.single("excel"), importAkpolSidangRikes2);
router.patch('/tabelakpolsidangrikes2/:id', updateAkpolSidangRikes2);
router.delete('/tabelakpolsidangrikes2/:id', deleteAkpolSidangRikes2);




//Route Tabel Bintara
//Psikologi
router.get('/tabelbakpsikologi', getBakPsikologi);
router.get('/tabelbakpsikologi/:id', getBakPsikologiById);
router.post('/tabelbakpsikologi', saveBakPsikologi);
router.post('/tabelimportbakpsikologi', upload.single("excel"), importBakPsikologi);
router.patch('/tabelbakpsikologi/:id', updateBakPsikologi);
router.delete('/tabelbakpsikologi/:id', deleteBakPsikologi);

//Psikologi2
router.get('/tabelbakpsikologi2', getBakPsikologi2);
router.get('/tabelbakpsikologi2/:id', getBakPsikologi2ById);
router.post('/tabelbakpsikologi2', saveBakPsikologi2);
router.post('/tabelimportbakpsikologi2', upload.single("excel"), importBakPsikologi2);
router.patch('/tabelbakpsikologi2/:id', updateBakPsikologi2);
router.delete('/tabelbakpsikologi2/:id', deleteBakPsikologi2);

//Akademik
router.get('/tabelbakakademik', getBakAkademik);
router.get('/tabelbakakademik/:id', getBakAkademikById);
router.post('/tabelbakakademik', saveBakAkademik);
router.post('/tabelimportbakakademik', upload.single("excel"), importBakAkademik);
router.patch('/tabelbakakademik/:id', updateBakAkademik);
router.delete('/tabelbakakademik/:id', deleteBakAkademik);

//Jasmani
router.get('/tabelbakjasmani', getBakJasmani);
router.get('/tabelbakjasmani/:id', getBakJasmaniById);
router.post('/tabelbakjasmani', saveBakJasmani);
router.post('/tabelimportbakjasmani', upload.single("excel"), importBakJasmani);
router.patch('/tabelbakjasmani/:id', updateBakJasmani);
router.delete('/tabelbakjasmani/:id', deleteBakJasmani);

//PMK
router.get('/tabelbakpmk', getBakPmk);
router.get('/tabelbakpmk/:id', getBakPmkById);
router.post('/tabelbakpmk', saveBakPmk);
router.post('/tabelimportbakpmk', upload.single("excel"), importBakPmk);
router.patch('/tabelbakpmk/:id', updateBakPmk);
router.delete('/tabelbakpmk/:id', deleteBakPmk);

//Rakmin Akhir
router.get('/tabelbakrakminakhir', getBakRakminAkhir);
router.get('/tabelbakrakminakhir/:id', getBakRakminAkhirById);
router.post('/tabelbakrakminakhir', saveBakRakminAkhir);
router.post('/tabelimportbakrakminakhir', upload.single("excel"), importBakRakminAkhir);
router.patch('/tabelbakrakminakhir/:id', updateBakRakminAkhir);
router.delete('/tabelbakrakminakhir/:id', deleteBakRakminAkhir);

//Rakmin Awal
router.get('/tabelbakrakminawal', getBakRakminAwal);
router.get('/tabelbakrakminawal/:id', getBakRakminAwalById);
router.post('/tabelbakrakminawal', saveBakRakminAwal);
router.post('/tabelimportbakrakminawal', upload.single("excel"), importBakRakminAwal);
router.patch('/tabelbakrakminawal/:id', updateBakRakminAwal);
router.delete('/tabelbakrakminawal/:id', deleteBakRakminAwal);

//Rikes 1
router.get('/tabelbakrikes1', getBakRikes1);
router.get('/tabelbakrikes1/:id', getBakRikes1ById);
router.post('/tabelbakrikes1', saveBakRikes1);
router.post('/tabelimportbakrikes1', upload.single("excel"), importBakRikes1);
router.patch('/tabelbakrikes1/:id', updateBakRikes1);
router.delete('/tabelbakrikes1/:id', deleteBakRikes1);

//Rikes 2
router.get('/tabelbakrikes2', getBakRikes2);
router.get('/tabelbakrikes2/:id', getBakRikes2ById);
router.post('/tabelbakrikes2', saveBakRikes2);
router.post('/tabelimportbakrikes2', upload.single("excel"), importBakRikes2);
router.patch('/tabelbakrikes2/:id', updateBakRikes2);
router.delete('/tabelbakrikes2/:id', deleteBakRikes2);

//Sidang Akhir
router.get('/tabelbaksidangakhir', getBakSidangAkhir);
router.get('/tabelbaksidangakhir/:id', getBakSidangAkhirById);
router.post('/tabelbaksidangakhir', saveBakSidangAkhir);
router.post('/tabelimportbaksidangakhir', upload.single("excel"), importBakSidangAkhir);
router.patch('/tabelbaksidangakhir/:id', updateBakSidangAkhir);
router.delete('/tabelbaksidangakhir/:id', deleteBakSidangAkhir);

//Sidang Rikes2
router.get('/tabelbaksidangrikes2', getBakSidangRikes2);
router.get('/tabelbaksidangrikes2/:id', getBakSidangRikes2ById);
router.post('/tabelbaksidangrikes2', saveBakSidangRikes2);
router.post('/tabelimportbaksidangrikes2', upload.single("excel"), importBakSidangRikes2);
router.patch('/tabelbaksidangrikes2/:id', updateBakSidangRikes2);
router.delete('/tabelbaksidangrikes2/:id', deleteBakSidangRikes2);




//Route Tabel TAMTAMA
//Psikologi
router.get('/tabeltampsikologi', getTamPsikologi);
router.get('/tabeltampsikologi/:id', getTamPsikologiById);
router.post('/tabeltampsikologi', saveTamPsikologi);
router.post('/tabelimporttampsikologi', upload.single("excel"), importTamPsikologi);
router.patch('/tabeltampsikologi/:id', updateTamPsikologi);
router.delete('/tabeltampsikologi/:id', deleteTamPsikologi);

//Psikologi2
router.get('/tabeltampsikologi2', getTamPsikologi2);
router.get('/tabeltampsikologi2/:id', getTamPsikologi2ById);
router.post('/tabeltampsikologi2', saveTamPsikologi2);
router.post('/tabelimporttampsikologi2', upload.single("excel"), importTamPsikologi2);
router.patch('/tabeltampsikologi2/:id', updateTamPsikologi2);
router.delete('/tabeltampsikologi2/:id', deleteTamPsikologi2);

//Akademik
router.get('/tabeltamakademik', getTamAkademik);
router.get('/tabeltamakademik/:id', getTamAkademikById);
router.post('/tabeltamakademik', saveTamAkademik);
router.post('/tabelimporttamakademik', upload.single("excel"), importTamAkademik);
router.patch('/tabeltamakademik/:id', updateTamAkademik);
router.delete('/tabeltamakademik/:id', deleteTamAkademik);

//Jasmani
router.get('/tabeltamjasmani', getTamJasmani);
router.get('/tabeltamjasmani/:id', getTamJasmaniById);
router.post('/tabeltamjasmani', saveTamJasmani);
router.post('/tabelimporttamjasmani', upload.single("excel"), importTamJasmani);
router.patch('/tabeltamjasmani/:id', updateTamJasmani);
router.delete('/tabeltamjasmani/:id', deleteTamJasmani);

//PMK
router.get('/tabeltampmk', getTamPmk);
router.get('/tabeltampmk/:id', getTamPmkById);
router.post('/tabeltampmk', saveTamPmk);
router.post('/tabelimporttampmk', upload.single("excel"), importTamPmk);
router.patch('/tabeltampmk/:id', updateTamPmk);
router.delete('/tabeltampmk/:id', deleteTamPmk);

//Rakmin Akhir
router.get('/tabeltamrakminakhir', getTamRakminAkhir);
router.get('/tabeltamrakminakhir/:id', getTamRakminAkhirById);
router.post('/tabeltamrakminakhir', saveTamRakminAkhir);
router.post('/tabelimporttamrakminakhir', upload.single("excel"), importTamRakminAkhir);
router.patch('/tabeltamrakminakhir/:id', updateTamRakminAkhir);
router.delete('/tabeltamrakminakhir/:id', deleteTamRakminAkhir);

//Rakmin Awal
router.get('/tabeltamrakminawal', getTamRakminAwal);
router.get('/tabeltamrakminawal/:id', getTamRakminAwalById);
router.post('/tabeltamrakminawal', saveTamRakminAwal);
router.post('/tabelimporttamrakminawal', upload.single("excel"), importTamRakminAwal);
router.patch('/tabeltamrakminawal/:id', updateTamRakminAwal);
router.delete('/tabeltamrakminawal/:id', deleteTamRakminAwal);

//Rikes 1
router.get('/tabeltamrikes1', getTamRikes1);
router.get('/tabeltamrikes1/:id', getTamRikes1ById);
router.post('/tabeltamrikes1', saveTamRikes1);
router.post('/tabelimporttamrikes1', upload.single("excel"), importTamRikes1);
router.patch('/tabeltamrikes1/:id', updateTamRikes1);
router.delete('/tabeltamrikes1/:id', deleteTamRikes1);

//Rikes 2
router.get('/tabeltamrikes2', getTamRikes2);
router.get('/tabeltamrikes2/:id', getTamRikes2ById);
router.post('/tabeltamrikes2', saveTamRikes2);
router.post('/tabelimporttamrikes2', upload.single("excel"), importTamRikes2);
router.patch('/tabeltamrikes2/:id', updateTamRikes2);
router.delete('/tabeltamrikes2/:id', deleteTamRikes2);

//Sidang Akhir
router.get('/tabeltamsidangakhir', getTamSidangAkhir);
router.get('/tabeltamsidangakhir/:id', getTamSidangAkhir);
router.post('/tabeltamsidangakhir', saveTamSidangAkhir);
router.post('/tabelimporttamsidangakhir', upload.single("excel"), importTamSidangAkhir);
router.patch('/tabeltamsidangakhir/:id', updateTamSidangAkhir);
router.delete('/tabeltamsidangakhir/:id', deleteTamSidangAkhir);

//Sidang Rikes2
router.get('/tabeltamsidangrikes2', getTamSidangRikes2);
router.get('/tabeltamsidangrikes2/:id', getTamSidangRikes2ById);
router.post('/tabeltamsidangrikes2', saveTamSidangRikes2);
router.post('/tabelimporttamsidangrikes2', upload.single("excel"), importTamSidangRikes2);
router.patch('/tabeltamsidangrikes2/:id', updateTamSidangRikes2);
router.delete('/tabeltamsidangrikes2/:id', deleteTamSidangRikes2);



module.exports = router