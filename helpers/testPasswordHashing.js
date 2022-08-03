const User = require('../models/user');

/*
User.hashPassword('myPlainPassword').then((hashedPassword) => {
  console.log(hashedPassword);
});
*/
console.log(User);
console.log('hashPassword',User.hashPassword("myPlainPassword").then(mdp=>{
  
  console.log(mdp)
}));

User.verifyPassword(
  'myPlainPassword',
  '$argon2id$v=19$m=65536,t=5,p=1$6F4WFjpSx9bSq9k4lp2fiQ$cjVgCHF/voka5bZI9YAainiaT+LkaQxfNN638b/h4fQ'
).then((passwordIsCorrect) => {
  console.log(passwordIsCorrect);
});


User.verifyPassword(
  'myPlainPassword',
  "$argon2id$v=19$m=65536,t=5,p=1$MPne+7f+j2JjLkZk/8k2fw$HxZxmdNCvKDY5BdTTXSKG1DSiTVnDLan9ui+Y8gqfFc"
  ).then((passwordIsCorrect) => {
  console.log(passwordIsCorrect);
});
