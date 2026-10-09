$tests = @('milk.jpg', 'paneer.jpg', 'butter.jpg', 'atta.jpg', 'rice.jpg', 'oil.jpg', 'bread.jpg', 'sourdough.jpg', 'chips.jpg', 'bhujia.jpg', 'choco-fills.jpg')
foreach ($t in $tests) {
  try {
    $r = Invoke-WebRequest -Uri "http://localhost:3000/images/products/$t" -Method Head -UseBasicParsing
    $len = $r.Headers["Content-Length"]
    $type = $r.Headers["Content-Type"]
    Write-Host "$t -> $($r.StatusCode) (Size: $len, Type: $type)"
  } catch {
    Write-Host "$t -> Error $_"
  }
}
