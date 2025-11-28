"use client"

import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      <Image
        src="/images/vah.png"
        alt="Modern concrete architecture"
        fill
        priority
      />

    </section>
  )
}
