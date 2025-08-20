FROM openjdk:17-jdk-slim

WORKDIR /app

# Maven Wrapper와 pom.xml 복사
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# 의존성 다운로드
RUN ./mvnw dependency:go-offline -B

# 소스 코드 복사
COPY src ./src

# 애플리케이션 빌드
RUN ./mvnw package -DskipTests

# 실행 가능한 JAR 파일을 app.jar로 이름 변경
RUN mv target/*.jar app.jar

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
