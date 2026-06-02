import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import isoTimeFormat from '../lib/isoTimeFormat'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {
  const navigate = useNavigate()
  let { id, showId } = useParams()
  const [searchParams] = useSearchParams()
  const time = isoTimeFormat(searchParams.get('time') )
  const showDate = new Date(searchParams.get('time'));
  const date=showDate.toLocaleDateString();
   const{axios,getToken,user}=useAppContext();
  const [selectedSeats, setSelectedSeats] = useState([])
const [occupiedSeats, setOccupiedSeats] = useState([]);
const datePart = showDate.toLocaleDateString();
// const getShow=async()=>{
//  try{
//    const {data}=await axios.get(`/api/show/${id}`)
//    if(data.success){
    
//   }
//  }
//  catch(error){
//   console.error(error)
//  }
// }
 const groupRows = [
  ['A', 'B'],
  ['C', 'D'],
  ['E', 'F'],
  ['G', 'H'],
  ['I', 'J'],
]

  const seatsPerRow = 9

  const dummyBookedSeats = {
    '1-2026-05-16-10:15 AM': ['A2', 'A5', 'B3', 'D4', 'F8'],
    '1-2026-05-16-7:15 PM':  ['A1', 'A6', 'B7', 'D3', 'D4', 'H8', 'I5'],
    '2-2026-05-17-1:00 PM':  ['C4', 'C5', 'E7', 'J2'],
  }

  const showKey = `${id}-${date}-${time}`
const getOccupiedSeats = async () => {
  try {
    const { data } = await axios.get(
      `/api/booking/seats/${showId}`
    );

    if (data.success) {
      setOccupiedSeats(
        Object.keys(data.occupiedSeats || {})
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  if (showId) {
    getOccupiedSeats();
  }
}, [showId]);
  const handleSeatClick = (seatId) => {
    if (!time) return toast.error('Please select a time first')
    if (occupiedSeats.includes(seatId)) return toast.error('Seat already booked')
    const isSelected = selectedSeats.includes(seatId)
    if (!isSelected && selectedSeats.length >= 5) return toast.error('Maximum 5 seats allowed')
    setSelectedSeats(prev =>
      isSelected ? prev.filter(s => s !== seatId) : [...prev, seatId]
    )
  }

  const proceedCheckout = () => {
    if (!time) return toast.error('Please select a time')
    if (!selectedSeats.length) return toast.error('Please select seats')
    toast.success('Seats selected successfully')
    navigate('/checkout')
  }

  const renderRow = (row, count = 9) => {
    const aisleAfter = Math.floor(count / 2) - 1 // gap after seat 4

    return (
      <div key={row} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>

        {/* Row label */}
        <span style={{
          width: 18, fontSize: 12, fontWeight: 700,
          color: '#6b7280', textAlign: 'center',
          fontFamily: 'monospace', flexShrink: 0,
          letterSpacing: '0.05em',
        }}>
          {row}
        </span>

        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          const isSelected = selectedSeats.includes(seatId)
          const isOccupied = occupiedSeats.includes(seatId)

          return (
            <React.Fragment key={seatId}>
              {/* Centre aisle */}
              {i === aisleAfter + 1 && (
                <div style={{ width: 16, flexShrink: 0 }} />
              )}

              <button
                onClick={() => handleSeatClick(seatId)}
                disabled={isOccupied}
                title={isOccupied ? `${seatId} — Booked` : `${seatId}`}
                style={{
                  width: 36, height: 36,
                  borderRadius: 8,
                  border: isSelected
                    ? '1.5px solid #22c55e'
                    : isOccupied
                    ? '1.5px solid #7f1d1d'
                    : '1.5px solid #dc2626',
                  background: isSelected
                    ? 'linear-gradient(145deg, #16a34a, #15803d)'
                    : isOccupied
                    ? 'rgba(127,29,29,0.55)'
                    : 'rgba(220,38,38,0.07)',
                  color: isSelected
                    ? '#ffffff'
                    : isOccupied
                    ? '#6b7280'
                    : '#fca5a5',
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  cursor: isOccupied ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  boxShadow: isSelected
                    ? '0 0 10px rgba(34,197,94,0.4)'
                    : isOccupied
                    ? 'none'
                    : 'none',
                  opacity: isOccupied ? 0.55 : 1,
                }}
                onMouseEnter={e => {
                  if (!isOccupied && !isSelected) {
                    e.currentTarget.style.background = 'rgba(220,38,38,0.22)'
                    e.currentTarget.style.borderColor = '#ef4444'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(220,38,38,0.3)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isOccupied && !isSelected) {
                    e.currentTarget.style.background = 'rgba(220,38,38,0.07)'
                    e.currentTarget.style.borderColor = '#dc2626'
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {seatId}
              </button>
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #080000 0%, #0f0000 60%, #080000 100%)',
      color: 'white',
      padding: '80px 40px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{ display: 'flex', flexDirection: 'row',  maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap' }}>
        <div style={{
          width: 252, flexShrink: 0,
          background: 'linear-gradient(145deg, rgba(185,28,28,0.09) 0%, rgba(0,0,0,0.45) 100%)',
          
          borderRadius: 24, padding: 26,
          position: 'sticky', top: 112, height: 'fit-content',
          boxShadow: '0 0 40px rgba(185,28,28,0.09), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 22, color: '#fecaca', letterSpacing: '-0.02em' }}>
            Show Details
          </h2>

          {[{ label: 'Movie ID', value: id || '—' }, { label: 'Date', value: date || '—' }].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 12, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{value}</p>
            </div>
          ))}

          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 12, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Time</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'linear-gradient(135deg, #b91c1c, #7f1d1d)',
              padding: '9px 14px', borderRadius: 11,
              fontSize: 14, fontWeight: 600,
              boxShadow: '0 4px 18px rgba(185,28,28,0.45)',
            }}>
              <Clock size={13} />
              {time || '—'}
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <p style={{ fontSize: 12, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Selected Seats</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {selectedSeats.length > 0
                ? selectedSeats.map(s => (
                  <span key={s} style={{
                    background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.4)',
                    color: '#4ade80', padding: '2px 9px', borderRadius: 7,
                    fontSize: 13, fontWeight: 700, fontFamily: 'monospace',
                  }}>{s}</span>
                ))
                : <span style={{ color: '#4b5563', fontSize: 14 }}>None selected</span>
              }
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(185,28,28,0.18)', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { color: 'rgba(127,29,29,0.55)', border: '#7f1d1d', label: 'Booked' },
              { color: 'rgba(220,38,38,0.07)', border: '#dc2626', label: 'Available' },
              { color: 'linear-gradient(145deg,#16a34a,#15803d)', border: '#22c55e', label: 'Selected' },
            ].map(({ color, border, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, background: color, border: `1.5px solid ${border}`, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#9ca3af' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Theatre ───────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.03em' }}>
            Select Your Seat
          </h1>
          <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 36 }}>Max 5 seats · Click to select</p>

          {/* Screen */}
          <div style={{ width: '100%', maxWidth: 560, marginBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '90%', height: 5,
              background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.7), #dc2626, rgba(239,68,68,0.7), transparent)',
              borderRadius: 100,
              boxShadow: '0 0 32px rgba(239,68,68,0.65), 0 0 70px rgba(185,28,28,0.35)',
            }} />
            <div style={{
              width: '75%', height: 20,
              background: 'linear-gradient(180deg, rgba(220,38,38,0.18) 0%, transparent 100%)',
              borderRadius: '0 0 80px 80px',
            }} />
            <p style={{ fontSize: 11, letterSpacing: '0.45em', color: '#4b5563', fontWeight: 700, marginTop: 8, textTransform: 'uppercase' }}>
              SCREEN THIS WAY
            </p>
          </div>

          {/* Seat grid */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

            {groupRows.map((group, gi) => {
              // Section label per pair
              const sectionLabels = ['A–B', 'C–D', 'E–F', 'G–H', 'I–J']
              const sectionColors = ['#ef4444', '#dc2626', '#c0392b', '#b91c1c', '#991b1b']

              return (
                <div key={gi} style={{
                  background: 'rgba(255,255,255,0.018)',
                  border: `1px solid rgba(${gi === 0 ? '239,68,68' : '185,28,28'},0.2)`,
                  borderRadius: 16,
                  padding: '14px 18px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  maxWidth: 520,
                  position: 'relative',
                  boxShadow: gi === 0 ? '0 0 20px rgba(239,68,68,0.06)' : 'none',
                }}>
                  {/* Row group label */}
                  <span style={{
                    position: 'absolute',
                    top: -9,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#080000',
                    padding: '0 10px',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.3em',
                    color: sectionColors[gi],
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    ROWS {sectionLabels[gi]}
                  </span>

                  {group.map(row => renderRow(row, seatsPerRow))}
                </div>
              )
            })}
          </div>

          {/* Checkout */}
          <button
            onClick={proceedCheckout}
            style={{
              marginTop: 44,
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 38px', borderRadius: 100,
              background: selectedSeats.length > 0
                ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
                : 'rgba(255,255,255,0.05)',
              border: selectedSeats.length > 0
                ? '1px solid rgba(239,68,68,0.5)'
                : '1px solid rgba(255,255,255,0.08)',
              color: selectedSeats.length > 0 ? '#ffffff' : '#6b7280',
              fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedSeats.length > 0 ? '0 8px 28px rgba(220,38,38,0.4)' : 'none',
            }}
            onMouseEnter={e => {
              if (selectedSeats.length > 0) {
                e.currentTarget.style.transform = 'scale(1.04)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(220,38,38,0.55)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = selectedSeats.length > 0 ? '0 8px 28px rgba(220,38,38,0.4)' : 'none'
            }}
          >
            {selectedSeats.length > 0
              ? `Continue with ${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''}`
              : 'Select seats to continue'
            }
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatLayout