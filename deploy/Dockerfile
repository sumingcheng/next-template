# --------- 安装依赖 ----------- 
FROM node:18.19.0-alpine AS deps
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk add --no-cache libc6-compat && \
    npm install -g pnpm@9.4.0 --no-fund --no-audit && \
    pnpm config set registry https://registry.npmmirror.com

# 只复制依赖相关文件
COPY package.json pnpm-lock.yaml ./ 
RUN pnpm install

# --------- 构建应用 ----------- 
FROM node:18.19.0-alpine AS builder
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    npm install -g pnpm@9.4.0 --no-fund --no-audit && \
    pnpm config set registry https://registry.npmmirror.com

# 复制依赖和源代码
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用 禁用遥测
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm run build

# --------- 运行应用 ----------- 
FROM node:18.19.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 只复制必要的构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

ENTRYPOINT ["node"]
CMD ["server.js"]
