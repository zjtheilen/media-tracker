$ErrorActionPreference = "Stop"

pyinstaller --clean --onefile --name WASABI `
    --icon "wasabi.ico" `
    --add-data "index.html;." `
    --add-data "styles.css;." `
    --add-data "favicon.ico;." `
    --add-data "api.js;." `
    --add-data "app.js;." `
    --add-data "charts.js;." `
    --add-data "constants.js;." `
    --add-data "entries.js;." `
    --add-data "filters.js;." `
    --add-data "forms.js;." `
    --add-data "library.js;." `
    --add-data "lists.js;." `
    --add-data "navigation.js;." `
    --add-data "state.js;." `
    "launcher.py"

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "WASABI build complete: dist\WASABI.exe"
