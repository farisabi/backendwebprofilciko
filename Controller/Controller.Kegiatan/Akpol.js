const KegiatanAkpol = require('../../Models/Kegiatan/Akpol') 

exports.getKegiatanAkpol = async (req, res) =>{
    try{
        const tabel = await KegiatanAkpol.find();
        res.json(tabel);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.getKegiatanAkpolById = async (req, res) =>{
    try{
        const tabel = await KegiatanAkpol.findById(req.params.id);
        res.json(tabel);
    }catch (error){
        res.status(404).json({message: error.message})
    }
}

exports.saveKegiatanAkpol = async (req, res) =>{
    const tabel = new KegiatanAkpol(req.body);
    try{
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.updateKegiatanAkpol = async (req, res) =>{
    try{
        const updatetabel = await KegiatanAkpol.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(201).json(updatetabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.deleteKegiatanAkpol = async (req, res) =>{
    try{
        const deletedtabel = await KegiatanAkpol.deleteOne({_id:req.params.id});
        res.status(201).json(deletedtabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}