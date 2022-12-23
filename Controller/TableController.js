const Table =  require ("../Models/Table");

exports.getTable = async (req, res) =>{
    try{
        const tabel = await Table.find();
        res.json(tabel);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.getTableById = async (req, res) =>{
    try{
        const tabel = await Table.findById(req.params.id);
        res.json(tabel);
    }catch (error){
        res.status(404).json({message: error.message})
    }
}

exports.savetable = async (req, res) =>{
    const tabel = new Table(req.body);
    try{
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.updateTable = async (req, res) =>{
    try{
        const updatetable = await Table.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(201).json(updatetable);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.deleteTable = async (req, res) =>{
    try{
        const deletedtable = await Table.deleteOne({_id:req.params.id});
        res.status(201).json(deletedtable);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}