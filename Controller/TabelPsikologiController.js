const TabelPsikologi =  require ("../Models/TabelPsikologi");

exports.getTablePsikologi = async (req, res) =>{
    try{
        const tabel = await TabelPsikologi.find();
        res.json(tabel);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.getTablePsikologiById = async (req, res) =>{
    try{
        const tabel = await TabelPsikologi.findById(req.params.id);
        res.json(tabel);
    }catch (error){
        res.status(404).json({message: error.message})
    }
}

exports.savetablepsikologi = async (req, res) =>{
    const tabel = new TabelPsikologi(req.body);
    try{
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.updateTablepsikologi = async (req, res) =>{
    try{
        const updatetable = await TabelPsikologi.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(201).json(updatetable);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.deleteTablepsikologi = async (req, res) =>{
    try{
        const deletedtable = await TabelPsikologi.deleteOne({_id:req.params.id});
        res.status(201).json(deletedtable);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}