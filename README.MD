# mybson
like myjson, but with bson

[mybson api](https://mybson.herokuapp.com/api)

# GET bson
`_id` is the id of the bookmark
```
https://mybson.herokuapp.com/api/bson?:id
```
##### GET example
```
https://mybson.herokuapp.com/api/bson?id=58d4735ba3e4a3ae9dcc902f
```
##### GET example response with status 200
``` javascript
{
    "test":"bar"
}
```

# POST bson
parameter `bson` is required
```
https://mybson.herokuapp.com/api/bson
```
##### POST example
```
https://mybson.herokuapp.com/api/bson
{
	"bson": {
		"arr": [1,2,3,4]
	}
}
```
##### POST example response with status 200
``` javascript
{
    "success": true,
    "id": "58d4735ba3e4a3ae9dcc902f"
}
```

# PUT bson
parameters `bson` and `id` are required
```
https://mybson.herokuapp.com/api/bson
```
##### PUT example
```
https://mybson.herokuapp.com/api/bson
{
	"id": "58d4735ba3e4a3ae9dcc902f",
	"bson": {
		"test": "bar"
	}
}
```
##### PUT example response with status 200
``` javascript
{
  "success": true
}
```

# DELETE bson
`id` is required
```
https://mybson.herokuapp.com/api/bson
```
##### DELETE example
```
https://mybson.herokuapp.com/api/bson
{
	"id": "58d4735ba3e4a3ae9dcc902f"
}
```
##### DELETE example response with status 200
``` javascript
{
  "success": true
}
```