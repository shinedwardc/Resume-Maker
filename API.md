# API Documentation

All the following are paths under /api/v1

## /user
### POST /user

Takes a JSON body with
```json
{
  "email": "required",
  "name": "required",
}
```

Creates a new user and returns created user object with the numeric user ID, which should be stored

## /user/:id
### GET /user/:id

User ID must be a valid string user ID.
Returns a user object:
```json
{
  "userId": "always"
  "name": "always",
  "email": "always"
}
```

### PUT /user/:id

Takes an object to be merged with the user. Empty values are deleted.
```json
{
  "name": "New Name",
  "email": ""
}
```
