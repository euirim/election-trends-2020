import "../scss/main.scss";
import Charts from './charts.js';

/*
window.$('.icon-facebook').click((e) => {
  e.preventDefault();
  const uri = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${uri}`);
});


window.$('.icon-twitter').click((e) => {
  e.preventDefault();
  const uri = window.location.href;
  const status = encodeURIComponent(`${window.tweetText} ${uri}`);
  window.open(`https://twitter.com/intent/tweet?text=${status}`);
});
*/

// prevent widows
// let widowElements = [].slice.call(document.getElementsByClassName('no-widows'));
let elements = document.querySelectorAll('.no-widows');
Array.prototype.forEach.call(elements, function(el, i){
  let wordArray = el.textContent.trim().split(' ');
  if (wordArray.length > 1) {
    wordArray[wordArray.length - 2] += '&nbsp;' + wordArray[wordArray.length - 1];
    wordArray.pop();
    el.innerHTML = wordArray.join(' ');
  }
});
/*
console.log(widowElements.length);
widowElements.map(function () {
  var wordArray = $(this).text().split(' ');
  if (wordArray.length > 1) {
    wordArray[wordArray.length - 2] += '&nbsp;' + wordArray[wordArray.length - 1];
    wordArray.pop();
    $(this).html(wordArray.join(' '));
  }
});
*/

Charts.load();

// Add event listeners for chart controls
document.getElementById("all-time-button").addEventListener("click", function() {
  Charts.showChart("chart-all-time");
  document.getElementById("all-time-button").className = "active";
  document.getElementById("24h-button").className = "";
});
document.getElementById("24h-button").addEventListener("click", function() {
  Charts.showChart("chart-24h");
  document.getElementById("all-time-button").className = "";
  document.getElementById("24h-button").className = "active";
});