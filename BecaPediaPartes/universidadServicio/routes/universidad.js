let express=require("express");
let router=express.Router();
const Mongodb=require("../db/mongodb");
const controller=require("../controllers/universidadController");

/**
 * Funcionalidades REST
 */
/**
 * GET
 */
 router.get("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getUniversidades(db,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * GET/:id
 */
router.get("/:id",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getUniversidadByID(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * POST
 */
router.post("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.createUniversidad(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * Login **
 */
router.post("/login",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.loginUniversidad(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * PUT/:id
 */
router.put("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.updateUniversidad(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * DELETE/:id
 */
router.delete("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.deleteUniversidad(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

module.exports=router;