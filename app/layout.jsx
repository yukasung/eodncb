import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: { default: 'NCB Project Docs', template: '%s · NCB Project Docs' },
  description: 'สรุปข้อกำหนด การเชื่อมโยงข้อมูล EOD EOM DWH และการนำส่ง NCB ของ บสย.'
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="th" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 173, saturation: 70 }} />
      <body>
        <Layout
          navbar={<Navbar logo={<span className="brand"><span className="brand-mark">N</span><strong>NCB <span className="brand-sub">Project Docs</span></strong></span>} projectLink="https://github.com/yukasung/eodncb" />}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/yukasung/eodncb/tree/main"
          search={<Search placeholder="ค้นหาเอกสาร DPD, TDR, ฟิลด์…" emptyResult="ไม่พบเอกสารที่ตรงกับคำค้น" loading="กำลังค้นหา…" errorText="โหลดดัชนีค้นหาไม่สำเร็จ โปรดลองใหม่" />}
          footer={<Footer>NCB Project Documentation · สรุปจากเอกสารในโฟลเดอร์โครงการ · 18 ตุลาคม 2569</Footer>}
          editLink="แก้ไขหน้านี้บน GitHub"
          feedback={{ content: 'แจ้งข้อแก้ไขเอกสาร', labels: 'documentation' }}
          toc={{ title: 'ในหน้านี้', backToTop: 'กลับด้านบน' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
