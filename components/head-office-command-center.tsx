'use client'

import React, { useState } from 'react'
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeAlert,
  Boxes,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Flame,
  Gauge,
  Layers,
  LayoutGrid,
  ListFilter,
  MapPin,
  Maximize2,
  Minus,
  Network,
  Package,
  Phone,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Store,
  Table,
  Tag,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'
import {
  headOfficeStoreRankings,
  storeCorrelationProfiles,
  storeManagerChecklists,
  storeOperationalDiagnosis,
  type ManagerChecklistItem,
  type StoreCorrelationProfile,
  type StoreUrgencyRanking,
  type UrgencyTier,
  type VectorType,
} from '@/lib/head-office-ops'

import franchiseDataset from '@/data/franchise_ops/aggregated_franchise_ops.json'

export default function HeadOfficeCommandCenter() {
  const [dataSource, setDataSource] = useState<'franchise_25' | 'deep_5'>('franchise_25')
  const [activeTab, setActiveTab] = useState<'rankings' | 'correlator' | 'checklist' | 'simulator'>('rankings')
  const [selectedStoreId, setSelectedStoreId] = useState<string>('Whitefield')
  const [tierFilter, setTierFilter] = useState<'All' | UrgencyTier>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  // Checklist state
  const [checklists, setChecklists] = useState(storeManagerChecklists)
  const [checklistShiftFilter, setChecklistShiftFilter] = useState<string>('All')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)

  // Simulation state
  const [markdownDiscount, setMarkdownDiscount] = useState<number>(40)
  const [transferUnits, setTransferUnits] = useState<number>(35)
  const [executedActions, setExecutedActions] = useState<
    { id: string; title: string; time: string; type: string; details: string; status: 'Active' | 'Executed' }[]
  >([
    {
      id: 'init-1',
      title: 'Dynamic Weather Dampener Activated',
      time: '06:00 AM',
      type: 'Replenishment',
      details: 'Adjusted standing perishables replenishment factor by -15% based on Sunday cloudburst history.',
      status: 'Active',
    },
    {
      id: 'init-2',
      title: 'Automated Cold-Chain IoT Alert Logged',
      time: '03:15 AM',
      type: 'Maintenance',
      details: 'Sensor #CH-2 logged thermal spike (+6.8°C); ticket #FAC-441-EXP pre-staged for technician.',
      status: 'Active',
    },
  ])
  const [notificationToast, setNotificationToast] = useState<{ message: string; type: 'success' | 'alert' } | null>(null)
  const currentStores =
    dataSource === 'franchise_25'
      ? (franchiseDataset.stores as any[]).map((s) => ({
          rank: s.rank,
          storeId: s.storeId,
          name: s.name,
          city: `${s.location} · ${s.format} (${s.franchisee})`,
          urgencyScore: s.urgencyScore,
          tier: s.tier as UrgencyTier,
          primaryIssue: s.primaryIssue,
          expiryRiskValue: Math.round(s.totalWastageValue / 10),
          stockoutSkus: s.stockoutCount,
          shrinkageAnomaly: `${s.totalWastageQty} units logged`,
          rosterGap: `${s.avgStaffingRatio}% avg staffing ratio`,
          estimatedDailyMarginLoss: s.dailyMarginLoss,
          lat: 12.9716,
          lng: 77.5946,
          managerName: `${s.franchisee} Lead`,
          managerPhone: `Store ID: ${s.storeId}`,
        }))
      : headOfficeStoreRankings

  const activeStoreRanking =
    currentStores.find(
      (s) =>
        s.name.toLowerCase().includes(selectedStoreId.toLowerCase()) ||
        s.storeId?.toLowerCase() === selectedStoreId.toLowerCase()
    ) || currentStores[0]

  const activeCorrelation =
    storeCorrelationProfiles[activeStoreRanking.name.split(' ')[0]] ||
    storeCorrelationProfiles[activeStoreRanking.name] ||
    storeCorrelationProfiles.Whitefield

  const activeDiagnosis =
    storeOperationalDiagnosis[activeStoreRanking.name.split(' ')[0]] ||
    storeOperationalDiagnosis[activeStoreRanking.name] ||
    storeOperationalDiagnosis.Whitefield

  const activeChecklist =
    checklists[activeStoreRanking.name.split(' ')[0]] ||
    checklists[activeStoreRanking.name] ||
    checklists.Whitefield ||
    []

  // Filtered stores
  const filteredStores = currentStores.filter((store) => {
    const matchesTier = tierFilter === 'All' || store.tier === tierFilter
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.primaryIssue.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTier && matchesSearch
  })

  // Toggle checklist item
  const handleToggleChecklist = (itemId: string) => {
    const key = activeStoreRanking.name.split(' ')[0]
    setChecklists((prev) => {
      const storeItems = prev[key] || prev.Whitefield || []
      const updated = storeItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
      return { ...prev, [key]: updated }
    })
  }

  // Add custom task
  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newItem: ManagerChecklistItem = {
      id: `custom-${Date.now()}`,
      shift: 'Midday Rush (11:00 - 14:00)',
      title: newTaskTitle.trim(),
      description: 'Ad-hoc floor task deployed from Head Office Operations Command.',
      assignee: newTaskAssignee.trim() || `${activeStoreRanking.managerName} (Store Mgr)`,
      dueTime: 'Today',
      priority: 'High',
      impactText: 'Manual operational safeguard',
      completed: false,
    }

    setChecklists((prev) => ({
      ...prev,
      [activeStoreRanking.name]: [newItem, ...(prev[activeStoreRanking.name] || [])],
    }))

    setNewTaskTitle('')
    setNewTaskAssignee('')
    setShowAddTask(false)
    showToast(`Task assigned: "${newItem.title}" to ${newItem.assignee}`, 'success')
  }

  // Toast helper
  const showToast = (message: string, type: 'success' | 'alert' = 'success') => {
    setNotificationToast({ message, type })
    setTimeout(() => setNotificationToast(null), 5000)
  }

  // Execute simulation trigger
  const handleTriggerAction = (type: 'markdown' | 'transfer' | 'escalation', customTitle?: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let title = ''
    let details = ''

    if (type === 'markdown') {
      const price = Math.round(42 * (1 - markdownDiscount / 100))
      const recovery = Math.round(2016 * (markdownDiscount > 50 ? 0.45 : 0.6))
      title = customTitle || `Published ${markdownDiscount}% Clearance Markdown on 48 Milk Units`
      details = `ESL shelf tags synced to ₹${price}. Push alert broadcasted to 380 app shoppers in ${activeStoreRanking.name}. Projected recovery: ₹${recovery}.`
    } else if (type === 'transfer') {
      const marginRecovered = Math.round(transferUnits * 110)
      title = customTitle || `Dispatched Emergency Transfer: ${transferUnits} Bread Units from Indiranagar Hub`
      details = `Intra-city express courier transit dispatched (ETA 18 min). POS allocation transferred. Recovers ₹${marginRecovered} lost margin.`
    } else {
      title = customTitle || `Emergency HVAC Dispatch Ticket #FAC-441 Issued to CoolTech`
      details = `Contractor SLA 2-Hour response confirmed. 120 units safe frozen stock segregated for 25% salvage markdown.`
    }

    setExecutedActions((prev) => [
      {
        id: `act-${Date.now()}`,
        title,
        time,
        type: type.toUpperCase(),
        details,
        status: 'Active',
      },
      ...prev,
    ])

    showToast(`TRIGGER EXECUTED: ${title}`, 'success')
  }

  // Chain stats
  const totalMarginAtRisk = currentStores.reduce((acc, s) => acc + s.estimatedDailyMarginLoss, 0)
  const totalStockoutSkus = currentStores.reduce((acc, s) => acc + s.stockoutSkus, 0)
  const totalExpiryRisk = currentStores.reduce((acc, s) => acc + s.expiryRiskValue, 0)
  const tier1Count = currentStores.filter((s) => s.tier === 'Tier 1: Immediate Intervention').length

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Toast Notification Banner */}
      {notificationToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3.5 rounded-2xl border border-emerald-500/40 bg-[#082218]/95 px-5 py-3.5 text-white shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
            <Zap className="size-4 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
              Live Trigger Executed
            </p>
            <p className="text-[12px] font-semibold text-slate-100">{notificationToast.message}</p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MISSION-CONTROL HERO COMMAND DECK */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-[32px] border border-emerald-500/20 bg-gradient-to-br from-[#041c14] via-[#092e22] to-[#0c3c2e] p-6 sm:p-8 text-white shadow-2xl">
        {/* Subtle decorative mesh gradients */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 size-80 rounded-full bg-[#a6c83f]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#a8f2ca] border border-emerald-500/30">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                Live Network Telemetry
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-rose-500/25 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-200 border border-rose-500/40">
                <Flame className="size-3 text-rose-400" />
                {tier1Count} Stores Need Tier-1 Intervention
              </span>

              {/* Live Dataset Source Switcher */}
              <div className="flex items-center rounded-2xl bg-white/10 p-1 border border-white/15">
                <button
                  onClick={() => {
                    setDataSource('franchise_25')
                    setSelectedStoreId(franchiseDataset.stores[0].name)
                  }}
                  className={`rounded-xl px-3 py-1 text-[10px] font-black transition-all ${
                    dataSource === 'franchise_25'
                      ? 'bg-white text-[#041c14] shadow-sm'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  ✦ 25-Store Franchise Dataset (54k Records)
                </button>
                <button
                  onClick={() => {
                    setDataSource('deep_5')
                    setSelectedStoreId('Whitefield')
                  }}
                  className={`rounded-xl px-3 py-1 text-[10px] font-black transition-all ${
                    dataSource === 'deep_5'
                      ? 'bg-white text-[#041c14] shadow-sm'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  Focused 5-Store Telemetry
                </button>
              </div>
            </div>

            <h1 className="mt-3.5 text-[28px] sm:text-[34px] font-black tracking-tight text-white leading-tight">
              Head Office Multi-Store Urgency & Operations Command
            </h1>
            <p className="mt-2 max-w-3xl text-[13px] text-emerald-100/80 leading-relaxed font-normal">
              Autonomous retail governance engine. Real-time root-cause correlator bridging upstream supplier delivery delays & labor gaps to downstream expiry write-offs and lost basket margins.
            </p>
          </div>

          {/* High-Impact Stat Pods */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:gap-3.5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:bg-white/10">
              <div className="flex items-center justify-between text-emerald-200/80 mb-1">
                <span className="text-[10px] font-semibold">Total Margin at Risk</span>
                <TrendingDown className="size-3.5 text-rose-400" />
              </div>
              <p className="text-[20px] sm:text-[24px] font-black text-white tracking-tight">
                ₹{totalMarginAtRisk.toLocaleString('en-IN')}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-rose-300">
                <span className="rounded-sm bg-rose-500/30 px-1 py-0.2">HIGH IMPACT</span> across 5 stores
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:bg-white/10">
              <div className="flex items-center justify-between text-emerald-200/80 mb-1">
                <span className="text-[10px] font-semibold">Depleted Shelf SKUs</span>
                <Package className="size-3.5 text-amber-400" />
              </div>
              <p className="text-[20px] sm:text-[24px] font-black text-white tracking-tight">
                {totalStockoutSkus} <span className="text-[13px] font-medium text-emerald-200/70">SKUs</span>
              </p>
              <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-amber-300">
                <span>14 in Whitefield hub</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:bg-white/10">
              <div className="flex items-center justify-between text-emerald-200/80 mb-1">
                <span className="text-[10px] font-semibold">Expiry Spoilage Hazard</span>
                <Clock className="size-3.5 text-emerald-300" />
              </div>
              <p className="text-[20px] sm:text-[24px] font-black text-white tracking-tight">
                ₹{totalExpiryRisk.toLocaleString('en-IN')}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-emerald-300">
                <span>T-6h to T-24h window</span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 backdrop-blur-xl transition-all hover:bg-emerald-500/15">
              <div className="flex items-center justify-between text-emerald-200/80 mb-1">
                <span className="text-[10px] font-semibold">Selected Store Focus</span>
                <Radio className="size-3.5 text-[#a6c83f] animate-pulse" />
              </div>
              <p className="text-[20px] sm:text-[22px] font-black text-[#a6c83f] tracking-tight truncate">
                {activeStoreRanking.name}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[9px] font-extrabold text-emerald-200">
                <span>Urgency Score: {activeStoreRanking.urgencyScore}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Store Switcher Ribbon with Urgency Meter Rings */}
        <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-5">
          <span className="text-[11px] font-black text-emerald-200 uppercase tracking-widest mr-1">
            Focus Store:
          </span>
          {headOfficeStoreRankings.map((store) => {
            const isSelected = selectedStoreId.toLowerCase() === store.name.toLowerCase()
            const isTier1 = store.tier.includes('Tier 1')
            const isTier2 = store.tier.includes('Tier 2')

            return (
              <button
                key={store.name}
                onClick={() => setSelectedStoreId(store.name)}
                className={`group flex items-center gap-2.5 rounded-2xl px-3.5 py-2 text-[12px] font-extrabold transition-all duration-200 ${
                  isSelected
                    ? 'bg-white text-[#092e22] shadow-xl scale-105 ring-2 ring-emerald-400'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span className="text-[10px] opacity-60">#{store.rank}</span>
                  <span>{store.name}</span>
                </span>
                <span
                  className={`flex size-5 items-center justify-center rounded-full text-[9px] font-black ${
                    isTier1
                      ? 'bg-rose-500 text-white'
                      : isTier2
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-emerald-400 text-slate-950'
                  }`}
                >
                  {store.urgencyScore}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 DELIVERABLES NAVIGATION TABS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-200/60 p-1.5 shadow-inner">
          <button
            onClick={() => setActiveTab('rankings')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-extrabold transition-all ${
              activeTab === 'rankings'
                ? 'bg-white text-[#092e22] shadow-sm scale-[1.02]'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/40'
            }`}
          >
            <Store className="size-4 text-[#092e22]" />
            1. Multi-Store Urgency Rankings
          </button>

          <button
            onClick={() => setActiveTab('correlator')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-extrabold transition-all ${
              activeTab === 'correlator'
                ? 'bg-white text-[#092e22] shadow-sm scale-[1.02]'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/40'
            }`}
          >
            <Network className="size-4 text-[#092e22]" />
            2. Root-Cause Correlator (5-Vector)
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-extrabold transition-all ${
              activeTab === 'checklist'
                ? 'bg-white text-[#092e22] shadow-sm scale-[1.02]'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/40'
            }`}
          >
            <CheckCircle2 className="size-4 text-[#092e22]" />
            3. Store Manager Daily Checklist
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-extrabold transition-all ${
              activeTab === 'simulator'
                ? 'bg-white text-[#092e22] shadow-sm scale-[1.02]'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/40'
            }`}
          >
            <Zap className="size-4 text-[#092e22]" />
            4. Simulated Triggers & Action Engine
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-1.5 text-[11px] font-bold text-emerald-900">
          <Activity className="size-3.5 text-emerald-600" />
          <span>Syncing 5-store telemetry stream</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DELIVERABLE 1: MULTI-STORE URGENCY RANKING DASHBOARD */}
      {/* ========================================================================= */}
      {activeTab === 'rankings' && (
        <div className="flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Filter Tier:</span>
              {(['All', 'Tier 1: Immediate Intervention', 'Tier 2: Watchlist & Risk Emerging', 'Tier 3: Operational Benchmark'] as const).map(
                (tier) => (
                  <button
                    key={tier}
                    onClick={() => setTierFilter(tier)}
                    className={`rounded-xl px-3.5 py-1.5 text-[11px] font-bold transition-all ${
                      tierFilter === tier
                        ? 'bg-[#092e22] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tier === 'All' ? 'All Tiers (5)' : tier.split(':')[0]}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                    viewMode === 'cards' ? 'bg-[#092e22] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <LayoutGrid className="size-3.5" /> Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                    viewMode === 'table' ? 'bg-[#092e22] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Table className="size-3.5" /> Matrix Table
                </button>
              </div>

              <div className="flex min-w-[220px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 shadow-2xs">
                <Search className="size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search store or issue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[12px] outline-none text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Cards View Mode */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredStores.map((store) => {
                const isSelected = selectedStoreId.toLowerCase() === store.name.toLowerCase()
                const isTier1 = store.tier.includes('Tier 1')
                const isTier2 = store.tier.includes('Tier 2')

                return (
                  <div
                    key={store.name}
                    onClick={() => setSelectedStoreId(store.name)}
                    className={`group relative flex flex-col justify-between rounded-3xl border p-5 shadow-sm transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-[#092e22] bg-[#f7fbf5] ring-2 ring-[#092e22]/20 shadow-lg scale-[1.01]'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Top Row: Rank, Store, Urgency Meter */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-10 items-center justify-center rounded-2xl text-[14px] font-black shadow-xs ${
                              isTier1
                                ? 'bg-rose-600 text-white'
                                : isTier2
                                ? 'bg-amber-500 text-white'
                                : 'bg-emerald-600 text-white'
                            }`}
                          >
                            #{store.rank}
                          </span>
                          <div>
                            <h3 className="text-[16px] font-black text-slate-900 group-hover:text-[#092e22] transition-colors">
                              {store.name}
                            </h3>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1">
                              <MapPin className="size-3 text-slate-400" /> {store.city}
                            </p>
                          </div>
                        </div>

                        {/* Urgency Score Pod */}
                        <div className="text-right">
                          <div
                            className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[12px] font-black shadow-2xs ${
                              isTier1
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : isTier2
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            <Gauge className="size-3.5" />
                            <span>{store.urgencyScore}/100</span>
                          </div>
                          <p className="mt-0.5 text-[9px] font-bold text-slate-400">URGENCY SCORE</p>
                        </div>
                      </div>

                      {/* Primary Issue Box */}
                      <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-3.5">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          Primary Operational Bottleneck:
                        </p>
                        <p className="mt-1 text-[11px] font-semibold text-slate-800 leading-snug">
                          {store.primaryIssue}
                        </p>
                      </div>

                      {/* Metrics 3-Col Bar */}
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-[11px]">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Daily Margin Loss</p>
                          <p className="font-black text-rose-600">
                            ₹{store.estimatedDailyMarginLoss.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Stockout SKUs</p>
                          <p className="font-black text-slate-900">{store.stockoutSkus} items</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Expiry At-Risk</p>
                          <p className="font-black text-amber-700">₹{store.expiryRiskValue}</p>
                        </div>
                      </div>

                      <div className="mt-2 text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-700">Staffing & Roster:</span> {store.rosterGap}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-[10px] font-bold text-slate-500">
                        Mgr: {store.managerName}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedStoreId(store.name)
                            setActiveTab('correlator')
                          }}
                          className="flex items-center gap-1 rounded-xl bg-[#092e22] px-3 py-1.5 text-[10px] font-black text-white hover:bg-[#062017] transition-all shadow-xs"
                        >
                          Correlator <ArrowRight className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Matrix Table View Mode */}
          {viewMode === 'table' && (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 px-4">Rank & Store</th>
                      <th className="py-3.5 px-3">Urgency Score</th>
                      <th className="py-3.5 px-3">Tier Status</th>
                      <th className="py-3.5 px-3">Root-Cause Bottlenecks</th>
                      <th className="py-3.5 px-3">Daily Margin Loss</th>
                      <th className="py-3.5 px-3">Operational Details</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStores.map((store) => {
                      const isSelected = selectedStoreId.toLowerCase() === store.name.toLowerCase()
                      const isTier1 = store.tier.includes('Tier 1')
                      const isTier2 = store.tier.includes('Tier 2')

                      return (
                        <tr
                          key={store.name}
                          onClick={() => setSelectedStoreId(store.name)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`flex size-8 items-center justify-center rounded-xl text-[12px] font-black ${
                                  isTier1
                                    ? 'bg-rose-100 text-rose-700'
                                    : isTier2
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}
                              >
                                #{store.rank}
                              </span>
                              <div>
                                <p className="text-[13px] font-black text-slate-900">{store.name}</p>
                                <p className="text-[10px] text-slate-500">{store.city} · {store.managerName}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-3">
                            <span
                              className={`rounded-lg px-2.5 py-1 text-[11px] font-black ${
                                isTier1
                                  ? 'bg-rose-600 text-white'
                                  : isTier2
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-emerald-600 text-white'
                              }`}
                            >
                              {store.urgencyScore} / 100
                            </span>
                          </td>

                          <td className="py-4 px-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${
                                isTier1
                                  ? 'bg-rose-100 text-rose-800'
                                  : isTier2
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {store.tier.split(':')[0]}
                            </span>
                          </td>

                          <td className="py-4 px-3 max-w-[280px]">
                            <p className="text-[11px] text-slate-800 line-clamp-2 leading-relaxed">
                              {store.primaryIssue}
                            </p>
                          </td>

                          <td className="py-4 px-3">
                            <p className="text-[13px] font-black text-rose-600">
                              ₹{store.estimatedDailyMarginLoss.toLocaleString('en-IN')}
                            </p>
                            <p className="text-[9px] text-slate-400">per day</p>
                          </td>

                          <td className="py-4 px-3 text-[10px] text-slate-600 space-y-0.5">
                            <div>Stockout: <b>{store.stockoutSkus} SKUs</b></div>
                            <div>Expiry Hazard: <b className="text-amber-700">₹{store.expiryRiskValue}</b></div>
                            <div className="text-slate-400 text-[9px]">{store.rosterGap}</div>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedStoreId(store.name)
                                setActiveTab('correlator')
                              }}
                              className="rounded-xl bg-[#092e22] px-3.5 py-1.5 text-[10px] font-black text-white hover:bg-[#062017]"
                            >
                              Correlate →
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELIVERABLE 2: ROOT-CAUSE CORRELATOR (5-VECTOR ANALYSIS COCKPIT) */}
      {/* ========================================================================= */}
      {activeTab === 'correlator' && (
        <div className="flex flex-col gap-6">
          {/* Correlator Cockpit Header */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-wide">
                    Root-Cause Telemetry Correlator
                  </span>
                  <h2 className="text-[22px] font-black text-[#092e22]">
                    {activeStoreRanking.name}: 5-Vector Operational Coupling
                  </h2>
                </div>
                <p className="mt-1 text-[12px] text-slate-600 max-w-3xl leading-relaxed">
                  Real-time correlation across <b>Sales Velocity</b>, <b>Walk-in Footfall</b>, <b>Perishable Wastage</b>, <b>Staffing Roster Fill</b>, and <b>Inbound Logistics</b>. Identifies systemic root causes instead of treating surface-level symptoms.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-center">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Coupling Degree</p>
                  <p className="text-[20px] font-black text-[#092e22]">{activeCorrelation.overallCorrelationScore}%</p>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-center">
                  <p className="text-[9px] font-black uppercase text-rose-500 tracking-wider">Margin Bleed</p>
                  <p className="text-[20px] font-black text-rose-600">₹{activeStoreRanking.estimatedDailyMarginLoss / 1000}k</p>
                </div>
              </div>
            </div>

            {/* 5 Vectors Cockpit Cards */}
            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
              {activeCorrelation.vectors.map((vec) => {
                const isSevere = vec.status === 'Severe'
                const isElevated = vec.status === 'Elevated'

                const Icon =
                  vec.vector === 'Sales'
                    ? TrendingUp
                    : vec.vector === 'Footfall'
                    ? Users
                    : vec.vector === 'Wastage'
                    ? AlertTriangle
                    : vec.vector === 'Staffing'
                    ? UserCheck
                    : Truck

                return (
                  <div
                    key={vec.vector}
                    className={`rounded-2xl border p-4.5 transition-all duration-300 ${
                      isSevere
                        ? 'border-rose-300 bg-gradient-to-b from-rose-50/70 to-rose-50/30 shadow-xs'
                        : isElevated
                        ? 'border-amber-300 bg-gradient-to-b from-amber-50/70 to-amber-50/30 shadow-xs'
                        : 'border-emerald-300 bg-gradient-to-b from-emerald-50/70 to-emerald-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex size-7 items-center justify-center rounded-lg ${
                            isSevere ? 'bg-rose-100 text-rose-700' : isElevated ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <span className="text-[12px] font-black text-slate-900">{vec.label}</span>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-wider ${
                          isSevere
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : isElevated
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {vec.status}
                      </span>
                    </div>

                    <div className="mt-3.5">
                      <p className="text-[17px] font-black text-slate-900">{vec.actual}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Plan: {vec.benchmark}</p>
                    </div>

                    <div className="mt-3 rounded-xl bg-white/90 p-2.5 border border-slate-100 text-[10px] text-slate-700 leading-snug font-medium shadow-2xs">
                      {vec.evidence}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2">
                      <span className="text-[9px] font-bold text-slate-400">DELTA IMPACT</span>
                      <span className={`text-[11px] font-black ${isSevere ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {vec.keyMetric}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Interactive Coupling Pathways Pipeline */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h3 className="text-[16px] font-black text-[#092e22]">
              Active Cross-Vector Coupling Pathways
            </h3>
            <p className="mt-1 text-[11px] text-slate-500 mb-5">
              Quantified correlation pathways demonstrating how upstream logistics failures compound through staffing and weather into margin loss.
            </p>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {activeCorrelation.correlations.map((corr, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-2xs hover:bg-slate-50 transition-all hover:border-slate-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-[#092e22] px-3 py-1 text-[11px] font-black text-white shadow-xs">
                        {corr.driverVector}
                      </span>
                      <ArrowRight className="size-4 text-slate-400" />
                      <span className="rounded-xl bg-rose-600 px-3 py-1 text-[11px] font-black text-white shadow-xs">
                        {corr.impactedVector}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-xl bg-emerald-100 border border-emerald-200 px-2.5 py-1">
                      <span className="text-[9px] font-black text-emerald-800 uppercase">Coupling:</span>
                      <span className="text-[11px] font-black text-emerald-900 font-mono">
                        r = {corr.correlationCoefficient}
                      </span>
                    </div>
                  </div>

                  <p className="text-[12px] font-medium text-slate-800 leading-relaxed">
                    {corr.synthesis}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chronological Causal Timeline */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h3 className="text-[16px] font-black text-[#092e22]">
              Chronological Causal Timeline (Today&apos;s Escalation Sequence)
            </h3>
            <p className="mt-1 text-[11px] text-slate-500 mb-6">
              Step-by-step evolution of operational failures logged in {activeStoreRanking.name}.
            </p>

            <div className="relative border-l-2 border-emerald-300 ml-4 pl-6 space-y-6">
              {activeCorrelation.causalTimeline.map((item, i) => (
                <div key={i} className="relative group">
                  <div
                    className={`absolute -left-[31px] top-1 size-3.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${
                      item.severity === 'red'
                        ? 'bg-rose-500 ring-4 ring-rose-100'
                        : item.severity === 'amber'
                        ? 'bg-amber-500 ring-4 ring-amber-100'
                        : 'bg-emerald-500 ring-4 ring-emerald-100'
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-black text-slate-500">{item.time}</span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[9px] font-black uppercase text-slate-700">
                      {item.vector}
                    </span>
                    <h4 className="text-[13px] font-extrabold text-slate-900">{item.event}</h4>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                    {item.impactDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELIVERABLE 3: STORE MANAGER CUSTOMIZED DAILY CHECKLIST */}
      {/* ========================================================================= */}
      {activeTab === 'checklist' && (
        <div className="flex flex-col gap-6">
          {/* Header Card with Completion Ring */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-wide">
                    Operational Shift Protocol
                  </span>
                  <h2 className="text-[22px] font-black text-[#092e22]">
                    {activeStoreRanking.name}: Store Manager Daily Checklist
                  </h2>
                </div>
                <p className="mt-1 text-[12px] text-slate-600 max-w-2xl">
                  Automated shift priority matrix tailored for Store Manager <b>{activeStoreRanking.managerName}</b> ({activeStoreRanking.managerPhone}) to resolve {activeStoreRanking.name}&apos;s specific risk profile.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-2xs">
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Completion</p>
                    <p className="text-[16px] font-black text-[#092e22]">
                      {activeChecklist.filter((c) => c.completed).length} of {activeChecklist.length} tasks
                    </p>
                  </div>
                  <div className="size-11 rounded-full border-4 border-emerald-500/30 flex items-center justify-center font-black text-[12px] text-emerald-800 bg-emerald-50 shadow-inner">
                    {Math.round(
                      (activeChecklist.filter((c) => c.completed).length / (activeChecklist.length || 1)) * 100
                    )}%
                  </div>
                </div>

                <button
                  onClick={() => setShowAddTask(true)}
                  className="flex items-center gap-2 rounded-2xl bg-[#092e22] px-4 py-3 text-[12px] font-black text-white shadow-md hover:bg-[#062017] transition-all active:scale-95"
                >
                  <Plus className="size-4" /> Add Floor Task
                </button>
              </div>
            </div>

            {/* Shift Filter Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Shift Filter:</span>
              {['All', 'Morning Opening', 'Midday Rush', 'Afternoon Inbound', 'Evening Close'].map((shift) => (
                <button
                  key={shift}
                  onClick={() => setChecklistShiftFilter(shift)}
                  className={`rounded-xl px-3.5 py-1.5 text-[11px] font-bold transition-all ${
                    checklistShiftFilter === shift
                      ? 'bg-[#092e22] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {shift}
                </button>
              ))}
            </div>
          </div>

          {/* Add Task Form Modal */}
          {showAddTask && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-md animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[14px] font-black text-[#092e22]">
                  Deploy Ad-Hoc Task to {activeStoreRanking.name} Floor Team
                </h4>
                <button onClick={() => setShowAddTask(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddCustomTask} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  type="text"
                  placeholder="Task title (e.g. Audit Chiller 2 defrost temperature)"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-[12px] sm:col-span-2 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Assignee associate (e.g. Rajesh Kumar)"
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-[12px] outline-none"
                />
                <div className="sm:col-span-3 flex justify-end gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddTask(false)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[11px] font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#092e22] px-5 py-2 text-[11px] font-black text-white shadow-xs hover:bg-[#062017]"
                  >
                    Save & Dispatch Task
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Checklist Items Container */}
          <div className="flex flex-col gap-3">
            {activeChecklist
              .filter(
                (item) =>
                  checklistShiftFilter === 'All' || item.shift.toLowerCase().includes(checklistShiftFilter.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleChecklist(item.id)}
                  className={`flex cursor-pointer flex-col justify-between gap-4 rounded-3xl border p-5 shadow-2xs transition-all sm:flex-row sm:items-center ${
                    item.completed
                      ? 'border-emerald-200 bg-emerald-50/50 opacity-80'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-xl border-2 transition-all ${
                        item.completed
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                          : 'border-slate-300 bg-white hover:border-emerald-500'
                      }`}
                    >
                      {item.completed && <Check className="size-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-md px-2.5 py-0.5 text-[9px] font-black uppercase ${
                            item.priority === 'Critical'
                              ? 'bg-rose-100 text-rose-800'
                              : item.priority === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.priority}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">{item.shift}</span>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-md">
                          Due: {item.dueTime}
                        </span>
                      </div>

                      <h4
                        className={`mt-1.5 text-[14px] font-black text-slate-900 ${
                          item.completed ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-slate-600 leading-snug">{item.description}</p>

                      <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[10px]">
                        <span className="font-semibold text-slate-600">
                          👤 <b>Assignee:</b> {item.assignee}
                        </span>
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                          🎯 <b>Impact:</b> {item.impactText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick execute shortcut */}
                  {item.triggerKey && !item.completed && (
                    <div className="flex sm:flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (item.triggerKey === 'markdown') handleTriggerAction('markdown', item.title)
                          else if (item.triggerKey === 'transfer' || item.triggerKey === 'replenishment')
                            handleTriggerAction('transfer', item.title)
                          else handleTriggerAction('escalation', item.title)
                          handleToggleChecklist(item.id)
                        }}
                        className="rounded-xl bg-gradient-to-r from-[#092e22] to-[#145a44] px-4 py-2 text-[11px] font-black text-white shadow-xs hover:brightness-110 flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <Zap className="size-3.5 text-amber-300" /> Quick Trigger
                      </button>
                      <span className="text-[9px] text-slate-400">Syncs directly to POS & ESL</span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELIVERABLE 4: SIMULATED REPLENISHMENT, MARKDOWN & ESCALATION ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'simulator' && (
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-wide">
                    Algorithmic Decision Sandbox
                  </span>
                  <h2 className="text-[22px] font-black text-[#092e22]">
                    Simulated Replenishment, Markdown & Escalation Triggers
                  </h2>
                </div>
                <p className="mt-1 text-[12px] text-slate-600 max-w-3xl leading-relaxed">
                  Test operational interventions dynamically before deployment. Adjust clearance discount curves, cross-dock courier transfer batches, and facility contractor dispatches with immediate financial recovery projections.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Interactive Action Simulators */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 1. Clearance Markdown Engine */}
            <div className="flex flex-col justify-between rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                      <Tag className="size-4" />
                    </span>
                    <h3 className="text-[15px] font-black text-slate-900">Clearance Markdown Curve</h3>
                  </div>
                  <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[9px] font-black text-rose-700">
                    T-6h Spoilage
                  </span>
                </div>

                <p className="mt-2.5 text-[11px] text-slate-600 leading-snug">
                  Target: <b>48 units Amul Taaza Milk 500ml</b> expiring today at 6:00 PM.
                </p>

                {/* Interactive Slider */}
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span>Discount Percentage</span>
                    <span className="text-[18px] font-black text-rose-600 font-mono">{markdownDiscount}% OFF</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="65"
                    step="5"
                    value={markdownDiscount}
                    onChange={(e) => setMarkdownDiscount(Number(e.target.value))}
                    className="mt-2.5 w-full accent-[#092e22]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
                    <span>15%</span>
                    <span>30%</span>
                    <span>45%</span>
                    <span>60%</span>
                  </div>
                </div>

                {/* Live Calculated Projections */}
                <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">New Shelf Tag Price:</span>
                    <span className="font-extrabold text-slate-900">
                      ₹42 → <span className="text-emerald-700 font-black">₹{Math.round(42 * (1 - markdownDiscount / 100))}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Projected Margin Recovery:</span>
                    <span className="font-black text-emerald-700">
                      ₹{Math.round(2016 * (markdownDiscount > 50 ? 0.45 : 0.6))} of ₹2,016
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Est. Clearance Velocity:</span>
                    <span className="font-bold text-slate-800 font-mono">
                      {markdownDiscount >= 40 ? '2.8 Hours' : '4.5 Hours'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clearance Probability:</span>
                    <span className="font-black text-emerald-700">
                      {markdownDiscount >= 40 ? '94%' : '68%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">App Shoppers Notified:</span>
                    <span className="font-bold text-slate-800">380 within store geofence</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleTriggerAction('markdown')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 py-3.5 text-[12px] font-black text-white shadow-md hover:bg-rose-700 transition-all active:scale-95"
              >
                <Zap className="size-4" /> Trigger {markdownDiscount}% Markdown & ESL Sync
              </button>
            </div>

            {/* 2. Emergency Replenishment Transfer */}
            <div className="flex flex-col justify-between rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                      <Truck className="size-4" />
                    </span>
                    <h3 className="text-[15px] font-black text-slate-900">Inter-Store Transfer Hub</h3>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[9px] font-black text-emerald-700">
                    Stockout Reliever
                  </span>
                </div>

                <p className="mt-2.5 text-[11px] text-slate-600 leading-snug">
                  Target: <b>Harvest Gold White Bread 400g</b> (0 days of cover in {activeStoreRanking.name}).
                </p>

                {/* Hub Selection */}
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span>Source Distribution Hub</span>
                    <span className="text-[11px] font-black text-[#092e22]">Indiranagar Hub</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">Surplus buffer: 2.4 days excess cover</p>

                  <div className="mt-3.5 flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span>Transfer Units</span>
                    <span className="text-[18px] font-black text-[#092e22] font-mono">{transferUnits} Loaves</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="5"
                    value={transferUnits}
                    onChange={(e) => setTransferUnits(Number(e.target.value))}
                    className="mt-2.5 w-full accent-[#092e22]"
                  />
                </div>

                {/* Outputs */}
                <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Courier Transit Time:</span>
                    <span className="font-extrabold text-slate-900 font-mono">~18 Minutes Express</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Margin Loss Recovered:</span>
                    <span className="font-black text-emerald-700">
                      +₹{Math.round(transferUnits * 110)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Availability Restoration:</span>
                    <span className="font-black text-emerald-700">98% customer service level</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Intra-City Transit Cost:</span>
                    <span className="font-bold text-slate-800">₹180 (Express Courier)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleTriggerAction('transfer')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#092e22] py-3.5 text-[12px] font-black text-white shadow-md hover:bg-[#062017] transition-all active:scale-95"
              >
                <Truck className="size-4" /> Authorize {transferUnits}-Unit Courier Dispatch
              </button>
            </div>

            {/* 3. Facility Cold Chain Escalation */}
            <div className="flex flex-col justify-between rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                      <Wrench className="size-4" />
                    </span>
                    <h3 className="text-[15px] font-black text-slate-900">Cold Chain Escalation</h3>
                  </div>
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[9px] font-black text-blue-700">
                    SLA 2-Hour
                  </span>
                </div>

                <p className="mt-2.5 text-[11px] text-slate-600 leading-snug">
                  Target: <b>Chiller 2 Door Seal Breach (+6.2°C)</b> & 146 affected frozen packs.
                </p>

                {/* Dispatch Details */}
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contractor:</span>
                    <span className="font-extrabold text-slate-900">CoolTech HVAC Solutions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Emergency SLA:</span>
                    <span className="font-black text-blue-700 font-mono">2.0 Hours Guaranteed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ticket Identifier:</span>
                    <span className="font-mono font-bold text-slate-800">#FAC-441-EXP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Salvage Split:</span>
                    <span className="font-bold text-emerald-700">120 intact units @ 25% disc</span>
                  </div>
                </div>

                {/* Recovery */}
                <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Asset Loss Prevented:</span>
                    <span className="font-black text-emerald-700">₹3,600 Recovered</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Verification Protocol:</span>
                    <span className="font-bold text-slate-700">Wireless temp sensor log</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleTriggerAction('escalation')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-[12px] font-black text-white shadow-md hover:bg-blue-700 transition-all active:scale-95"
              >
                <Wrench className="size-4" /> Dispatch Technician & Escalate Ticket
              </button>
            </div>
          </div>

          {/* Real-Time Action Audit Log */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-[16px] font-black text-[#092e22]">
                Real-Time Action Trigger Audit Log
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold text-slate-600">
                {executedActions.length} operational actions executed today
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {executedActions.map((act) => (
                <div key={act.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-800 uppercase tracking-wide">
                        {act.type}
                      </span>
                      <h4 className="text-[13px] font-extrabold text-slate-900">{act.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{act.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">{act.details}</p>
                  </div>

                  <span className="self-start sm:self-auto rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-800">
                    ● {act.status} & Synced
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
