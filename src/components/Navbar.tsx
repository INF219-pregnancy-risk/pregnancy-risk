import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import PageWrapper from './layout/PageWarpper'


const Navbar = () => {
    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <PageWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link
                        href='/'
                        className='flex z-40 font-semibold'>
                        <span>Pregnancy Risk</span>
                    </Link>


                    <div className='hidden items-center space-x-4 sm:flex'>
                        <>
                            <Link
                                href='/about'
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}>
                                About
                            </Link>
                            <Link
                                href='/survey'
                                className={buttonVariants({
                                    size: 'sm',
                                })}>
                                Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                            </Link>
                        </>

                    </div>
                </div >
            </PageWrapper >
        </nav >
    )
}

export default Navbar