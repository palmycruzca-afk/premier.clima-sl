Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$background = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point(0, 0)),
  (New-Object System.Drawing.Point($width, $height)),
  ([System.Drawing.Color]::FromArgb(2, 6, 23)),
  ([System.Drawing.Color]::FromArgb(7, 89, 133))
)
$graphics.FillRectangle($background, 0, 0, $width, $height)
$background.Dispose()

$glow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(42, 34, 211, 238))
$graphics.FillEllipse($glow, 720, -140, 620, 620)
$glow.Dispose()

$card = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 2, 15, 40))
$graphics.FillRectangle($card, 82, 155, 170, 170)
$card.Dispose()
$border = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(170, 103, 232, 249), 3)
$graphics.DrawRectangle($border, 82, 155, 170, 170)
$border.Dispose()

$fanPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(245, 165, 243, 252), 10)
$graphics.DrawArc($fanPen, 111, 184, 112, 112, 25, 118)
$graphics.DrawArc($fanPen, 111, 184, 112, 112, 145, 118)
$fanPen.Dispose()
$hub = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 165, 243, 252))
$graphics.FillEllipse($hub, 152, 225, 30, 30)
$hub.Dispose()

$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$cyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(103, 232, 249))
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(203, 213, 225))
$light = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(186, 230, 253))
$fontTitle = New-Object System.Drawing.Font('Arial', 54, [System.Drawing.FontStyle]::Bold)
$fontSl = New-Object System.Drawing.Font('Arial', 48, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font('Arial', 22, [System.Drawing.FontStyle]::Bold)
$fontDesc = New-Object System.Drawing.Font('Arial', 20, [System.Drawing.FontStyle]::Regular)
$graphics.DrawString('PREMIER CLIMA', $fontTitle, $white, 300, 168)
$graphics.DrawString('SL', $fontSl, $cyan, 302, 245)
$graphics.DrawString('AIRE ACONDICIONADO Y CALEFACCION', $fontSub, $muted, 302, 350)
$graphics.DrawString('Climatizacion profesional en Madrid Sur y Toledo', $fontDesc, $light, 302, 420)

$spark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 165, 243, 252))
$graphics.FillEllipse($spark, 1035, 120, 10, 10)
$graphics.FillEllipse($spark, 1078, 175, 6, 6)
$graphics.FillEllipse($spark, 986, 210, 8, 8)
$spark.Dispose()

$output = Join-Path $PSScriptRoot '..\public\og-image.png'
$bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
$fontTitle.Dispose(); $fontSl.Dispose(); $fontSub.Dispose(); $fontDesc.Dispose(); $white.Dispose(); $cyan.Dispose(); $muted.Dispose(); $light.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
