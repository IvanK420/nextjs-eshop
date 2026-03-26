import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div data-theme="abyss" className='h-svh flex flex-col justify-center items-center text-4xl gap-2 overflow-hidden m-0 p-0'>
      <div className='animate-bounce text-6xl m-0'>🛸</div>
      <h2 className='m-0'> 404 - Not Found</h2>
      <p className='m-0'>Cette page n'existe pas</p>
      <Link href="/" className='link'>Return Home</Link>
    </div>
  )
}