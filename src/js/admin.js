import style from '../scss/admin.scss'; // add css to html head
import {groupBy} from 'lodash/collection'; //load packet of loadash, not full library
import people from './components/people'


// Using lodash from components
const managerGroups = groupBy(people, 'manager');
const root = document.getElementById('admin-root');
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`;