const express       = require('express');
const router        = express.Router()
const { DaftarUser, LoginUser, getUser }  = require ('../Controller/UserController');
const {getTable, getTableById, savetable,updateTable, deleteTable} = require ('../Controller/TableController');
const { runValidation, validationDaftar, validationLogin } = require('../validation')
const middleware  = require('../middleware/middleware')

router.post('/daftar', validationDaftar, runValidation, DaftarUser);
router.post('/login', validationLogin, runValidation, LoginUser);
router.get('/user', middleware, getUser);
router.get('/tabel', getTable );
router.get('/tabel/:id', getTableById );
router.post('/tabel', savetable );
router.patch('/tabel/:id', updateTable );
router.delete('/tabel/:id', deleteTable );


module.exports = router