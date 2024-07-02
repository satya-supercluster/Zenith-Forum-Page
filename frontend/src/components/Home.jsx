import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import MiddleSection from './MiddleSection'
const Home = () => {
  return (
    <div className="flex justify-center items-center bg-slate-300">
      <div className="min-[500px]:px-5 max-[500px]:pt-16 pt-24 flex justify-between max-w-[1200px] w-full min-h-screen">
        <div className="flex justify-center lg:w-1/3 max-lg:w-0 max-lg:hidden">
          <LeftSection></LeftSection>
        </div>
        <div className="flex justify-center w-[60%] max-[500px]:w-full">
          <MiddleSection></MiddleSection>
        </div>
        <div className="flex max-lg:fixed max-lg:right-5 justify-center min-[500px]:w-[30%] max-[500px]:hidden">
          <RightSection></RightSection>
        </div>
      </div>
    </div>
  );
}

export default Home