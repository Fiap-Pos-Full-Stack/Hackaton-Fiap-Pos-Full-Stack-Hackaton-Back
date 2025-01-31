import { AppDataSource } from "./data-source"


import app from "./app"
AppDataSource.initialize().then(async () => {
    console.log('Database OK');
    app.listen(4000, () => {
        console.log('Server started on port 4000');
    })
  })
  
  export default app;