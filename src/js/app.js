import style from '../scss/app.scss'; // add css to html head
import Point from './components/points.js';

import {groupBy} from 'lodash/collection'; //load packet of loadash, not full library
import $ from 'jquery'; // load jquery
import 'slick-carousel'; //load slick carousel
import people from './components/people.js';

$(".one-time").slick({
  slidesToShow: 3,
  slidesToScroll: 3
}); //not need use document.ready

// Using lodash from components
const managerGroups = groupBy(people, 'manager');
const root = document.getElementById('root');
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`;


// Using poin from points
const body = document.getElementById('points');
body.innerHTML = `<div>Good point: ${new Point(1, 24)}</div>`;

