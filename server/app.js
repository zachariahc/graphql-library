const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema  = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()
// allow cross origin requests
app.use(cors());
mongoose.connect('mongodb://zach:password123@ds111882.mlab.com:11882/gql-zach', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
});


app.use('/graphql', graphqlHTTP({ 
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('App started on port 4000')
});

