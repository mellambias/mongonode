var { MongoClient } = require('mongodb');
var uri = 'mongodb://192.168.1.7:27017/?maxPoolSize=20&w=majority';

const client = new MongoClient(uri);

async function run() {
    try {
        // Conecta el cliente al servidor (optional starting in v4.7)
        await client.connect();
        // Establece y verifica la conexion
        await client.db('admin').command({ ping: 1 });
        console.log('Connected successfully to server');
        const database = client.db('examples');
        const movies = database.collection('movies');
        const cursor = await movies.find({});
        if ((await cursor.countDocuments) === 0) {
            console.log('No documents found!');
        }
        await cursor.forEach(console.dir);
    } finally {
        // Asegura que el cliente cerrará la conexion cuando finalice o un error
        await client.close();
    }
}
run().catch(console.dir);
