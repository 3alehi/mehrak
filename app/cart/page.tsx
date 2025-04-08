import React from 'react'
import Index from './Index'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'سبد خرید',
  description: '...',
}
export default function page() {
  return (
    <Index/>
  )
}
