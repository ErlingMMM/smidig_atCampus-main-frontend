import React from 'react'

const Appearance = () => {
  return (
    <div className={appearanceDiv}>
      <p className="border-b-4 border-indigo-200 border-x-indigo-500 text-center text-3xl mb-10">Preferanse</p>
      <a className="underline decoration-red-500" href="https://egghead.io/blog/tailwindcss-dark-mode-nextjs-typography-prose">Endre til dark theme</a>
      <a className="underline decoration-red-500" href="https://egghead.io/blog/tailwindcss-dark-mode-nextjs-typography-prose">Endre til white theme</a>
    </div>
  )
}
const appearanceDiv = "flex text-center text-3xl mb-10 flex-col mt-9 md:w-3/5 justify-center md:justify-start pt-12 md:pt-0 px-8 md:px-24 lg:px-32 md:pl-12 md:-mb-24 "

export default Appearance
