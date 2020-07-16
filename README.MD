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

- 应用代码

app目录下为应用代码docker-compose.yml，中应用挂在的代码目录