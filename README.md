```yaml
# Docker compose template for a full stack node.js and mongodb setup
version: '3.8'

services:
  api:
    build:
      context: ./mErn_BacKend
      dockerfile: Dockerfile
    ports:
      - '4000:8000'
    environment:
      # service name of mongodb is used here as the host name instead of localhost
      - DATABASE_URL="mongodb://mongo-service:27017/mern"
    volumes:
      - ./mErn_BacKend:/usr/src/app
    networks:
      - api-network
    depends_on:
      - mongo-service

  # mongodb
  mongo-service:
    container_name: mongodb-container
    image: mongo:latest
    ports:
      - '27017:27017'
    volumes:
      - mongodb-data:/data/db
    networks:
      - api-network

  # postgres
  postgres-service:
    container_name: postgres-container
    image: postgres:latest
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mern
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - api-network

  mongo-express:
    image: mongo-express
    ports:
      - '8081:8081'
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo-service
      ME_CONFIG_MONGODB_PORT: 27017
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: password
    networks:
      - api-network
    depends_on:
      - mongo-service
  
  pgadmin:
    image: dpage/pgadmin4
    ports:
      - '5050:80'
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: password
    networks:
      - api-network
    depends_on:
      - postgres-service

  redis-stack-service:
    image: redis/redis-stack
    ports:
      - '6379:6379'
      - '8001:8001'
    volumes:
      - redis-data:/var/lib/redis-stack
    environment:
      - REDIS_ARGS=--save 900 1
    networks:
      - api-network
  
  rabbitmq-service:
    image: rabbitmq:3.8-management
    ports:
      - '5672:5672'
      - '15672:15672'
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    networks:
      - api-network


volumes:
  mongodb-data:
  postgres-data:
  redis-data:
  rabbitmq-data:

networks:
  api-network:
    driver: bridge

```