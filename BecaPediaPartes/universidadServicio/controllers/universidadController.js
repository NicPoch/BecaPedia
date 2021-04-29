const {ObjectID} = require("mongodb");
const Joi= require("joi");
const assert=require("assert");

/**
 * Controladores
 */

/**
 * para obtener el listado de universidades
 * @param {*} db la base de datos utilizada
 * @param {*} callback 
 */
 const getUniversidades = (db, callback) => {
    db.collection("universidades").find({}).toArray(function (err, ans) {
        assert.equal(err, null);
        if (err) {
          callback(500, "Server error collecting data");
        } else {
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
const getUniversidadByID = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    var universidade = await db.collection("universidades").findOne({ _id: o_id }, (err, res) => {
      assert.equal(err, null);
      if (res === null) {
        callback(404, "Such element doesn´t exist");
      } else {
        callback(200, res);
      }
    });
};
/**
 * Para manejo de acceso a la aplicación por parte de las universidades
 * @param {*} db 
 * @param {*} req 
 * @param {*} callback 
 */
const loginUniversidad = async function (db, req, callback) {
    var universidade = await db.collection("universidades").findOne({username: req.body.username,password: req.body.password,},(err, res) => {
        assert.equal(err, null);
        if (res === null) {
          callback(404,"The username and password entered do not match. Please try again.");
        } else {
          callback(200, res);
        }
      }
    );
};
/**
 * Para crear a la universidad
 * @param {*} db 
 * @param {*} req 
 * @param {*} callback 
 */
const createUniversidad = async function (db, req, callback) {
    const { error } = schema.validate(req.body);
    if (error) 
    {
      callback(400, error.details[0].message);
    } 
    else 
    {
      const universidad = req.body;
      universidad.becas = [];
      universidad.progamas = [];
      universidad.logo=null;
  
      db.collection("universidades").insertOne(universidad, (err, res) => {
        assert.equal(err, null);
        callback(200, res.ops[0]);
      });
    }
};

const updateUniversidad = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    var result = await db.collection("universidades").updateOne({ _id: o_id }, { $set: req.body });
    if (result.matchedCount !== 1) 
    {
      callback(404, "The university to update doesn´t exist");
    } 
    else 
    {
      db.collection("universidades").findOne({ _id: o_id }).then((ans) => {callback(200, ans);}).catch((err) => console.log(err));
    }
};

const deleteUniversidad = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    db.collection("universidades").deleteOne({ _id: o_id }, (err, result) => {
      assert.equal(err, null);
      if (result.deletedCount !== 1) 
      {
        callback(404, "The university to delete doesn´t exist");
      } 
      else 
      {
        callback(200, "Successfully deleted");
      }
    });
};
/**
 * Esquema de validación
 */
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
    description:Joi.string().required(),
});
/**
 * Exportar
 */
exports.getUniversidades=getUniversidades;
exports.getUniversidadByID=getUniversidadByID;
exports.loginUniversidad=loginUniversidad;
exports.createUniversidad=createUniversidad;
exports.updateUniversidad=updateUniversidad;
exports.deleteUniversidad=deleteUniversidad;