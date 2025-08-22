# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy only pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies (with caching optimization)
RUN mvn dependency:go-offline -B \
    && mvn dependency:resolve \
    && mvn dependency:resolve-plugins

# Copy source code
COPY src src

# Build application (parallel build with optimized settings)
RUN mvn clean package -DskipTests -T 1C \
    -Dmaven.compiler.source=17 \
    -Dmaven.compiler.target=17 \
    -Dmaven.javadoc.skip=true

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

# Install necessary packages
RUN apk add --no-cache tzdata

WORKDIR /app

# Copy built JAR file
COPY --from=build /app/target/*.jar app.jar

# Set timezone
ENV TZ=Asia/Seoul

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
