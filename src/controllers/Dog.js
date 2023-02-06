const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getApiInfo = async () =>{
  const URL = await axios.get('https://api.thedogapi.com/v1/breeds');
  const INFO = await URL.data.map(dog =>{
    return{
      weight:dog.weight.metric.includes('NaN') ? dog.weight.metric.replace('NaN','0') : dog.weight.metric,
      height:dog.height.metric,
      id:dog.id,
      name: dog.name,
      lifespan: dog.life_span,
      temperament: dog.temperament,
      image: dog.image,
    }
  });
  return INFO;
}

const getDbInfo = async () =>{
  return await Dog.findAll({
    include:{
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
}

const concatApiDb = async () =>{
  const API_INFO = await getApiInfo();
  const DB_INFO = await getDbInfo();
  const TOTAL = API_INFO.concat(DB_INFO);
  return TOTAL;
}

const getAllDogs =  async (req, res) => {
  const NAME = req.query.name
  let totalDogs = await concatApiDb();
  if(NAME){
    let dogName = await totalDogs.filter(dog => 
      dog.name.toLowerCase().includes(NAME.toLowerCase()));
    dogName.length ? 
    res.status(200).send(dogName) : 
    res.status(404).send({msg: 'Name not found!'});
  } else{
    res.status(200).send(totalDogs);
  }
}

const postDog = async (req, res) => {
  const { name, weight, height, lifespan, image, temperament } = req.body;
  if(!name || !weight || !height) return res.status(400).send({msg: 'Missing data!'});
  const CREATED_DOG = await Dog.create({
    name,
    weight,
    height,
    lifespan, 
    image
  });
  let temperamentDb = await Temperament.findAll({
    where: { name: temperament }
  });
  CREATED_DOG.addTemperament(temperamentDb);
  res.status(201).send({msg: 'Your dog was created!'});
}

const getDogById = async (req, res) => {
  const ID = req.params.id;
  const ALL_DOGS = await concatApiDb();
  if (ID) {
    const DOG_ID = await ALL_DOGS.filter(dog => dog.id == ID);
    DOG_ID.length ? 
    res.status(200).json(DOG_ID) :
    res.status(404).send({msg: 'Id not found!'});
}
}

const deleteDog = (req, res) => {
  const ID = req.params.id;
  if (!ID) return res.status(400).send({msg: 'Missing Id!'});
  Dog.destroy({
    where: { id: ID }
  }).then(() => {
    res.status(200).send({msg: 'Dog was deleted!'});
  }).catch(err => {
    res.status(400).send({msg: 'Something went wrong!: ' + err});
  });
}

const updateDog = (req, res) => {
  const ID = req.params.id;
  const { name, weight, height, lifespan, image, temperament } = req.body;
  if (!ID) return res.status(400).send({msg: 'Missing Id!'});

  Dog.update({
    name,
    weight,
    height,
    lifespan,
    image, 
    temperament
  }, {
    where: { id: ID }
  }).then(() => {
    res.status(200).send({msg: 'Dog was updated!'});
  }).catch(err => {
    res.status(400).send({msg: 'Something went wrong!: ' + err});
  });
}

module.exports = { getAllDogs, postDog, getDogById, deleteDog, updateDog };
