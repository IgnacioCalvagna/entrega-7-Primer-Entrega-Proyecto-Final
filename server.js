const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const morgan = require('morgan');
const router = require('./router')

app.use(express.json())
app.use(express.urlencoded ({extended:true}))
app.use(morgan("dev"))

app.use("/api",router)




app.listen(port,()=>console.log(`server listening on port http://localhost:${port}`))
