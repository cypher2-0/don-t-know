$urls = @{
  "milk" = "https://cdn.grofers.com/da/cms-assets/cms/product/52173fba-2d70-40f9-adae-eb4e22696b4f.jpg"
  "paneer" = "https://cdn.grofers.com/app/images/products/sliding_image/4412a.jpg"
  "butter" = "https://cdn.grofers.com/app/images/products/sliding_image/160a.jpg"
  "atta" = "https://cdn.grofers.com/app/images/products/sliding_image/3472a.jpg"
  "rice" = "https://cdn.grofers.com/app/images/products/sliding_image/274a.jpg"
  "oil" = "https://cdn.grofers.com/app/images/products/sliding_image/24194a.jpg"
  "bread" = "https://cdn.grofers.com/app/images/products/sliding_image/311a.jpg"
  "chips" = "https://cdn.grofers.com/app/images/products/sliding_image/10894a.jpg"
  "bhujia" = "https://cdn.grofers.com/app/images/products/sliding_image/277a.jpg"
  "choco-fills" = "https://cdn.grofers.com/app/images/products/sliding_image/11438a.jpg"
  "sourdough" = "https://cdn.grofers.com/app/images/products/sliding_image/477439a.jpg"
}

$destDir = "public\images\products"

foreach ($name in $urls.Keys) {
  $url = $urls[$name]
  $destPath = Join-Path $destDir "$name.jpg"
  try {
    Write-Host "Downloading $name from $url..."
    Invoke-WebRequest -Uri $url -OutFile $destPath -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -UseBasicParsing
    $fileInfo = Get-Item $destPath
    Write-Host "Successfully saved $name.jpg (Size: $($fileInfo.Length) bytes)"
  } catch {
    Write-Host "Failed to download $name : $_"
  }
}
