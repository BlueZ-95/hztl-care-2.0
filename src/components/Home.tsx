import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
          <div className="relative mb-10">
            <img src="care_banner.jpg" />
          </div>
          <span className="w-full p-0.5 mb-10 bg-theme-01 opacity-70 lg:w-1/2 block mx-auto"></span>
          <div className="flex flex-col w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
            <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
              <a href="/" aria-label="Item" className="mr-3">
                <div className="flex items-center justify-center rounded-full bg-indigo-50">
                  <Image
                    priority
                    src="hcare-logo.svg"
                    height={90}
                    width={90}
                    alt="Horizontal Care"
                  />
                </div>
              </a>
            </div>
            <p className="w-full text-gray-700 lg:text-sm lg:max-w-md">
              "Sed ut perspiciatis unde omnis iste natus error sit iste voluptatem accusantium
              doloremque rem aperiam, ipsa eaque quae. Sed ut perspiciatis unde omnis iste."
            </p>
          </div>
          <div className="grid gap-8 row-gap-5 mb-8 lg:grid-cols-3 lg:row-gap-8">
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">Galaxies Orion</p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">Tunguska event</p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">Yolo ipsum dolor</p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">Curabitur mattis</p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">Leverage agile</p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">Organically grow</p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
            </div>
          </div>
          <div className="text-center">
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-theme-01"
            >
              See more
              <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="relative flex flex-col-reverse mb-10 sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto py-16 lg:py-0 lg:flex-col">
          <div className="w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl">
            <div className="mb-0 lg:max-w-lg lg:pr-8 xl:pr-6">
              <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:text-center">
                Join
                <br className="hidden md:block" />
                Horizontal Care
              </h2>
              <p className="mb-5 text-base text-gray-700 md:text-lg md:text-center">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae. explicabo.
              </p>
              <div className="mb-10 text-center md:mb-16 lg:mb-20">
                <a
                  href="/"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                >
                  Connect
                </a>
              </div>
            </div>
          </div>
          <div className="inset-y-0 top-0 right-0 w-full max-w-xl px-4 mx-auto mb-6 md:px-0 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
            <img
              className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
