#!/bin/bash

# 자동 배포 스크립트
# 이 스크립트는 GitHub Actions에서 실행됩니다.

echo "🚀 배포를 시작합니다..."

# 환경 변수 설정
BACKEND_IMAGE="$REGISTRY/$IMAGE_NAME/backend:$GITHUB_SHA"
FRONTEND_IMAGE="$REGISTRY/$IMAGE_NAME/frontend:$GITHUB_SHA"

echo "📦 백엔드 이미지: $BACKEND_IMAGE"
echo "📦 프론트엔드 이미지: $FRONTEND_IMAGE"

# Docker Compose를 사용한 배포
if [ -f "docker-compose.yml" ]; then
    echo "🐳 Docker Compose를 사용하여 배포합니다..."
    
    # 환경 변수 파일 생성
    cat > .env << EOF
BACKEND_IMAGE=$BACKEND_IMAGE
FRONTEND_IMAGE=$FRONTEND_IMAGE
GITHUB_SHA=$GITHUB_SHA
EOF
    
    # 기존 컨테이너 중지 및 제거
    docker-compose down
    
    # 새 이미지로 컨테이너 시작
    docker-compose up -d
    
    echo "✅ Docker Compose 배포가 완료되었습니다!"
else
    echo "⚠️  docker-compose.yml 파일을 찾을 수 없습니다."
    echo "📝 수동 배포가 필요합니다."
fi

echo "🎉 배포 프로세스가 완료되었습니다!"
