import Link from "next/link";
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button";
import Image from 'next/image'
import PageWrapper from "@/components/layout/PageWarpper";
import ShadowBg from "@/components/design/ShadowBg";

export default function Home() {
  return (
    <>
      <PageWrapper className="mb-12 mt-28 sm:mt:-40 flex flex-col items-center justify-center text-center">

        <div className="w-full h-screen flex flex-col items-center justify-between">
          <div className="-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className='relative isolate'>
                  <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
                    <div
                      style={{
                        clipPath:
                          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                      }}
                      className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
                      rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] 
                      sm:w-[72.1875rem]'
                    />
                  </div>
                  <div>
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">

                      {/* Text Section */}
                      <div className="max-w-4xl font-bold text-5xl md:text-6xl lg:text-7xl">
                        <h1 className="text-blue-600 text-4xl md:text-5xl lg:text-6xl">
                          Pregnancy Risk
                        </h1>

                        <p className="mt-4 text-xl lg:text-3xl">
                          Instant assessment for a safer maternity.
                        </p>
                      </div>

                      {/* Image Section */}
                      <div>
                        <div className="flex items-center justify-center">
                          <div className="flex items-center justify-center mt-16 sm:mt-24 w-full max-w-[400px] lg:max-w-none p-4 lg:p-8">
                            <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
                              <Image
                                // src='/pregnant.svg'
                                src='/gptpregnant.png'
                                alt='product preview'
                                width={400}
                                height={350}
                                quality={100}
                                priority={true}
                                // layout="responsive"
                                className='rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
                  <div
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>




        <div>
          <div className='relative isolate'>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
                rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] 
                sm:w-[72.1875rem]'
              />
            </div>
            <div>

              <p className=" mb-10 max-w-prose text-zinc-700 sm:text-lg">
                Welcome to Pregnancy Risk, your go-to resource for personalized pregnancy guidance.
                Simply answer a few questions about yourself and <span className="font-bold">instantly </span>
                receive a comprehensive risk assessment
                for various health conditions and potential complications.
              </p>

              <Link className={buttonVariants({
                size: "lg",
                className: "mt-5"
              })} href="/survey">
                Get started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
              />
            </div>
          </div>
        </div>



      </PageWrapper>



      {/* Feature section */}
      <div className='mx-auto mb-32 mt-10 max-w-5xl sm:mt-20'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Navigate Your Pregnancy with Confidence and Ease.
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Navigating through pregnancy is now simpler and safer.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>

                Start the Quiz
              </span>
              <span className='mt-2 text-zinc-700'>
                No sign-up required! Jump straight in and start the <Link
                  href='/survey'
                  className='text-blue-700'>
                  quiz
                </Link> to share details about your pregnancy and health.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Answer Honestly
              </span>
              <span className='mt-2 text-zinc-700'>
                Provide honest answers to a series of carefully crafted questions.
                You may skip questions, but we recommend answering them all.
                This ensures your risk assessment is as accurate and personalized as possible.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
                Receive Your Personalized Assessment
              </span>
              <span className='mt-2 text-zinc-700'>
                Instantly get a comprehensive risk assessment tailored to your pregnancy.
                Discover key insights, potential risks, and recommendations to enhance your maternity wellness.
              </span>
            </div>
          </li>
        </ol>


      </div>
    </>
  )
}



// <div>
// <div className='relative isolate'>
//   <div
//     aria-hidden='true'
//     className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
//     <div
//       style={{
//         clipPath:
//           'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//       }}
//       className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
//       rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] 
//       sm:w-[72.1875rem]'
//     />
//   </div>
//   <div>

//     <p>NothingWelcome to Pregnancy Risk, your go-to resource for personalized pregnancy guidance.
//       Simply answer a few questions about yourself and <span className="font-bold">instantly </span>
//       receive a comprehensive r</p>

//   </div>

//   <div
//     aria-hidden='true'
//     className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
//     <div
//       style={{
//         clipPath:
//           'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//       }}
//       className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
//     />
//   </div>
// </div>
// </div>