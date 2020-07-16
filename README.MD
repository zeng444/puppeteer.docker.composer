## 

- 编译容器
```
 docker-compose -p node -f /usr/local/src/node/docker-compose.yml up -d 
```


- 安装项目依赖

```
docker exec -it snapshot "yarn install"
```

- 项目重启

```
docker restart snapshot
```