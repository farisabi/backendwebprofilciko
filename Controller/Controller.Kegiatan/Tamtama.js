const KegiatanTamtama = require('../../Models/Kegiatan/Tamtama') 

exports.getKegiatanTamtama = async (req, res) =>{
    try{
        const tabel = await KegiatanTamtama.find();
        res.json(tabel);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.getKegiatanTamtamaById = async (req, res) =>{
    try{
        const tabel = await KegiatanTamtama.findById(req.params.id);
        res.json(tabel);
    }catch (error){
        res.status(404).json({message: error.message})
    }
}

exports.saveKegiatanTamtama = async (req, res) =>{
    const tabel = new KegiatanTamtama(req.body);
    try{
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.updateKegiatanTamtama = async (req, res) =>{
    try{
        const updatetabel = await KegiatanTamtama.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(201).json(updatetabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.deleteKegiatanTamtama = async (req, res) =>{
    try{
        const deletedtabel = await KegiatanTamtama.deleteOne({_id:req.params.id});
        res.status(201).json(deletedtabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}