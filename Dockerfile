# Use Java 17
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy backend code
COPY erms2-backend/ .

RUN chmod +x mvnw

# Build the Spring Boot application
RUN ./mvnw -q -DskipTests clean package

# Run the jar (wildcard enabled via sh -c)
CMD ["sh", "-c", "java -jar target/*.jar"]
