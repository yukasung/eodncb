export const metadata = {
  title: 'ภาพรวมโครงการ NCB (เครดิตบูโร)',
  robots: { index: false }
}

// A static HTML redirect also works when the exported site is served without Next.js.
export default function HomePage() {
  const overviewUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/overview/`
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${overviewUrl}`} />
      <p>กำลังเปิด <a href={overviewUrl}>ภาพรวมโครงการ NCB (เครดิตบูโร)</a></p>
    </>
  )
}
