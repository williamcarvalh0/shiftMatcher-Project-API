const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    //mongodb connection string
    const con = await mongoose.connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    // connection
    console.log(`MongoDB connected with HOST: ${con.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
