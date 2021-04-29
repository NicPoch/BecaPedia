const express=require("express");
let router = express.Router();
const Mongodb=require("../db/Mongodb");
const controller=require("../controllers/personaController");

/**
 * Funcionalidades REST
 */
/**
 * GET
 */
router.get("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getPersonas(db,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * GET/:id
 */
router.get("/:id",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getPersonaByID(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * POST
 */
router.post("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.createPersona(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * Login **
 */
router.post("/login",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.loginPersona(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * PUT/:id
 */
router.put("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.updatePersona(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * DELETE/:id
 */
router.delete("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.deletePersona(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * Export Router
 */
module.exports=router;