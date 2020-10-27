#!/bin/sh
cd /Users/francis/Documents/个人/node/myPro/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "">access.log
