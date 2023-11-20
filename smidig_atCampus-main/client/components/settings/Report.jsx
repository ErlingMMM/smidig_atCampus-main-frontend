import React from "react"
const Report = () => {
  return (
    <div className={reportDiv}>
     <h1 className="border-b-4 border-indigo-200 border-x-indigo-500 text-center text-3xl mb-10">Rapportere noe?</h1>
     <div className="text-center pt-12 pb-12">
        <p>Ved rapportering vennligst: <a href="/" className="underline font-semibold">Kontakt oss her.</a></p>
      </div>
    </div>
  )
}
const reportDiv = "flex flex-col mt-10 md:w-3/5 justify-center md:justify-start pt-12 md:pt-0 px-8 md:px-24 lg:px-32 md:pl-12 md:-mb-24"

export default Report
