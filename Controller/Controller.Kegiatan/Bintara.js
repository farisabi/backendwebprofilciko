const KegiatanBintara = require('../../Models/Kegiatan/Bintara') 

exports.getKegiatanBintara = async (req, res) =>{
    try{
        const tabel = await KegiatanBintara.find();
        res.json(tabel);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.getKegiatanBintaraById = async (req, res) =>{
    try{
        const tabel = await KegiatanBintara.findById(req.params.id);
        res.json(tabel);
    }catch (error){
        res.status(404).json({message: error.message})
    }
}

exports.saveKegiatanBintara = async (req, res) =>{
    const tabel = new KegiatanBintara(req.body);
    try{
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.updateKegiatanBintara = async (req, res) =>{
    try{
        const updatetabel = await KegiatanBintara.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(201).json(updatetabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.deleteKegiatanBintara = async (req, res) =>{
    try{
        const deletedtabel = await KegiatanBintara.deleteOne({_id:req.params.id});
        res.status(201).json(deletedtabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}