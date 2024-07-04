# Use OpenJDK 17 image for building the project
FROM openjdk:17-slim AS build
WORKDIR /app

# Copy the Maven configuration files and source code into the image
COPY mvnw pom.xml /app/
COPY .mvn .mvn
COPY src src

# Run Maven to package the executable jar
RUN ./mvnw package -DskipTests

# Use OpenJDK 17 to run the application
FROM openjdk:17-slim
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
