# Use Java 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy ONLY the backend folder into the image
COPY erms2-backend/ .

# Make mvnw executable
RUN chmod +x mvnw

# Build the Spring Boot application
RUN ./mvnw -q -DskipTests clean package

# Run the application
CMD ["java", "-jar", "target/*.jar"]
