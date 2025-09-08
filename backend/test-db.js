// test-db.js
const mongoose = require('mongoose')

const uri = 'mongodb+srv://phamthanhdung0703:vietan2023@mern.lbulpxt.mongodb.net/test?retryWrites=true&w=majority&appName=MERN'

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!')
    process.exit()
  })
  .catch((err) => {
    console.error('❌ Failed to connect:', err.message)
    process.exit()
  })
