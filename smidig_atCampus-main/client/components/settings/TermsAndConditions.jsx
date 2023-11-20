import React from "react"
const TermsAndConditions = () => {
  return (
    <>
      <div className={termsAndConditionsDiv}>
       <h1 className="border-b-4 border-indigo-200 border-x-indigo-500 text-center text-3xl mb-10">VILKÅR OG BETINGELSER</h1>
        <h3 className="font-semibold italic mb-6">Alt du trenger å vite, alt på ett sted:</h3>
        <h4 className="font-semibold underline mb-2" >Informasjon vi mottar og hvordan den brukes:</h4>
        <p className="mb-2">Å tilby en trygg og åpen tjeneste for et bredt fellesskap krever at vi alle gjør vår del.</p>
        <div className=" mt-2 mb-4 border-b-2 border-black-200 border-x-black-500"></div>
        <h5 className="font-semibold mb-2">Personopplysninger</h5>
        <p className="mb-2">Det er ikke akseptabelt å utgi seg for å være andre, eller gi unøyaktig informasjon.
        Registreringsinformasjonen bør være legitimt.</p>
        <div className=" mt-2 mb-4 border-b-2 border-black-200 border-x-black-500"></div>
        <h5 className="font-semibold mb-2">Data håndtering:</h5>
        <p>Vi samler inn brukeropplysninger, kommunikasjon og annen informasjon du oppgir når du bruker atCampus sine tjenester, som for eks. konto-opplysninger, matching-data, aktivitet, filer og  meldinger. Finn ut mer om hvordan du kan kontrollere hvem som kan se tingene du deler<a className="underline font-bold italic" href="https://www.datatilsynet.no/regelverk-og-verktoy/lover-og-regler/"> her</a>.</p>          
        <div className=" mt-2 mb-4 border-b-2 border-black-200 border-x-black-500"></div>
        <h5 className=" font-semibold mb-2">Diskriminering:</h5>
        <p className="mb-20">Aktivitet/innlegg må ikke diskriminere brukere basert på rase, etnisitet, farge,
            nasjonal opprinnelse, religion, alder, kjønn, seksuell legning, kjønnsidentitet,
            familiestatus, funksjonshemming, medisinsk eller genetisk tilstand eller andre grunner
            beskyttet under statlig grunnlov. Aktivitet på atCampus må samsvare med alle
            gjeldende lover som forbyr diskriminering.</p>
            
    </div>
    </>
    
  )
};
const termsAndConditionsDiv = "flex flex-col mt-10 md:w-3/5 justify-center md:justify-start pt-12 md:pt-0 px-8 md:px-24 lg:px-32 md:pl-12 md:-mb-24"
export default TermsAndConditions
