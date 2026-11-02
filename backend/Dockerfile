FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY . .
ARG SERVICE
RUN mvn --batch-mode --no-transfer-progress -pl "${SERVICE}" -am -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
ARG SERVICE
COPY --from=build "/workspace/${SERVICE}/target/${SERVICE}-1.0.0-SNAPSHOT.jar" /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
