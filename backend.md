# Backend Notes

## FastAPI

* **Restful API** - Representational State Transfer
  * Allows web or mobile apps (clients) to interact with a server (usually over HTTP)
  * APIs can be REST APIs or not
* What makes an API "Restful":
  1. Stateless - every request contains all info needed
  2. Client-Server Architecture - frontend (client) and backend are separate, allowing them to evolve independently
  3. Standardized Interactions - Uses HTTP methods: (GET, POST, PUT, DELETE)
  4. Resource-Based: Everything is a resource and they are identified by URLs
  5. Representation-Oriented - resources can be represented in JSON or XML format
  6. Cacheable - responses can be cached for increased performance

Fast API is a web framework for building APIs with Python 3.7+ based on standard Python type hints. Designed to be easy to use and highly performant.