const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url ="mongodb+srv://admin:BecaPedia@becapediacluster.tvyip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "PersonasServiceDB";

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    callback(db, client);
  });
};

exports.getDatabase = getDatabase;