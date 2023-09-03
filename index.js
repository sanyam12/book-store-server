const express = require('express');
const app = express();
const port = 3000;
const admin = require("firebase-admin");
// const serviceAccount = require("./admin.json");
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert({
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
        "universe_domain": process.env.UNIVERSE_DOMAIN
    }),
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Node.js Server!');
});

app.post("/uploadBook", (req, res) => {
    const jsonData = req.body;

    // Check if JSON data exists
    if (jsonData["name"] === undefined || jsonData["price"] === undefined || jsonData["link"] === undefined) {
        return res.status(400).json({ error: 'JSON data provided is not complete' });
    }

    var db = admin.firestore();
    var ref = db.collection('books').doc(jsonData["name"]).set({
        name: jsonData["name"].toString(),
        price: jsonData["price"].toString(),
        link: jsonData["link"].toString(),
        pages: jsonData["pages"],
        description:jsonData["description"].toString(),
    }).then(() => {
        console.log(`Added document with ID: ${jsonData["name"]}`);
    }).catch((err) => {
        console.log('Error getting documents', err);
    });
    res.send("Upload Book");
});

app.get("/getBook", async (req, res) => {
    var db = admin.firestore();
    const docRef = await db.collection('books').doc(req.query.name).get();
    if (!docRef.exists) {
        res.status(404);
        res.send("No such document!");
    } else {
        var temp = docRef.data();
        res.send(temp);
    }
});

app.get("/getBooks", async (req, res) => {
    const db = admin.firestore();
    const collectionRef = await db.collection('books').get();
    const data = collectionRef.docs.map(doc => doc.data());
    res.send(data);
});

app.post("/saveToLibrary", async (req, res) => {
    var json = req.body;
    var db = admin.firestore();
    console.log(json["book"]["name"]);
    var ref = db.collection('users').doc(json["uid"]).collection('library').doc(json["book"]["name"])
    .set(json["book"])
    .then(() => {
        console.log(`Added document with ID: ${json["book"]["name"]}`);
    }).catch((err) => {
        console.log('Error getting documents', err);
    });
    res.send("Saved to Library");
});

app.post("/getLibrary", async (req, res) => {
    var json = req.body;
    var db = admin.firestore();
    const collectionRef = await db.collection('users').doc(json["uid"]).collection('library').get();
    const data = collectionRef.docs.map(doc => doc.data());
    res.send(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});