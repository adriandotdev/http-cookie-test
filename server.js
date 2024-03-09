const app = require('./app')

app.listen(process.env.PORT || 4001, () => {

    console.log("Listening to port 4001");
})