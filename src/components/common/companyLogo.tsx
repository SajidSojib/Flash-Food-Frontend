import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo.png"
import Link from 'next/link';

export default function CompanyLogo({classNames}: {classNames?: string}) {
  return (
    <Link href="/">
      <div className="flex cusor-pointer relative items-center">
        <div>
          <Image priority src={logo} className="w-14" alt="Company Logo" />
        </div>
        <p className={`text-2xl -m-3 font-bold ${classNames}`}>
          <span>Flash</span>
          <span className="text-primary">Food</span>
        </p>
      </div>
    </Link>
  );
}
