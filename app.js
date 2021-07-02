// Ajout du framework express au projet
const express = require('express');
//ajout de body-parser au projet : permet extraction d'objet JSON
const bodyParser = require('body-parser');
//ajout de mongoose au projet : gestion de la DB
const mongoose = require('mongoose');

const Sauces = require('./models/sauces');

const app = express();


//connexion à la DB
mongoose.connect('mongodb+srv://John-Smith:CL4PTP@cluster0.us1b4.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
// ajout d'un middleware, qui sera le premier à être executer par le server, il sera appliquer à toutes les routes, toutes les requêtes envoyer à notre server.
// correction des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // l'origin qui a le droit d'acceder à l'api : tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Authorisation d'utiliser certains en-tête dans l'objet requête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // ceci va permettre à l'application d'accéder à l'api sans problème
    next(); // Ne pas oublie d'appeler next pour passer au middleware d'après
  });
  

//middleware global : JSON
app.use(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const sauces = new Sauces({
        ...req.body
    });
    sauces.save()
    .then(() => res.status(201).json({ message: 'Sauces enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  });

//routes
app.use('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        _id: 'sauce-sauce',
        title: 'Sauces Piquante 1',
        description: 'Description rapide de cette première sauces',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 500,
        userId: 'Pekocko_first',
      },
      {
        _id: 'sauces-sauce',
        title: 'Sauces Piquante 1',
        description: 'Description rapide de cette première sauces',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 500,
        userId: 'MrSnowman',
      },
    ];
    res.status(200).json(sauces);
  });


module.exports = app;