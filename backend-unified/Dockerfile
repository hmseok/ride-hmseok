FROM maven:3.9.5-openjdk-17 AS build

WORKDIR /app

# pom.xml 복사
COPY pom.xml .

# 의존성 다운로드
RUN mvn dependency:go-offline -B

# 소스 코드 복사
COPY src src

# 애플리케이션 빌드
RUN mvn clean package -DskipTests

# 실행 단계
FROM openjdk:17-jdk-slim

WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=build /app/target/*.jar app.jar

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
