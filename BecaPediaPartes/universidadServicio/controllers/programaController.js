const { ObjectID }=require("mongodb");
const assert=require("assert");
/**
 * Controladores
 */

const getProgramas=(db,callback)=>{
    db.collection("programas").find({}).toArray(function(err,ans) {
       assert.equal(err,null);
       if(err)
       {
           callback(500,"Server error collecting data");
       }
       else
       {
           callback(200,ans);
       }
    });
};

const getProgramaID=async function(db,req,callback){
    var o_id=ObjectId(req.params.id);
    var programa=await db.collection("programas").findOne({_id:o_id},(err,res)=>{
        assert.equal(err,null);
       if(res===null)
       {
           callback(404,"Program doesn´t exist");
       }
       else
       {
           callback(200,ans);
       }
    });
};

const getProgramaUniversidad=async function(db,req,callback){
    var id_universidad=ObjectId(req.params.id_universidad);
    db.collection("programas").find({id_universidad:id_universidad}).toArray(function(err,ans) {
        assert.equal(err,null);
        if(err)
        {
            callback(500,"Server error collecting data");
        }
        else
        {
            callback(200,ans);
        }
    });
};

const getProgramaNivel=async function(db,req,callback){
    var nivel=req.params.nivel;
    db.collection("programas").find({nivel:nivel}).toArray(function(err,ans) {
        assert.equal(err,null);
        if(err)
        {
            callback(500,"Server error collecting data");
        }
        else
        {
            callback(200,ans);
        }
    });
};

const createPrograma=async function(db,req,callback){
    const programa=req.body;
    programa.interested=[];
    programa.videos=[];
    programa.documentos=[];

    db.collection("programas").insertOne(programa, (err, res) => {
        assert.equal(err, null);
        callback(200, res.ops[0]);
    });
};

const updatePrograma=async function(db,req,callback){
    var o_id = new ObjectId(req.params.id);
    var result = await db.collection("programas").updateOne({ _id: o_id }, { $set: req.body });
    if (result.matchedCount !== 1) 
    {
      callback(404, "The program to update doesn´t exist");
    } 
    else 
    {
      db.collection("programas").findOne({ _id: o_id }).then((ans) => {callback(200, ans);}).catch((err) => console.log(err));
    }
};

const deletePrograma=async function(db,req,callback){
    var o_id = new ObjectId(req.params.id);
    db.collection("programas").deleteOne({ _id: o_id }, (err, result) => {
      assert.equal(err, null);
      if (result.deletedCount !== 1) 
      {
        callback(404, "The program to delete doesn´t exist");
      } 
      else 
      {
        callback(200, "Successfully deleted");
      }
    });
};

exports.getProgramas=getProgramas;
exports.getProgramaID=getProgramaID;
exports.getProgramaUniversidad=getProgramaUniversidad;
exports.getProgramaNivel=getProgramaNivel;
exports.createPrograma=createPrograma;
exports.updatePrograma=updatePrograma;
exports.deletePrograma=deletePrograma;