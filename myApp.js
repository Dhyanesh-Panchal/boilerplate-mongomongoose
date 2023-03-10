require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;

// console.log(dbURI)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})


let Person;
Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let myPerson = new Person({
    name: 'Dhyanesh',
    age: 18,
    favoriteFoods: ['X', 'Y', 'Z']
  });
  myPerson.save((err, data) => {
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  console.log(arrayOfPeople)
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log('The error is:', err)
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  console.log(personName);
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log("The error is:", err);
    }
    else {
      console.log(data)
      done(null, data);
    }
  })
};

const findOneByFood = (food, done) => {
  console.log(food);
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.error("The error is: ", err);
    }
    else {
      console.log(data)
      done(null, data);
    }
  })
};

const findPersonById = (personId, done) => {
  console.log('The personID is: ', personId);
  Person.findById(personId, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(data);
      done(null, data);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    // console.log(data)
    data.save((err, newData) => {
      done(err, newData);

    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      console.log(data);
      done(err, data);
    }
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    console.log(data)
    done(err, data);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  // Person.find({ name: nameToRemove }, (err, data) => {
  //   console.log(data);
  // })

  Person.remove({ name: nameToRemove }, (err, data) => {
    console.log(data);
    done(err, data);
  })



  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: true, favoriteFoods: true })
    .exec((err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(data);
        done(err, data);
      }
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
