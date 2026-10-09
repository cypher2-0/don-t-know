$candidates = @(
  'https://cdn.grofers.com/app/images/products/sliding_image/484931a.jpg',
  'https://cdn.grofers.com/app/images/products/full_screen/pro_484931.jpg',
  'https://cdn.grofers.com/app/images/products/sliding_image/112675a.jpg',
  'https://cdn.grofers.com/app/images/products/full_screen/pro_112675.jpg',
  'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/7a1700ee-dd38-49cf-b34e-171ff84ac0e7.png'
)

foreach ($u in $candidates) {
  try {
    $res = Invoke-WebRequest -Uri $u -Method Head -UserAgent 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' -UseBasicParsing
    Write-Host "SUCCESS ($($res.StatusCode)): $u"
  } catch {
    Write-Host "FAIL: $u ($_)"
  }
}
