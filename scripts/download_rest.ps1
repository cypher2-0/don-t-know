$urls = @{
  "paneer" = "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/7a1700ee-dd38-49cf-b34e-171ff84ac0e7.png"
  "rice" = "https://cdn.grofers.com/app/images/products/sliding_image/484931a.jpg"
  "chips" = "https://cdn.zeptonow.com/production/ik-seo/cms/product_variant/3670956d-0b8c-424e-8cef-1ab5e4e12527/Lay-s-Classic-Salted-Potato-Chips-Combo.jpg"
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
