const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quizRoutes = require("./routes/quiz");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);



app.get('/siva/name', (req, res) => {
  res.send(`
    <html>
      <body>
        <div id="counter">0</div>
        <script>
          let x = 0;
          setInterval(() => {
            x++;
            document.getElementById('counter').innerText = x;
          }, 2000);
        </script>
      </body>
    </html>
  `);
});

app.get('/siva/collage',(req,res)=>{
  res.send("iter")
})
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
