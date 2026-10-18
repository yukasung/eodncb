import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: { default: 'NCB (เครดิตบูโร) Docs', template: '%s · NCB (เครดิตบูโร) Docs' },
  description: 'สรุปบทบาท บสย. การนำส่ง NCB (เครดิตบูโร) ข้อมูล EOD และ EOM พร้อมกฎ ฟิลด์ และการทดสอบ'
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="th" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={<Navbar logoLink="/overview" logo={<span className="x:text-sm x:font-semibold x:tracking-normal x:sm:text-base">NCB (เครดิตบูโร) Docs</span>} />}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/yukasung/eodncb/tree/main"
          search={<Search placeholder="ค้นหาเอกสาร DPD, TDR (การปรับโครงสร้างหนี้), ฟิลด์…" emptyResult="ไม่พบเอกสารที่ตรงกับคำค้น" loading="กำลังค้นหา…" errorText="โหลดดัชนีค้นหาไม่สำเร็จ โปรดลองใหม่" />}
          footer={<Footer>เอกสาร NCB (เครดิตบูโร) · สรุปจากเอกสารในโฟลเดอร์โครงการ · 18 ตุลาคม 2569</Footer>}
          editLink={null}
          feedback={{ content: <span hidden /> }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ title: 'ในหน้านี้', backToTop: 'กลับด้านบน' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
