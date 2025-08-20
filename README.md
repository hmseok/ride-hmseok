# 업무관리 시스템 (Task Management System)

## 프로젝트 구조

```
라이드-hmseok/
├── backend/                 # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── taskmanagement/
│   │   │   │           ├── controller/     # API 컨트롤러
│   │   │   │           ├── service/        # 비즈니스 로직
│   │   │   │           ├── repository/     # 데이터 접근 계층
│   │   │   │           ├── entity/         # JPA 엔티티
│   │   │   │           ├── dto/            # 데이터 전송 객체
│   │   │   │           └── config/         # 설정 클래스
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── db/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                # React 프론트엔드
│   ├── public/
│   ├── src/
│   │   ├── components/      # 공통 컴포넌트
│   │   ├── pages/          # 페이지별 컴포넌트
│   │   │   ├── dashboard/   # 대시보드 페이지
│   │   │   ├── tasks/       # 업무 관리 페이지
│   │   │   ├── projects/    # 프로젝트 관리 페이지
│   │   │   ├── users/       # 사용자 관리 페이지
│   │   │   └── reports/     # 리포트 페이지
│   │   ├── services/        # API 서비스
│   │   ├── utils/           # 유틸리티 함수
│   │   └── App.js
│   ├── package.json
│   └── Dockerfile
├── database/                # 데이터베이스 스크립트
│   ├── schema.sql
│   └── data.sql
├── docker-compose.yml       # 전체 시스템 실행
└── README.md
```

## 주요 기능

### 백엔드 (Spring Boot)
- RESTful API 제공
- JPA/Hibernate를 통한 데이터베이스 연동
- Spring Security를 통한 인증/인가
- 각 페이지별 API 엔드포인트 분리

### 프론트엔드 (React)
- 각 페이지별 독립적인 컴포넌트 구조
- React Router를 통한 페이지 라우팅
- Axios를 통한 API 통신
- 반응형 UI/UX

### 데이터베이스 (MySQL)
- 업무, 프로젝트, 사용자, 리포트 등 테이블 구조
- 관계형 데이터 모델링

## 실행 방법

### 백엔드 실행
```bash
cd backend
./mvnw spring-boot:run
```

### 프론트엔드 실행
```bash
cd frontend
npm install
npm start
```

### 전체 시스템 실행 (Docker)
```bash
docker-compose up -d
```

## 기술 스택

- **백엔드**: Spring Boot 3.x, Spring Data JPA, Spring Security, MySQL
- **프론트엔드**: React 18, React Router, Axios, Tailwind CSS
- **데이터베이스**: MySQL 8.0
- **개발 도구**: Maven, npm, Docker
# ride-hmseok
