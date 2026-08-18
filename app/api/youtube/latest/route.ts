import { NextResponse } from 'next/server'
import { getLatestChannelVideo } from '@/lib/youtube'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const video = await getLatestChannelVideo()
  return NextResponse.json({ ok: Boolean(video), video }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
