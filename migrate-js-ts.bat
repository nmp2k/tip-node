@echo off
setlocal enabledelayedexpansion
set "current_directory=%CD%"
:process_directory
rem Process the directory
if "%~1" == "" (
    set "current_directory=%current_directory%"
) else (
    cd /d "%~1" 
)

rem Check files in the current directory excluding the "node_modules" directory
for /f "tokens=*" %%F in ('dir /b') do (
    if /I not "%%~nxF" == "node_modules" (
        if exist "%%~F\" (
            rem If it is a directory, call the command with that directory
            call :process_directory "%%~F"
        ) else (
            rem If it is a file, check the file extension
            echo Checking file "%%~F"...
            set "extension=%%~xF"
            set "extension=!extension:~1!"
            if /I "!extension!" == "js" (
                rem Rename the file with extension "js" to "ts"
                ren "%%~F" "%%~nF.ts"
                echo Renamed file "%%~F" to "%%~nF.ts"
            )
        )
    )
)

cd ..
exit /b