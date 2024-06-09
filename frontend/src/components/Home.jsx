import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import MiddleSection from './MiddleSection'
const Home = () => {
  return (
    <div className=" lg:px-32 px-5 pt-24 flex w-full min-h-screen bg-slate-300">
      <div className="flex min-[500px]:w-1/3 max-sm:hidden">
        <LeftSection></LeftSection>
      </div>
      <div className="flex w-2/3 max-[500px]:w-full">
        <MiddleSection></MiddleSection>
      </div>
      <div className="flex min-[500px]:w-1/3 max-[500px]:hidden">
        <RightSection></RightSection>
      </div>
    </div>
  );
}

export default Home