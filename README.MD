## Snapshot 网页快照服务

- 下载脚本

```
git clone https://github.com/zeng444/puppeteer.docker.composer.git snapshot

```

- 编译容器

```
cd snapshot
docker-compose -p node -f /usr/local/src/node/docker-compose.yml up -d 
```

- 安装项目依赖

```
docker exec -it snapshot "yarn install"
```

- 重启项目

```
docker restart snapshot
```