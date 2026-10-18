import nextra from 'nextra'

const withNextra = nextra({})
const basePath = process.env.DOCS_BASE_PATH || ''

export default withNextra({
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath }
})
