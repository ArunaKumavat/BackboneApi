# I have used backbone to resolve this

Go to this URl

http://localhost:3000/#index


## Install and start the server

```
$ npm install
$ npm start
$ npm run build #[optional] use for any precompilers you choose
```

## API endpoints / examples

> The following endpoints are expecting a `Content-Type: application/json`

```
GET /api/v1/counters
# []

POST {title: "bob"} /api/v1/counter
# [
#   {id: "asdf", title: "bob", count: 0}
# ]

POST {title: "steve"} /api/v1/counter
# [
#   {id: "qwer", title: "steve", count: 0}
# ]

POST {id: "asdf"} /api/v1/counter/inc
# [
#   {id: "asdf", title: "bob", count: 1}
# ]

POST {id: "qwer"} /api/v1/counter/dec
# [
#   {id: "qwer", title: "steve", count: -1}
# ]

DELETE {id: "qwer"} /api/v1/counter
# [
#   {id: "asdf", title: "bob", count: 1}
# ]

GET /api/v1/counters
# [
#   {id: "asdf", title: "bob", count: 1},
# ]
```


