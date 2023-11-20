import React from "react"
const Job = ({jobs}) => {
  return (
    <div className={jobDiv}>
     <h1 className="border-b-4 border-indigo-200 border-x-indigo-500 text-center text-3xl mb-10">Ledige stillinger:</h1>
     <p>Det er ingen ledige stillinger på atcampus akkurat nå!</p>
     <ul>
       <li>{jobs}</li>
       <li>{jobs}</li>
       <li>{jobs}</li>
       <li>{jobs}</li>
       <li>{jobs}</li>
     </ul>
    </div>
  )
}
const jobDiv = "flex flex-col mt-10 md:w-3/5 justify-center md:justify-start pt-12 md:pt-0 px-8 md:px-24 lg:px-32 md:pl-12 md:-mb-24"

export default Job
