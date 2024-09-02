@echo off
powershell ./scripts/buildDoc.bat
git add . && git commit -m %1 && git push
vsce publish patch