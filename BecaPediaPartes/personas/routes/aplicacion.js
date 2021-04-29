let express= require("express");
let router=express.Router();
const Mongodb=require("../db/Mongodb");
const controller=require("../controllers/aplicacionController");
/**
 * REST
 */
router.get('/',async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getAplicaciones(db,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

router.get("/:id",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getAplicacionID(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

router.get("/persona=:persona_id",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getAplicacionesPersona(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

router.post("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.createAplicacion(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

router.put("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.updateAplicacion(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

router.delete("/",async function (req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.deleteAplicacion(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
/**
 * Export Router
 */
 module.exports=router;