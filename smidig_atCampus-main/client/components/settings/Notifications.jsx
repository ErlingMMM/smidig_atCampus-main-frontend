import React from "react"
const Notifications = ({notification}) => {
  return (
    <div className={notificationsDiv}>
      
     <h1 className="border-b-4 border-indigo-200 border-x-indigo-500 text-center text-3xl mb-10">Varslinger</h1>
     
     <p className="text-center font-semibold">Du har ingen varslinger!</p>
     <ul>
       <li>{notification}</li>
       <li>{notification}</li>
       <li>{notification}</li>
       <li>{notification}</li>
       <li>{notification}</li>
     </ul>
    </div>
  )
}
const notificationsDiv = "flex  flex-col mt-10 md:w-3/5 justify-center md:justify-start pt-12 md:pt-0 px-8 md:px-24 lg:px-32 md:pl-12 md:-mb-24"
export default Notifications
