``` Credit to Brad Traversey for the boilerplate code```

## Quick Start

``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Set up environment variables
create file '.env'
paste this text inside:
```MONGODB_URI = mongodb://test:Password1@gtprojects-shard-00-00-lifqz.mongodb.net:27017,gtprojects-shard-00-01-lifqz.mongodb.net:27017,gtprojects-shard-00-02-lifqz.mongodb.net:27017/test?ssl=true&replicaSet=GTProjects-shard-0&authSource=admin&retryWrites=true```

# Server runs on http://localhost:5000 and client on http://localhost:3000
