import React from "react";

export const Hero = () => {
  return (
    <section className="text-black">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="/hobbyflo_logo.png"
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm">
          <h1 className="text-5xl font-bold leadi sm:text-6xl">HobbyFlo</h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">Peer-to-Peer rentals</p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4">
            <a
              rel="noopener noreferrer"
              href="/dashboard"
              className="px-8 py-3 text-lg font-semibold rounded bg-blue-600 text-white"
            >
              Enter app
            </a>
            <a
              rel="noopener noreferrer"
              href="/about"
              className="px-8 py-3 text-lg font-semibold border rounded border-black"
            >
              More info
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
