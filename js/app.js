'use stricts';
var names = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];
alert('please press on any image 25 time to vote');
var leftImage = document.querySelector('#leftImage');
var centerImage = document.querySelector('#centerImage');
var rightImage = document.querySelector('#rightImage');
var imagesSection = document.querySelector('#imagesSection');

function BusMall(name) {
  this.name = name;
  this.imagePath = `img/${name}.jpg`;
  BusMall.all.push(this);
}
BusMall.all = [];

for (let i = 0; i < names.length; i++) {
  new BusMall(names[i]);
}
function render() {
  var leftBusMall = BusMall.all[randomNumber(0, BusMall.all.length - 1)];
  var centerBusMall = BusMall.all[randomNumber(0, BusMall.all.length - 1)];
  var rightBusMall = BusMall.all[randomNumber(0, BusMall.all.length - 1)];
  leftImage.setAttribute('src', leftBusMall.imagePath);
  leftImage.setAttribute('alt', leftBusMall.name);
  leftImage.setAttribute('title', leftBusMall.name);
  centerImage.setAttribute('src', centerBusMall.imagePath);
  centerImage.setAttribute('alt', centerBusMall.name);
  centerImage.setAttribute('title', centerBusMall.name);
  rightImage.setAttribute('src', rightBusMall.imagePath);
  rightImage.setAttribute('alt', rightBusMall.name);
  rightImage.setAttribute('title', rightBusMall.name);
}
render();


imagesSection.addEventListener('click', function() {
  console.log(event.target.id);
  if (event.target.id !== 'imagesSection') {
    render();
  }
});
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
