import quotes from '../data/quotes.json';

const manLength = quotes.data.length;
const data = new Array(manLength);

for (let i = 0; i < manLength; i++) {
    data[i] = quotes.data[i];
    data[i].image = require(`../img/${data[i].title}.jpg`);
}

export default data;