import Image from "next/image";
// import window from './favicon.ico';
// import herobg from "../../public/videos/hero.mp4"

const Home = () => {
  return (
    //   <main className="min-h-screen flex flex-col justify-center items-center bg-gray-950">
    //     1st
    //     <div className="bg-white flex flex-col p-10 rounded-xl shadow-lg">
    //       <h1 className="text-4x1 font-bold text-blue-600">
    //         Welcome To Tailwind
    //       </h1>
    //       <p className="mt-4 text-gray-600">
    //         My First Tailwind Page
    //       </p>
    //       <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
    //         Click Me
    //       </button>
    //     </div>
    //     <br />
    //     2nd
    //     <div className="bg-white flex flex-col items-center rounded-lg shadow-lg p-10">
    //       <h1 className="text-green-600">
    //         My Tailwind Journey
    //       </h1>
    //       <p className="text-gray-600">
    //         I'm Learning Tailwind CSS
    //       </p>
    //       <button
    //       className="bg-blue-500
    //       hover:bg-red-900
    //       p-4
    //       rounded-lg
    //       transition-colors
    //       duration-500
    //       ease-in-out
    //       hover:-translate-y-0.5
    //       hover:transition-all
    //       hover:shadow-lg" >
    //       Hover Me
    //       </button>
    //     </div>
    //     <br />
    //     3rd
    //     <div className="w-80 bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-gray-100 transition duration-300">

    //       <div className="h-56 bg-gray-600 overflow-hidden">
    //         <Image src={window} height={56*4} alt="product" />
    //       </div>

    //       <div className="p-6">

    //         <h2 className=" text-white text-2xl font-bold">
    //           T-shirt
    //         </h2>

    //         <p className="text-gray-200 mt-3">
    //           Beautiful furniture for your living room.
    //         </p>

    //         <p className="text-3xl font-bold text-green-600 mt-5">
    //           $199
    //         </p>

    //         <button className="w-full mt-6 bg-green-400 text-white py-3 rounded-xl hover:bg-green-700 transition hover:shadow">
    //           Buy Now
    //         </button>

    //       </div>

    //     </div>
    //   </main>
    <main className="">
      <section className="relative w-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-h-full w-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
        >
          <source src="/videos/hero.mp4" type="video/mp4" className="z-0" />
          <source src="/videos/hero.webm" type="video/webm" className="z-0" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative w-150 z-10 flex flex-col justify-center items-left min-h-screen text-white text-left px-4">
          <h1 className="text-5xl">Creating Meaningful Celebrations Through Thoughtful Designs</h1>
          <p className="">Custom Event Design &amp; Decor for Weddings, Corporate Events &amp; Private Celebrations.</p>
          <div className="py-5 flex gap-2">
            <a href="" className="px-4 py-2 bg-yellow-600">Book A Constultation</a>
            <a href="" className="px-4 py-2 bg-transparent border-1">View Our Work</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
