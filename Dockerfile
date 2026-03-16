# 1단계: 빌드 (Build stage)
FROM node:20-alpine AS builder
WORKDIR /app

# pnpm 사용을 위한 설정
RUN corepack enable

# 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 코드 복사 및 빌드
COPY . .
RUN pnpm build

# 2단계: 실행 (Production stage)
# Vite 빌드 결과물(dist)을 서빙하기 위해 가벼운 nginx 이미지를 사용합니다.
FROM nginx:stable-alpine

# 빌드된 정적 파일들을 nginx의 기본 배포 경로로 복사합니다.
# Vite의 기본 빌드 폴더명은 dist입니다.
COPY --from=builder /app/dist /usr/share/nginx/html

# 컨테이너의 80번 포트를 외부에 노출합니다.
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]