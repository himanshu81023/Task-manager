const mongoose = require('mongoose')

mongoose.connect(process.env.mongoose_url, {
    useNewUrlParser: true, useUnifiedTopology: true
})