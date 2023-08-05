import { Suspense } from "react";
import dynamic from "next/dynamic";

const DynamicChildComponent = dynamic(()=>import('../card/page'),{
    loading:()=><div className="spinner"></div>,
    ssr:false
})

function CardSectionLayout({children,params}){
    return(
        <section className="container">
            <h1>Posts Page</h1>
            <Suspense fallback={<div className="spinner"></div>}>   
                {/* <DynamicChildComponent /> */}
                {children}
            </Suspense>
        </section>
    )
}

export default CardSectionLayout;