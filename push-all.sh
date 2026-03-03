#!/bin/bash
DATE=$(date +"%d/%m/%Y")

git add .
git commit -m "$DATE" || echo "no changes"
git push origin master -f