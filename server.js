const express = require('express');
const PORT = precess.env.PORT || 3001;
const app = express();
const ApiRoutes = require('.routes/ApiRoutes');
const htmlRoutes = require ('./routes/htmlRoutes');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));



//api use

app.use('/api',ApiRoutes);
app.use('/', htmlRoutes);
app.listen(PORT,()=>{
    console.log(`API now on server port ${PORT}!`);
});