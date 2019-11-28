/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use stricts';
var names = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
alert('please press on any image 25 time to vote');
var leftImage = document.querySelector('#leftImage');
var centerImage = document.querySelector('#centerImage');
var rightImage = document.querySelector('#rightImage');
var imagesSection = document.querySelector('#imagesSection');
var rounds = 25;



function BusMall(path) {
  var pathArr = path.split('.');
  this.name = pathArr[0];
  this.imagePath = `img/${this.name}.${pathArr[1]}`;
  this.voting = 0;
  this.views = 0;
  BusMall.all.push(this);
}
BusMall.all = [];

for (let i = 0; i < names.length; i++) {
  new BusMall(names[i]);
}
// this function from mr.mahmoud
var previousIndexs = [];
function getUniqueIndex() {
  var index = randomNumber(0, BusMall.all.length - 1);
  while (previousIndexs.includes(index)) {
    index = randomNumber(0, BusMall.all.length - 1);
  }


  previousIndexs.push(index);
  if (previousIndexs.length > 3) {
    previousIndexs.shift();
  }
  return index;
}
//function to render the three images
function render() {
  var leftProduct = BusMall.all[getUniqueIndex()];
  var middleProduct = BusMall.all[getUniqueIndex()];
  var rightProduct = BusMall.all[getUniqueIndex()];

  leftProduct.views++;
  middleProduct.views++;
  rightProduct.views++;

  leftImage.setAttribute('src', leftProduct.imagePath);
  leftImage.setAttribute('alt', leftProduct.name);
  leftImage.setAttribute('title', leftProduct.name);

  centerImage.setAttribute('src', middleProduct.imagePath);
  centerImage.setAttribute('alt', middleProduct.name);
  centerImage.setAttribute('title', middleProduct.name);

  rightImage.setAttribute('src', rightProduct.imagePath);
  rightImage.setAttribute('alt', rightProduct.name);
  rightImage.setAttribute('title', rightProduct.name);
}
render();

function handleClick(e) {
  rounds--;
  console.log(rounds);
  if (rounds !== 0) {
    if (e.target.id !== 'imageSection') {
      for (let x = 0; x < BusMall.all.length; x++) {
        if (e.target.title === BusMall.all[x].name) {
          BusMall.all[x].voting++;
        }
      }
      render();


    }
  } else if (rounds === 0) {
    imagesSection.removeEventListener('click', handleClick);
    updateView();
    renderChartAndList();

  }
}
//event listener
imagesSection.addEventListener('click', handleClick);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//function to render chart and list
function renderChartAndList() {
  var votes = [];
  var views = [];
  var labels = [];
  var container = document.getElementById('showing');
  var ulEl = document.createElement('ul');
  container.appendChild(ulEl);
  for (let z = 0; z < BusMall.all.length; z++) {
    var liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${BusMall.all[z].name} had ${BusMall.all[z].voting} votes and was shown ${BusMall.all[z].views} times`;
    labels.push(BusMall.all[z].name);
    votes.push(BusMall.all[z].voting);
    views.push(BusMall.all[z].views);
  }
  // chart from me but litil bit change from mr.mahmoud code
  var ctx = document.getElementById('myChart').getContext('2d');

  var voteData = {
    label: '# of Votes',
    data: votes,
    backgroundColor: '#ac7e01',
  };

  var viewsData = {
    label: '# of Views',
    data: views,
    backgroundColor: '#ac5487',
  };

  var labelsInfo = {
    labels: labels,
    datasets: [voteData, viewsData],
  };

  var chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            max : 10, min:0, stepsize:1.0,
            beginAtZero: true,
          },
        }
      ],
    },
  };

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: labelsInfo,
    options: chartOptions,
  });
}
//function to local storage to store the data
function updateView() {
  var viewString = JSON.stringify(BusMall.all);
  localStorage.setItem('view', viewString);
}
function getView() {
  var viewString = localStorage.getItem('view');
  if (viewString) {
    BusMall.all = JSON.parse(viewString);
  }
}
getView();
