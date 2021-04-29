const { ObjectID } = require("mongodb");
const assert=require("assert");

/**
 * Controladores
 */

/**
 * para obtener el listado de aplicaciones
 * @param {*} db la base de datos utilizada
 * @param {*} callback 
 */
const getAplicaciones = (db, callback) => {
    db.collection("aplicaciones").find({}).toArray(function (err, ans) {
        assert.equal(err, null);
        if (err) 
        {
          callback(500, "Server error collecting data");
        } else 
        {
          callback(200, ans);
        }
    });
};
 /**
  * 
  * @param {*} db la base de datos
  * @param {*} req los requerimientos de busqueda (id)
  * @param {*} callback 
  */
const getAplicacionID = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    var aplicacion = await db.collection("aplicaciones").findOne({ _id: o_id }, (err, res) => {
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
 /**
  * 
  * @param {*} db la base de datos
  * @param {*} req los requerimientos de busqueda (id)
  * @param {*} callback 
  */
const getAplicacionesPersona= async function (db, req, callback) {
    var persona_id = req.params.persona_id;
    db.collection("aplicaciones").find({persona_id:persona_id}).toArray(function (err, ans) {
        assert.equal(err, null);
        if (err) 
        {
          callback(500, "Server error collecting data");
        } else 
        {
          callback(200, ans);
        }
    });
};

/**
 * Para crear a la aplicacion
 * @param {*} db 
 * @param {*} req 
 * @param {*} callback 
 */
const createAplicacion = async function (db, req, callback) {
  const aplicacion = req.body;
  aplicacion.aprobada=false;
  aplicacion.denegada=false;
  aplicacion.seen=false;
  aplicacion.generada=Date.now();
  
  db.collection("aplicaciones").insertOne(aplicacion, (err, res) => {
    assert.equal(err, null);
    callback(200, res.ops[0]);
  });
};

const updateAplicacion = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    var result = await db.collection("aplicaciones").updateOne({ _id: o_id }, { $set: req.body });
    if (result.matchedCount !== 1) 
    {
      callback(404, "The aplication to update doesn´t exist");
    } 
    else 
    {
      db.collection("aplicaciones").findOne({ _id: o_id }).then((ans) => {callback(200, ans);}).catch((err) => console.log(err));
    }
};

const deleteAplicacion = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    db.collection("aplicaciones").deleteOne({ _id: o_id }, (err, result) => {
      assert.equal(err, null);
      if (result.deletedCount !== 1) 
      {
        callback(404, "The aplication to delete doesn´t exist");
      } 
      else 
      {
        callback(200, "Successfully deleted");
      }
    });
};
/**
 * Exportar
 */
exports.getAplicaciones=getAplicaciones;
exports.getAplicacionID=getAplicacionID;
exports.getAplicacionesPersona=getAplicacionesPersona;
exports.createAplicacion=createAplicacion;
exports.updateAplicacion=updateAplicacion;
exports.deleteAplicacion=deleteAplicacion;