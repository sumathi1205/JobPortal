const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(cors())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://21501a0594:1234@job-portal-demo.ounf1ne.mongodb.net/Job Portal Demo?retryWrites=true&w=majority&appName=job-portal-demo";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


     const db =  client.db("mernJobPortal");
     const jobsCollections = db.collection("demoJobs");


     app.post("/post-job", async(req,res) => {
        const body = req.body;
        body.createAt =new Date();
        //console.log(body)
        const result = await jobsCollections.insertOne(body);
        if(result.insertedId){
            return res.status(200).send(result);
        }else{
            return res.status(404).send({
                message: "try again",
                status: false
            })
        }
     })

   

     app.get("/all-jobs", async(req,res) => {
        const jobs = await jobsCollections.find({}).toArray();
        res.send(jobs);
     })

     app.get("/all-jobs/:id", async(req, res) => {
      const id = req.params.id;
      const job  = await jobsCollections.findOne({
        _id: new ObjectId(id)
      })
      res.send(job)
     })

     app.get("/myJobs/:email", async(req,res) => {
        // console.log(req.params.email)
      const jobs = await jobsCollections.find({postedBy :req.params.email }).toArray();
      res.send(jobs)
     })


     app.delete("/job/:id", async(req, res) => {
      const id =req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await jobsCollections.deleteOne(filter);
      res.send(result)
     })

     //update a jobs
     app.patch("/update-job/:id", async(req,res)=> {
      const id= req.params.id;
      const jobData = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true};
      const updateDoc = {
        $set: {
          ...jobData
        },
      };

      const result = await jobsCollections.updateOne(filter,updateDoc,options);
      res.send(result)
     })


  
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res) => {
    res.send('Hello World')
})

app.listen(port,() => {
    console.log(` server running and port listening at ${port}`)
})