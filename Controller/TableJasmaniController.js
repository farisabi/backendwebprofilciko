const TableJasmani =  require ("../Models/TableJasmani");

exports.getTableJasmani = async (req, res) =>{
    try{
        const tabel = await TableJasmani.find();
        res.json(tabel);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.getTableJasmaniById = async (req, res) =>{
    try{
        const tabel = await TableJasmani.findById(req.params.id);
        res.json(tabel);
    }catch (error){
        res.status(404).json({message: error.message})
    }
}

exports.saveTableJasmani = async (req, res) =>{
    const tabel = new TableJasmani(req.body);
    try{
        const inserttabel = await tabel.save();
        res.status(201).json(inserttabel);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.updateTableJasmani = async (req, res) =>{
    try{
        const updatetable = await TableJasmani.updateOne({_id:req.params.id}, {$set:req.body});
        res.status(201).json(updatetable);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

exports.deleteTableJasmani = async (req, res) =>{
    try{
        const deletedtable = await TableJasmani.deleteOne({_id:req.params.id});
        res.status(201).json(deletedtable);
    }catch (error){
        res.status(400).json({message: error.message})
    }
}