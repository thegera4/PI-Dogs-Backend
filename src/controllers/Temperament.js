const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  const URL = await axios.get('https://api.thedogapi.com/v1/breeds');
  const API_TEMPERAMENTS = URL.data.map(dog => dog.temperament);
  const SPLIT_TEMPERAMENTS = API_TEMPERAMENTS.map(e => e?.split(", ")).flat();
  SPLIT_TEMPERAMENTS.forEach(temperament => {
    Temperament.findOrCreate({where: 
      { name: temperament + " " }
    })
  });
  const ALL_TEMPERAMENTS = await Temperament.findAll({order: [["id", "ASC"]]});
  return res.send(ALL_TEMPERAMENTS);
}
module.exports = { getTemperaments };