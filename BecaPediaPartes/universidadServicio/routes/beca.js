let express=require("express");
let router=express.Router();
const Mongodb=require("../db/mongodb");
const controller=require("../controllers/becaController");

router.get('/',async function (req,res,next) {
    Mongodb.getDatabase(async function(db){
        controller.getBecas(db,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.get('/:id',async function (req,res,next) {
    Mongodb.getDatabase(async function(db){
        controller.getBecasID(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.get('/tipo=:tipo',async function (req,res,next) {
    Mongodb.getDatabase(async function(db){
        controller.getBecasTipo(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.get('/universidad=:id_universidad',async function (req,res,next) {
    Mongodb.getDatabase(async function(db){
        controller.getBecasUniversidad(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.post('/',async function (req,res,next) {
    Mongodb.getDatabase(async function(db){
        controller.createBeca(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.put('/',async function (req,res,next) {
    Mongodb.getDatabase(async function(db){
        controller.updateBeca(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});
router.delete('/',async function (req,res,next) {
    Mongodb.getDatabase(async function(db){
        controller.deleteBeca(db,req,(status,ans)=>{
            res.status(status).send(ans);
        });
    });
});

module.exports=router;