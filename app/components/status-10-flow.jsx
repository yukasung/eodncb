const checks = [
  ['Claim Pay Date == NULL?'],
  ['Grade Status อยู่ใน A–E2?'],
  ['DFD Date == NULL?'],
  ['DPD < 30?', 'Code ตามต้นฉบับ', '000 / 1160001'],
  ['TDR Date == NULL?', 'TDR Code = 00'],
  ['Last Payment Date == NULL?'],
  ['Account Close Date == NULL?']
]

// Fixed columns keep the seven AND checks aligned on every screen size.
export default function Status10Flow() {
  const arrow = { stroke: '#2563eb', strokeWidth: 2, fill: 'none', markerEnd: 'url(#status10-arrow)' }
  return (
    <div>
      <svg viewBox="0 0 760 1660" width="760" role="graphics-document document" aria-roledescription="flowchart" aria-labelledby="status10-title status10-desc">
        <title id="status10-title">ตรวจครบ 7 เงื่อนไขของสถานะ 10 กรณีภาระค้ำ A–E2</title>
        <desc id="status10-desc">ตรวจจากบนลงล่าง ต้องผ่านทุกข้อ หากข้อใดไม่ผ่านให้พิจารณากรณีอื่น ไม่กำหนดสถานะอื่นโดยอัตโนมัติ</desc>
        <defs>
          <marker id="status10-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
          </marker>
        </defs>
        <g fontFamily="inherit" fontSize="18" textAnchor="middle">
          <rect x="130" y="18" width="260" height="54" rx="27" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="260" y="51" fill="#172554">เริ่มตรวจกรณีภาระค้ำ</text>
          <path d="M260 72 V95" {...arrow} />
          {checks.map((lines, i) => {
            const y = 160 + i * 190
            return (
              <g key={i}>
                <g className="check">
                  <path d={`M260 ${y - 65} L430 ${y} L260 ${y + 65} L90 ${y} Z`} fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="260" cy={y - 40} r="14" fill="#1d4ed8" />
                  <text x="260" y={y - 34} fontSize="17" fill="white">{i + 1}</text>
                  {lines.map((line, j) => <text key={j} x="260" y={y - 5 + j * 22} fill="#172554">{line}</text>)}
                </g>
                <path d={`M430 ${y} H500`} {...arrow} />
                <text x="465" y={y - 12} fill="#dc2626" fontSize="17">ไม่ใช่</text>
                <g className="reject">
                  <rect x="500" y={y - 36} width="230" height="72" rx="9" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
                  <text x="615" y={y - 5} fill="#7f1d1d">ไม่เข้าเงื่อนไขกรณีนี้</text>
                  <text x="615" y={y + 20} fill="#7f1d1d">พิจารณากรณีอื่น</text>
                </g>
                <path d={`M260 ${y + 65} V${i === 6 ? 1430 : y + 125}`} {...arrow} />
                <text x="280" y={y + 101} fill="#16a34a" fontSize="17">ใช่</text>
              </g>
            )
          })}
          <g className="pass">
            <rect x="70" y="1430" width="380" height="84" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="260" y="1464" fill="#14532d" fontWeight="600">ผ่านครบ 7 ข้อ</text>
            <text x="260" y="1492" fill="#14532d">กำหนดสถานะบัญชี 10 · ปกติ</text>
          </g>
          <path d="M260 1514 V1560" {...arrow} />
          <rect x="120" y="1560" width="280" height="54" rx="27" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="260" y="1593" fill="#172554">สิ้นสุดการตรวจกรณีนี้</text>
        </g>
      </svg>
    </div>
  )
}
