@echo off
title Checklist K3 Server + Cloudflare

cd /d "%~dp0"

echo ==========================================
echo       CHECKLIST K3
echo ==========================================
echo.

echo [1/2] Menjalankan Express Server...
start "Checklist K3 - Server" powershell -NoExit -Command "cd '%~dp0'; node --env-file=.env server/server.mjs"

timeout /t 3 /nobreak >nul

echo [2/2] Menjalankan Cloudflare Tunnel...
start "Checklist K3 - Cloudflare" powershell -NoExit -Command "cloudflared tunnel --url http://localhost:3000"

echo.
echo ==========================================
echo Server dan Cloudflare sedang dijalankan.
echo ==========================================
echo.
pause
