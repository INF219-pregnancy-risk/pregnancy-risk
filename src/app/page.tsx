import LinkButton from "@/components/inputs/buttons/LinkButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen-nav flex flex-col">
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute transform-gpu overflow-hidden blur-3xl -top-40"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
                      rotate-[30deg] bg-gradient-to-tr from-accent to-primary opacity-30 sm:left-[calc(50%-30rem)] 
                      sm:w-[72.1875rem]"
            />
          </div>
        </div>
        <div className="flex w-full h-screen-nav items-center">
          <div className="md:grid md:grid-cols-2 gap-8 flex flex-col items-center w-full">
            {/* Text Section */}
            <div className="">
              <h1 className="text-primary text-5xl text-center md:text-start md:text-6xl font-bold">
                Pregnancy Risk
              </h1>

              <p className="mt-4 text-xl text-center md:text-start md:text-3xl">
                Instant assessment for a safer maternity.
              </p>
            </div>

            {/* Image Section */}
            <div className="flex relative h-auto w-[400px] max-w-full aspect-square md:h-auto">
              <Image
                // src='/pregnant.svg'
                src="/gptpregnant.png"
                alt="product preview"
                objectFit="contain"
                quality={100}
                width={400}
                height={400}
                priority={true}
                // layout="responsive"
                className="rounded-md bg-white shadow-2xl shadow-foreground/50 ring-2 ring-foreground/20"
              />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
                rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] 
                sm:w-[72.1875rem]"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <p className="mb-10 max-w-prose md:text-lg text-center md:text-start">
              Welcome to Pregnancy Risk, your go-to resource for personalized
              pregnancy guidance. Simply answer a few questions about yourself
              and <span className="font-bold">instantly </span>
              receive a comprehensive risk assessment for various health
              conditions and potential complications.
            </p>

            <LinkButton
              href="/survey"
              variant={"default"}
              icon={<ArrowForwardIcon />}
              iconPosition={"right"}
              className="w-min"
            >
              Start the Quiz
            </LinkButton>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-10 max-w-5xl sm:mt-20">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl sm:text-5xl">
              Navigate Your Pregnancy with Confidence and Ease.
            </h2>
            <p className="mt-4 text-lg">
              Navigating through pregnancy is now simpler and safer.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">Step 1</span>
              <span className="text-xl font-semibold">Start the Quiz</span>
              <span className="mt-2">
                No sign-up required! Jump straight in and start the
                <Link href="/survey" className="text-accent">
                  {` quiz `}
                </Link>
                to share details about your pregnancy and health.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">Step 2</span>
              <span className="text-xl font-semibold">Answer Honestly</span>
              <span className="mt-2">
                Provide honest answers to a series of carefully crafted
                questions. You may skip questions, but we recommend answering
                them all. This ensures your risk assessment is as accurate and
                personalized as possible.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">Step 3</span>
              <span className="text-xl font-semibold">
                Receive Your Personalized Assessment
              </span>
              <span className="mt-2">
                Instantly get a comprehensive risk assessment tailored to your
                pregnancy. Discover key insights, potential risks, and
                recommendations to enhance your maternity wellness.
              </span>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
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
