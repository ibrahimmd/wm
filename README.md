# test

test app

## App
 - app is made of: 
 - mysql, listening on port 3306 (docker)
 - api (node, express) listening on port 8000
 - react app, listening on port 3000


## Start backend

- Switch directory
```
cd backend
```

- Start MySQL
```
docker-compose -f docker-compose.test.yml up
```

- Start node app
```
npm start
```


## Start frontend

- Switch directory
```
cd frontend
```

- Start react
```
npm start
```
