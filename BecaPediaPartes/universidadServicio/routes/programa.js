let express=require("express");
let router=express.Router();
const Mongodb= require("../db/mongodb");
let controller=require("../controllers/programaController");

router.get('/',async function(req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getProgramas(db,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.get('/:id',async function(req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getProgramaID(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.get('/universidad=:id_universidad',async function(req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getProgramaUniversidad(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.get('/nivel=:nivel',async function(req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.getProgramaNivel(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.post('/',async function(req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.createPrograma(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.put('/',async function(req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.updatePrograma(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.delete('/',async function(req,res,next) {
    Mongodb.getDatabase(async function (db) {
        controller.deletePrograma(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

module.exports=router;