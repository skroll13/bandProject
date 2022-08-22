const express = require(`express`);
const router = require("./routes/albums");
const app = express();
let port = 3000;

app.use(express.static(`public`)) //hold all of our static resources

app.set(`view engine`, `ejs`)

app.use(require(`./routes/index`))
app.use(require(`./routes/albums`))

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

module.exports = router