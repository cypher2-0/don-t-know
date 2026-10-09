$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path 'public/images/products' | Out-Null
New-Item -ItemType Directory -Force -Path 'mobile/assets/products' | Out-Null

$items = @(
  @{ name = 'milk.jpg'; url = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'paneer.jpg'; url = 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'butter.jpg'; url = 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'bananas.jpg'; url = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'apples.jpg'; url = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'tomatoes.jpg'; url = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'atta.jpg'; url = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'rice.jpg'; url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'oil.jpg'; url = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'bread.jpg'; url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'sourdough.jpg'; url = 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'chips.jpg'; url = 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'bhujia.jpg'; url = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80' },
  @{ name = 'choco-fills.jpg'; url = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80' }
)

foreach ($item in $items) {
  $file = Join-Path 'public/images/products' $item.name
  Write-Host "Downloading $($item.name)..."
  Invoke-WebRequest -Uri $item.url -OutFile $file -UseBasicParsing
  Copy-Item $file (Join-Path 'mobile/assets/products' $item.name) -Force
}

Get-ChildItem 'public/images/products' | Select-Object Name, Length
