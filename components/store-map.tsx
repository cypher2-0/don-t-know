'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { stores } from '@/lib/mock-data'

type Props = { selected: number; onSelect: (i: number) => void }

const toneFor = (status: string) => (status === 'Critical' ? '#ef4444' : status === 'Watch' ? '#f59e0b' : '#22c55e')

function markerIcon(status: string, active: boolean) {
  const color = toneFor(status)
  const size = active ? 30 : 22
  return L.divIcon({
    className: 'store-marker',
    html: `<span class="store-marker__dot" style="background:${color};width:${size}px;height:${size}px;box-shadow:${active ? `0 0 0 4px ${color}40, 0 2px 6px rgba(0,0,0,.3)` : '0 2px 5px rgba(0,0,0,.3)'}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function FollowStore({ index }: { index: number }) {
  const map = useMap()
  useEffect(() => {
    const s = stores[index]
    if (s) map.flyTo([s.lat, s.lng], 13, { duration: 0.7 })
  }, [index, map])
  return null
}

export default function StoreMap({ selected, onSelect }: Props) {
  return (
    <div className="h-[240px] overflow-hidden rounded-xl border border-border/70">
      <MapContainer center={[12.9716, 77.5946]} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <FollowStore index={selected} />
        {stores.map((store, i) => (
          <Marker
            key={store.name}
            position={[store.lat, store.lng]}
            icon={markerIcon(store.status, selected === i)}
            eventHandlers={{ click: () => onSelect(i) }}
          >
            <Popup>
              <div className="min-w-[160px]">
                <p className="text-[13px] font-bold text-[#163f32]">{store.name}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{store.city} · {store.status}</p>
                <div className="mt-2 space-y-1 text-[11px]">
                  <p className="flex justify-between gap-4"><span className="text-muted-foreground">Sales</span><span className="font-bold text-[#163f32]">{store.sales}</span></p>
                  <p className="flex justify-between gap-4"><span className="text-muted-foreground">Risk</span><span className="font-bold text-[#163f32]">{store.risk}%</span></p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}