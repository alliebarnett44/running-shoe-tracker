# running-shoe-tracker

# Running Shoe Tracker Workflows (Allie's FLOW from Front to Back)

## Login 
  - User navigates to `http://localhost:3000`
  - User enters `email` and `password`
  - User hits enter to submit form 
  - Frontend makes call to API
  ```typescript
   const res = await fetch(`http://localhost:6060/butt?email=${email}&password=${password}`);
   const data = await res.json();
   ``` 
  - Server receives HTTP GET request from frontend from port 6060
  - Router receives `/butt?email=${email}&password=${password}` and calls associated controller `validateUser`
  - `validateUser` uses already initialized client 
  ```typescript
  const uri =
  "mongodb://mongoadmin:secret@localhost:27017";
  const client = new MongoClient(uri);

  async function getCollection(collection: string) {
    await client.connect(); // connect client to Mongo Server
    const database = await client.db("running_shoe_tracker"); // client calls db function and returns "running_shoe_tracker" database object
    return await database.collection(collection); //client calls collection function on database with parameter collection and returns the collection
} 
  ```

  ```typescript
  const validateUser = async(req: Request, res: Response) => {
    let userRecord; // Initializing userRecord variable
    try {
        const collection = await getCollection("users"); // Set result of getCollection function to collection variable
        userRecord = await collection.findOne({
            $and: [ {email: req.query.email}, {password: req.query.password}]
        }); // Call findOne method/function on collection. findOne is executing a query with the following conditions
    } catch(err) {
        console.log(err);
    } if(userRecord === null){
        return res.status(400).json({
            userValidated: false 
        }); // Set API response status to BAD REQUEST and returns json response
    } else {
        return res.status(200).json({
            userValidated: true
        }); // If userRecord exists then set API response status to SUCCESS and returns json response 
    }
};
  ```
[Login.js](app/src/components/Login.js)
  ```typescript
   if(data['userValidated']) {
        navigate("/Profile", { state: { email: email} });
      } else {
        alert('fuck')
      }
  ```
