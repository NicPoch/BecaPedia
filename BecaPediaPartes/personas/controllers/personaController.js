const { ObjectID } = require("mongodb");
const Joi=require("joi");
const assert=require("assert");
/**
 * Controladores
 */

/**
 * para obtener el listado de personas
 * @param {*} db la base de datos utilizada
 * @param {*} callback 
 */
const getPersonas = (db, callback) => {
    db.collection("personas").find({}).toArray(function (err, ans) {
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
const getPersonaByID = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    var persona = await db.collection("personas").findOne({ _id: o_id }, (err, res) => {
      assert.equal(err, null);
      if (res === null) {
        callback(404, "Such element doesn´t exist");
      } else {
        callback(200, res);
      }
    });
};
/**
 * Para manejo de acceso a la aplicación por parte de las personas
 * @param {*} db 
 * @param {*} req 
 * @param {*} callback 
 */
const loginPersona = async function (db, req, callback) {
    var persona = await db.collection("personas").findOne({username: req.body.username,password: req.body.password,},(err, res) => {
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
 * Para crear a la persona
 * @param {*} db 
 * @param {*} req 
 * @param {*} callback 
 */
const createPersona = async function (db, req, callback) {
    const { error } = schema.validate(req.body);
    if (error) 
    {
      callback(400, error.details[0].message);
    } 
    else 
    {
      const persona = req.body;
      persona.aplicaciones = [];
      persona.documentos = [];
      persona.photo=null;
  
      db.collection("personas").insertOne(persona, (err, res) => {
        assert.equal(err, null);
        callback(200, res.ops[0]);
      });
    }
};

const updatePersona = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    var result = await db.collection("personas").updateOne({ _id: o_id }, { $set: req.body });
    if (result.matchedCount !== 1) 
    {
      callback(404, "The person to update doesn´t exist");
    } 
    else 
    {
      db.collection("personas").findOne({ _id: o_id }).then((ans) => {callback(200, ans);}).catch((err) => console.log(err));
    }
};

const deletePersona = async function (db, req, callback) {
    var o_id = new ObjectId(req.params.id);
    db.collection("personas").deleteOne({ _id: o_id }, (err, result) => {
      assert.equal(err, null);
      if (result.deletedCount !== 1) 
      {
        callback(404, "The person to delete doesn´t exist");
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
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().required()
});
/**
 * Exportar
 */
exports.getPersonas=getPersonas;
exports.getPersonaByID=getPersonaByID;
exports.loginPersona=loginPersona;
exports.createPersona=createPersona;
exports.updatePersona=updatePersona;
exports.deletePersona=deletePersona;