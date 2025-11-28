import HomeInfo from "./HomeInfo"
import HomeShoppings from "./HomeShoppings"
import HomeVisits from "./HomeVisits"

export default function HomePage(){
    return (
        <>
          <div className="w-full">
              <HomeInfo/>
              <HomeShoppings />
              <HomeVisits />
          </div>  
        </>
    )
}