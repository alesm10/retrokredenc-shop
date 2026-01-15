@echo off
REM Skript pro automatické kopírování fotek z Google Drive do public/products/
REM Použití: Spusťte každých 5 minut pomocí Task Scheduler

REM Cesta k Google Drive složce (UPRAVTE podle vašeho nastavení)
set "DRIVE_FOLDER=%USERPROFILE%\Google Drive\Retro Kredenc - Fotky produktů"

REM Cesta k projektu (UPRAVTE podle vašeho nastavení)
set "PROJECT_FOLDER=C:\cesta\k\projektu\retrokredenc\public\products"

REM Zkontrolujte, zda Google Drive složka existuje
if not exist "%DRIVE_FOLDER%" (
    echo Chyba: Google Drive složka neexistuje: %DRIVE_FOLDER%
    echo Zkontrolujte cestu ve skriptu nebo vytvořte složku na Google Drive.
    exit /b 1
)

REM Zkontrolujte, zda projektová složka existuje
if not exist "%PROJECT_FOLDER%" (
    echo Chyba: Projektová složka neexistuje: %PROJECT_FOLDER%
    echo Zkontrolujte cestu ve skriptu.
    exit /b 1
)

REM Počet zkopírovaných souborů
set /a COPIED=0

REM Zkopírujte všechny nové fotky (jen .jpg, .jpeg, .png)
for %%f in ("%DRIVE_FOLDER%\*.jpg" "%DRIVE_FOLDER%\*.jpeg" "%DRIVE_FOLDER%\*.png") do (
    if exist "%%f" (
        copy /Y "%%f" "%PROJECT_FOLDER%\" >nul 2>&1
        if !errorlevel! equ 0 (
            echo ✓ Zkopírováno: %%~nxf
            set /a COPIED+=1
        ) else (
            echo ✗ Chyba při kopírování: %%~nxf
        )
    )
)

if %COPIED% gtr 0 (
    echo Hotovo! Zkopírováno %COPIED% souborů.
) else (
    echo Žádné nové fotky k zkopírování.
)
