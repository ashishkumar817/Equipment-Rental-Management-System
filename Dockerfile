# Use OpenJDK 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper and project
COPY . .

# Make mvnw executable
RUN chmod +x mvnw

# Build the Spring Boot app
RUN ./mvnw -q -DskipTests clean package

# Run the JAR file
CMD ["java", "-jar", "target/*.jar"]
