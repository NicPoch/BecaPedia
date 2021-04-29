const {ObjectId}=require("mongodb");
const assert=require("assert");

const getBecas=(db,callback)=>{
    db.collection("becas").find({}).toArray(function(err,ans) {
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
const getBecasID=async function(db,req,callback){
    var o_id=ObjectId(req.params.id);
    var beca = await db.collection("becas").findOne({ _id: o_id }, (err, res) => {
        assert.equal(err, null);
        if (res === null) 
        {
          callback(404, "Such element doesn´t exist");
        } else 
        {
          callback(200, res);
        }
    });
};
const getBecasTipo=async function(db,req,callback){
    var tipo=req.params.tipo;
    db.collection("becas").find({tipo:tipo}).toArray(function(err,ans) {
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
const getBecasUniversidad=async function(db,req,callback){
    var id_universidad=ObjectId(req.params.id_universidad);
    db.collection("becas").find({id_universidad:id_universidad}).toArray(function(err,ans) {
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
const createBeca=async function(db,req,callback){
    const beca=req.body;
    beca.aplicantes=[];
    beca.abierta=true;

    db.collection("becas").insertOne(beca, (err, res) => {
        assert.equal(err, null);
        callback(200, res.ops[0]);
    });
};
const updateBeca=async function(db,req,callback){
    var o_id = new ObjectId(req.params.id);
    var result = await db.collection("becas").updateOne({ _id: o_id }, { $set: req.body });
    if (result.matchedCount !== 1) 
    {
      callback(404, "The scholarship to update doesn´t exist");
    } 
    else 
    {
      db.collection("becas").findOne({ _id: o_id }).then((ans) => {callback(200, ans);}).catch((err) => console.log(err));
    }
};
const deleteBeca=async function(db,req,callback){
    var o_id = new ObjectId(req.params.id);
    db.collection("becas").deleteOne({ _id: o_id }, (err, result) => {
      assert.equal(err, null);
      if (result.deletedCount !== 1) 
      {
        callback(404, "The scholarship to delete doesn´t exist");
      } 
      else 
      {
        callback(200, "Successfully deleted");
      }
    });
};

exports.getBecas=getBecas;
exports.getBecasID=getBecasID;
exports.getBecasTipo=getBecasTipo;
exports.getBecasUniversidad=getBecasUniversidad;
exports.createBeca=createBeca;
exports.updateBeca=updateBeca;
exports.deleteBeca=deleteBeca;