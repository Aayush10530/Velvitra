require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB...');
// Hide password in logs
console.log(`URI: ${uri.replace(/:([^:@]+)@/, ':****@')}`);

mongoose.connect(uri)
    .then(() => {
        console.log('\nSUCCESS: Backend is safely connected to MongoDB Atlas!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('\nERROR: Connection failed:', err.message);
        process.exit(1);
    });
