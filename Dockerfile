# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

# 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 복사 및 빌드
COPY . .
RUN pnpm build

# 2단계: 실행 스테이지
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Next.js standalone은 기본적으로 3000포트를 사용합니다.
ENV PORT=3000

# 보안을 위해 비루트 사용자 생성
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 빌드 결과물 중 실행에 필요한 파일만 골라 담기 (가장 중요!)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static

USER appuser
EXPOSE 3000

# standalone 모드에서는 node server.js로 실행합니다.
CMD ["node", "server.js"]