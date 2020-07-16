FROM buildkite/puppeteer

LABEL maintainer="Robert <robert@janfish.cn>"
LABEL description="Build a specified version of NODE";

EXPOSE 80

COPY ./simsun.ttc /usr/share/fonts/truetype/liberation/simsun.ttc
COPY ./simsun.ttf /usr/share/fonts/truetype/liberation/simsun.ttf

WORKDIR /snapshot
RUN yarn config set registry https://registry.npm.taobao.org \
    && yarn config set puppeteer_download_host=https://npm.taobao.org/mirrors \
    && yarn global add pm2@latest