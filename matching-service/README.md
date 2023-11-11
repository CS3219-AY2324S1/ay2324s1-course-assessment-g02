# Peerprep - Matching Service

The main documentation is a TODO. This README will briefly describe the endpoints the microservice provides.

Objective:
Provide a microservice that can help match users and generate unique session IDs for user pairs that match the same language and difficulty

Endpoints:
`/match/find`

Query Params:
id: string
difficulty: string
language: string

If currently there is a waiting user with no partner in Redis map of key == '{difficulty}\_{language}' , pair the 2 users and generate entries in the Redis map with unique sessionId (uuid)

If not current waiting user with no partner, add user with userId of `id` into Redis map of key == '{difficulty}\_{language}' and value of null

`/match/delete`

Query Params:
id: string
difficulty: string
language: string

Remove the user from the queue if unmatched OR remove the matched session entries from the Redis map if matched

Note: Redis is currently being ran locally through the `docker-compose.yaml` in the root directory.
