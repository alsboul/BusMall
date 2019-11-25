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
var rounds = 25;
var vote = 0;

function BusMall(product) {
  this.product = product;
  this.imagePath = `img/${product}.jpg`;
  this.votes = 0;
  this.views = 0;
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
  while(leftBusMall === centerBusMall || leftBusMall === rightBusMall || centerBusMall === rightBusMall) {
    leftBusMall = BusMall.all[randomNumber(0, BusMall.all.length - 1)];
    centerBusMall = BusMall.all[randomNumber(0, BusMall.all.length - 1)];
    rightBusMall = BusMall.all[randomNumber(0, BusMall.all.length - 1)];
  }
  leftBusMall.views++;
  centerBusMall.views++;
  rightBusMall.views++;

  leftImage.setAttribute('src', leftBusMall.imagePath);
  leftImage.setAttribute('alt', leftBusMall.product);
  leftImage.setAttribute('title', leftBusMall.product);

  centerImage.setAttribute('src', centerBusMall.imagePath);
  centerImage.setAttribute('alt', centerBusMall.product);
  centerImage.setAttribute('title', centerBusMall.product);

  rightImage.setAttribute('src', rightBusMall.imagePath);
  rightImage.setAttribute('alt', rightBusMall.product);
  rightImage.setAttribute('title', rightBusMall.product);
  if (rounds === vote)
  {
    var contienar = document.getElementById('imagesSection');
    var ulEl = document.createElement('ul');
    contienar.appendChild(ulEl);
    for (var i = 0; i < BusMall.all.length; i++){
      var liEl =  document.createElement('li');
      ulEl.appendChild(liEl);
      liEl.textContent = `this image ${BusMall.all[i].product} has this vote ${BusMall.all[i].votes} and this is view ${BusMall.all[i].views}`;;
    }
  }
}

render();


function handleClick(e) {
  if (e.target.id !== 'imagesSection') {
    if (rounds >= vote){
      rounds--;
      console.log(rounds);
    }

    for (let i = 0; i < BusMall.all.length; i++) {
      if (e.target.title === BusMall.all[i].product) {
        BusMall.all[i].votes++;
      }
    }
    //console.table(BusMall.all);
    render();
  }
}
imagesSection.addEventListener('click', handleClick);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
