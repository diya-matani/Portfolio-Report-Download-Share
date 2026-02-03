import { useState, useMemo, useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Download, CheckCircle, Shield, Clock, Target, Loader2 } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    investableAssets: '',
    riskTolerance: 'Balanced',
    investmentHorizon: '',
    primaryGoal: ''
  })
  const [isGenerated, setIsGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Ref for the hidden print container
  const printRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setIsGenerated(false)
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
  }

  // --- Real-time Calculations ---
  const projectionData = useMemo(() => {
    const principal = parseFloat(formData.investableAssets) || 0
    const years = parseInt(formData.investmentHorizon) || 10
    const data = []
    let rate = 0.04
    if (formData.riskTolerance === 'Balanced') rate = 0.07
    if (formData.riskTolerance === 'Aggressive') rate = 0.10

    for (let i = 0; i <= years; i++) {
      data.push({
        year: `Year ${i}`,
        amount: Math.round(principal * Math.pow((1 + rate), i))
      })
    }
    return data
  }, [formData.investableAssets, formData.investmentHorizon, formData.riskTolerance])

  const allocationData = useMemo(() => {
    const risk = formData.riskTolerance
    if (risk === 'Conservative') return [{ name: 'Equity', value: 20 }, { name: 'Fixed Income', value: 70 }, { name: 'Cash', value: 10 }]
    if (risk === 'Balanced') return [{ name: 'Equity', value: 60 }, { name: 'Fixed Income', value: 35 }, { name: 'Cash', value: 5 }]
    return [{ name: 'Equity', value: 80 }, { name: 'Alts', value: 15 }, { name: 'Cash', value: 5 }]
  }, [formData.riskTolerance])

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#6366f1'];

  // --- PDF Generation Engine ---
  const generateReport = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.investableAssets) return;

    setIsGenerating(true)

    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 500))

    const doc = new jsPDF('p', 'mm', 'a4')
    const pages = printRef.current.querySelectorAll('.print-page')

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      // Capture High-Res Canvas
      const canvas = await html2canvas(page, {
        scale: 2, // Retina-like quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      if (i > 0) doc.addPage()
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    }

    doc.save(`WealthReport_${formData.name.replace(/\s/g, '')}.pdf`)
    setIsGenerating(false)
    setIsGenerated(true)
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Wealth OS <span style={{ color: 'var(--secondary)', fontSize: '0.5em' }}>BETA</span></h1>
        <p className="subtitle">Institutional-grade wealth planning engine.</p>
      </div>

      <div className="dashboard-grid">
        {/* LEFT PANEL: INPUTS */}
        <div className="card input-panel">
          <form onSubmit={generateReport}>
            <div className="section-title">Client Profile</div>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Assets ($)</label>
                <input type="number" name="investableAssets" value={formData.investableAssets} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Horizon (Yrs)</label>
                <input type="number" name="investmentHorizon" value={formData.investmentHorizon} onChange={handleChange} />
              </div>
            </div>
            <div className="section-title">Strategy</div>
            <div className="form-group">
              <label>Risk Tolerance</label>
              <div style={{ position: 'relative' }}>
                <Shield className="icon" style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8', width: '16px' }} />
                <select name="riskTolerance" value={formData.riskTolerance} onChange={handleChange} style={{ paddingLeft: '35px' }}>
                  <option value="Conservative">Conservative</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Goal</label>
              <div style={{ position: 'relative' }}>
                <Target className="icon" style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8', width: '16px' }} />
                <input type="text" name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} style={{ paddingLeft: '35px' }} />
              </div>
            </div>

            <button type="submit" className="btn" disabled={isGenerating}>
              {isGenerating ? <Loader2 className="icon animate-spin" /> : <Download className="icon" />}
              {isGenerating ? 'Rendering Report...' : 'Download Investment Dossier'}
            </button>
            {isGenerated && <div className="success-msg">Dossier Downloaded Successfully.</div>}
          </form>
        </div>

        {/* RIGHT PANEL: LIVE DASHBOARD */}
        <div className="card display-panel">
          <div className="section-title">Live Projections</div>
          <div className="metric-card">
            <div className="metric">
              <div className="metric-label">Current Assets</div>
              <div className="metric-val">{formatCurrency(formData.investableAssets)}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Projected ({formData.investmentHorizon}y)</div>
              <div className="metric-val" style={{ color: 'var(--secondary)' }}>
                {formatCurrency(projectionData[projectionData.length - 1]?.amount)}
              </div>
            </div>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <div className="metric-label" style={{ marginBottom: '10px' }}>Wealth Growth Curve</div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="year" hide />
                <YAxis hide domain={['dataMin', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#0ea5e9' }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="amount" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- HIDDEN PRINT TEMPLATE --- */}
      {/* This renders OFF-SCREEN but with specific 210mm width for PDF capture */}
      <div className="print-container" ref={printRef} style={{ position: 'fixed', top: 0, left: '-300mm' }}>

        {/* PAGE 1: COVER */}
        <div className="print-page page-cover">
          <div className="cover-logo">WEALTH OS</div>
          <div className="cover-title">PRIVATE CLIENT SERVICES</div>
          <div style={{ marginTop: '50mm' }}>
            <div className="cover-label">PREPARED FOR</div>
            <div className="cover-client">{formData.name}</div>
            <div className="cover-date">{new Date().toLocaleDateString()}</div>
          </div>
          <div style={{ marginTop: 'auto', marginBottom: '20mm', fontSize: '0.8rem', opacity: 0.6 }}>
            CONFIDENTIAL - INVESTMENT PROPOSAL
          </div>
        </div>

        {/* PAGE 2: ANALYTICS */}
        <div className="print-page">
          <div className="page-content">
            <div className="print-header">
              <div>
                <div className="print-h1">Strategic Analysis</div>
                <div className="print-sub">{formData.primaryGoal}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold' }}>{formData.riskTolerance} Profile</div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{formData.investmentHorizon} Year Horizon</div>
              </div>
            </div>

            {/* NEW: Investor Profile Section */}
            <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div className="print-label" style={{ marginBottom: '0.5rem' }}>Investor Profile</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Name</span>
                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{formData.name}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Demographics</span>
                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{formData.age} Years • {formData.gender}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Date Generated</span>
                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="print-grid">
              <div className="print-card">
                <div className="print-label">Starting Capital</div>
                <div className="print-val">{formatCurrency(formData.investableAssets)}</div>
              </div>
              <div className="print-card">
                <div className="print-label">Projected Outcome</div>
                <div className="print-val" style={{ color: '#059669' }}>
                  {formatCurrency(projectionData[projectionData.length - 1]?.amount)}
                </div>
              </div>
            </div>

            <div className="print-label" style={{ marginTop: '1rem' }}>Growth Trajectory</div>
            <div className="print-chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} minTickGap={30} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Area type="monotone" dataKey="amount" stroke="#0f172a" fill="#e2e8f0" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="print-label">Target Allocation</div>
            <div className="print-chart-box" style={{ height: '200px', display: 'flex' }}>
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie data={allocationData} innerRadius={40} outerRadius={60} dataKey="value">
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="middle" layout="vertical" align="right" wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ width: '50%', paddingLeft: '20px', fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center' }}>
                Model portfolio designed for {formData.riskTolerance.toLowerCase()} growth, prioritizing
                {formData.riskTolerance === 'Conservative' ? ' capital preservation' : ' long-term appreciation'} through diverse asset classes.
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 3: DISCLAIMERS */}
        <div className="print-page">
          <div className="page-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="print-header">
              <div className="print-h1">Important Disclosures</div>
            </div>
            <div style={{ color: '#334155', lineHeight: 1.6, fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>General Disclaimer:</strong> This report is for informational purposes only and does not constitute an offer to sell, a solicitation to buy, or a recommendation for any security, nor does it constitute an offer to provide investment advisory or other services by Wealth OS or any of its affiliates.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Projections:</strong> The financial projections herein are hypothetical and based on simulated models (Conservative 4%, Balanced 7%, Aggressive 10%). They do not represent actual market performance and are not guarantees of future results. Actual returns may vary significantly.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Risk:</strong> Investing involves risk, including the possible loss of principal. Past performance is not indicative of future results.
              </p>
            </div>

            <div className="legal-text">
              Generated by Wealth OS Client Onboarding Engine v1.0<br />
              {new Date().toISOString()}<br />
              San Francisco, CA
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
