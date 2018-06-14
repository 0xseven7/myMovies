let testModle = require('./test');

let test1 = new testModle({
  name: 'user1',
  age: 10,
  sex: 'boy'
});
test1.save(function (err, test) {
  if (err) {
    console.log(err);
  }
  console.log(test.age);
});