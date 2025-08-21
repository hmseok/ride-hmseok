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
├── .github/workflows/       # GitHub Actions 자동 배포
│   ├── deploy.yml           # 기본 배포 워크플로우
│   └── docker-deploy.yml    # Docker 기반 배포 워크플로우
├── deploy.sh                # 배포 스크립트
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

## 자동 배포 설정

### GitHub Actions 워크플로우

이 프로젝트는 GitHub Actions를 사용하여 메인 브랜치에 푸시될 때마다 자동으로 배포됩니다.

#### 워크플로우 파일
- **`.github/workflows/deploy.yml`**: 기본 배포 워크플로우
- **`.github/workflows/docker-deploy.yml`**: Docker 기반 배포 워크플로우 (권장)

#### 자동 배포 과정
1. **백엔드 빌드**: Spring Boot 애플리케이션을 Maven으로 빌드
2. **프론트엔드 빌드**: React 애플리케이션을 npm으로 빌드
3. **Docker 이미지 생성**: 백엔드와 프론트엔드를 각각 Docker 이미지로 생성
4. **컨테이너 레지스트리 푸시**: GitHub Container Registry에 이미지 업로드
5. **자동 배포**: 메인 브랜치에 푸시된 경우에만 서버에 자동 배포

#### 브랜치 전략
- **`hmseok-dev`**: 개발 브랜치 (기능 개발 및 테스트)
- **`main`**: 메인 브랜치 (자동 배포 트리거)

#### 배포 방법
1. `hmseok-dev` 브랜치에서 개발 완료
2. `main` 브랜치로 Pull Request 생성
3. 코드 리뷰 후 `main` 브랜치로 머지
4. 자동으로 CI/CD 파이프라인 실행
5. 서버에 자동 배포 완료

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
- **CI/CD**: GitHub Actions, Docker Container Registry
# ride-hmseok
