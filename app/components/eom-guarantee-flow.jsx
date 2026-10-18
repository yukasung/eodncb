const common = [
  { lines: ['Claim Pay Date == NULL?'] },
  { lines: ['Grade Status อยู่ใน A–E2?'] }
]

const cases = {
  normal: {
    title: '1.1 สถานะปกติ 10 · ตรวจทีละข้อครบ 7 ข้อ',
    steps: [
      ...common,
      { lines: ['DFD Date == NULL?'] },
      { lines: ['DPD < 30?', 'DPD Code 000 / 1160001'] },
      { lines: ['TDR Date == NULL?', 'TDR Code 00'] },
      { lines: ['Last Payment Date == NULL?'] },
      { lines: ['Account Close Date == NULL?'] }
    ],
    result: ['ผ่านครบ 7 ข้อ', 'สถานะบัญชี 10 · ปกติ']
  },
  closed: {
    title: '1.2 ยกเลิก LG (หนังสือค้ำประกัน) สถานะ 500 · ตรวจทีละข้อครบ 8 ข้อ',
    steps: [
      ...common,
      { lines: ['StatusLG == 500?', 'สถานะ LG (หนังสือค้ำประกัน)'] },
      { lines: ['DFD Date == NULL?'] },
      { lines: ['DPD == 0?', 'DPD Code 000 / 1160001'] },
      { lines: ['TDR Date == NULL?', 'TDR Code 00'] },
      { lines: ['Last Payment Date == NULL?'] },
      { lines: ['Account Close Date != NULL?'] }
    ],
    result: ['ผ่านครบ 8 ข้อ · สถานะบัญชี 11', 'ยกเลิก LG (หนังสือค้ำประกัน) สถานะ 500']
  },
  bankruptcy: {
    title: '1.3 ปลดล้มละลายเกิน 2 ปี · ครบทั้ง 8 รายการในข้อความ',
    steps: [
      ...common,
      { lines: ['DFD Date == NULL?'] },
      { lines: ['TDR Date == NULL?', 'TDR Code 00'] },
      { kind: 'prepare', lines: ['Last Payment Date', 'มีค่า: ใช้วันที่จริง', 'ไม่มีค่า: ใช้ 1900-01-01', 'เตรียมค่าแล้วตรวจต่อ'] },
      { lines: ['Bankruptcy Date != NULL?', 'วันปลดล้มละลายตามต้นฉบับ'] },
      { lines: ['งวดรายงานเกิน 2 ปี', 'จาก Bankruptcy Date?', 'วิธีนับตาม Q13'] },
      { kind: 'review', lines: ['Account Close Date != NULL', 'แต่ข้อความระบุ “ไม่มีวันปิดบัญชี”', 'ยืนยันเงื่อนไขข้อ 8 ตาม Q06'] }
    ],
    result: ['เมื่อผ่านเงื่อนไขที่ยืนยันแล้วครบทุกข้อ', 'หยุดส่ง NCB (เครดิตบูโร)']
  }
}

// Fixed columns keep one source item per row without horizontal scrolling.
export default function EomGuaranteeFlow({ variant }) {
  const config = cases[variant]
  const prefix = `eom-${variant}`
  const resultY = 160 + (config.steps.length - 1) * 200 + 120
  const arrow = { stroke: '#2563eb', strokeWidth: 2, fill: 'none', markerEnd: `url(#${prefix}-arrow)` }
  return (
    <div>
      <svg viewBox={`0 0 760 ${resultY + 220}`} width="760" role="img" aria-roledescription="flowchart" aria-labelledby={`${prefix}-title ${prefix}-desc`}>
        <title id={`${prefix}-title`}>{config.title}</title>
        <desc id={`${prefix}-desc`}>อ่านจากบนลงล่างทีละข้อ หากเงื่อนไขไม่ผ่านให้พิจารณากรณีอื่น การเตรียมวันที่ชำระล่าสุดไม่ใช่เกณฑ์คัดออก ข้อความที่ขัดกันต้องยืนยันก่อนสรุปผล</desc>
        <defs>
          <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#2563eb" />
          </marker>
        </defs>
        <g fontFamily="inherit" fontSize="18" textAnchor="middle">
          <rect x="110" y="16" width="300" height="54" rx="27" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="260" y="50" fill="#172554">เริ่มตรวจตาม S05 · EOM</text>
          <path d="M260 70 V90" {...arrow} />
          {config.steps.map((step, i) => {
            const y = 160 + i * 200
            const isAction = Boolean(step.kind)
            const review = step.kind === 'review'
            const color = review ? '#b45309' : '#2563eb'
            const fill = review ? '#fef3c7' : '#dbeafe'
            const textColor = review ? '#78350f' : '#172554'
            const nextY = i === config.steps.length - 1 ? resultY : y + 130
            return (
              <g key={i} data-step={i + 1} data-kind={step.kind || 'check'}>
                {isAction
                  ? <rect x="80" y={y - 70} width="360" height="140" rx="10" fill={fill} stroke={color} strokeWidth="2" />
                  : <path d={`M260 ${y - 70} L440 ${y} L260 ${y + 70} L80 ${y} Z`} fill={fill} stroke={color} strokeWidth="2" />}
                <circle cx="260" cy={y - 47} r="14" fill={color} />
                <text x="260" y={y - 41} fill="white" fontSize="17">{i + 1}</text>
                {step.lines.map((line, j) => <text key={j} x="260" y={y - 9 + j * 22} fill={textColor}>{line}</text>)}
                {step.kind !== 'prepare' && <>
                  <path d={`M440 ${y} H500`} {...arrow} />
                  <text x="470" y={y - 14} fill={review ? '#b45309' : '#dc2626'} fontSize="15">{review ? 'รอยืนยัน' : 'ไม่ใช่'}</text>
                  <g data-outcome={review ? 'pending' : 'reject'}>
                    <rect x="500" y={y - 38} width="230" height="76" rx="9" fill={review ? '#fef3c7' : '#fee2e2'} stroke={review ? '#b45309' : '#dc2626'} strokeWidth="2" />
                    <text x="615" y={y - 6} fill={review ? '#78350f' : '#7f1d1d'}>{review ? 'ยังไม่สรุปหยุดส่ง' : 'ไม่เข้าเงื่อนไขกรณีนี้'}</text>
                    <text x="615" y={y + 20} fill={review ? '#78350f' : '#7f1d1d'}>{review ? 'จนกว่าจะยืนยัน Q06' : 'พิจารณากรณีอื่น'}</text>
                  </g>
                </>}
                <path d={`M260 ${y + 70} V${nextY}`} {...arrow} />
                <text x={review ? '340' : '292'} y={y + 103} fill="#15803d" fontSize="16">{review ? 'ยืนยันและผ่าน' : isAction ? 'ต่อ' : 'ใช่'}</text>
              </g>
            )
          })}
          <rect x="40" y={resultY} width="440" height="82" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          {config.result.map((line, i) => <text key={i} x="260" y={resultY + 32 + i * 26} fill="#14532d">{line}</text>)}
          <path d={`M260 ${resultY + 82} V${resultY + 130}`} {...arrow} />
          <rect x="120" y={resultY + 130} width="280" height="54" rx="27" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="260" y={resultY + 164} fill="#172554">สิ้นสุดการตรวจกรณีนี้</text>
        </g>
      </svg>
    </div>
  )
}
