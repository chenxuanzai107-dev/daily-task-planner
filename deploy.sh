#!/bin/bash
# Daily Task Planner — Deployment Script
# Usage: bash deploy.sh [aliyun|tencent|github]

set -e

echo "Building project..."
npm run build

case "${1:-github}" in
  aliyun)
    echo "Deploying to Aliyun OSS..."
    # Prerequisites: npm install -g @alicloud/oss-deploy
    # Set env: ALIYUN_ACCESS_KEY_ID, ALIYUN_ACCESS_KEY_SECRET
    oss-deploy --bucket "${OSS_BUCKET}" --region "${OSS_REGION:-oss-cn-hangzhou}" --source dist/
    echo "Done! CDN refresh may take a few minutes."
    ;;

  tencent)
    echo "Deploying to Tencent COS..."
    # Prerequisites: npm install -g @tencent/cos-deploy
    cos-deploy --bucket "${COS_BUCKET}" --region "${COS_REGION:-ap-guangzhou}" --source dist/
    echo "Done!"
    ;;

  github)
    echo "Deploying to GitHub Pages..."
    npx gh-pages -d dist -m "deploy: $(date '+%Y-%m-%d %H:%M')"
    echo "Done! https://chenxuanzai107-dev.github.io/daily-task-planner/"
    ;;

  *)
    echo "Unknown target: $1"
    echo "Usage: bash deploy.sh [aliyun|tencent|github]"
    exit 1
    ;;
esac
