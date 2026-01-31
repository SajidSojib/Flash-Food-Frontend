import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo.png"

export default function CompanyLogo() {
  return (
    <div className="flex relative items-center gap-2">
      <div>
        <Image priority src={logo} className='w-10' alt="Company Logo" />
      </div>
      <p className='text-2xl font-bold'>
        <span>Flash</span>
        <span className="text-primary">Food</span>
      </p>
    </div>
  );
}
