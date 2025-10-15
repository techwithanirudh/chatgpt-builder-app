import type { NextConfig } from 'next'
import { baseURL } from '@/lib/constants'

const nextConfig: NextConfig = {
  assetPrefix: baseURL,
}

export default nextConfig
