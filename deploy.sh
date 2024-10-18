#!/bin/sh

# 47.97.85.152
# 用户名：root
# 密码：Zn82461787

# 前台目录 /usr/share/nginx/html

npm run build

tar zcf dist.tar.gz dist

scp dist.tar.gz root@47.97.85.152:/usr/share/nginx/html
echo '代码包上传成功'

ssh root@47.97.85.152 "cd /usr/share/nginx/html && rm -rf dist/* && tar xvf dist.tar.gz dist && mv dist.tar.gz dist-back.tar.gz && exit"
