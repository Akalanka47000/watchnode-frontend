import { HeartIcon } from '@heroicons/react/solid'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur relative z-50 h-16 flex justify-center items-center">
      <div className="px-5 py-3 flex flex-col items-center">
        <p className="flex flex-row items-center text-white">
          Made with&nbsp;
          <HeartIcon className="fill-red-700 h-5" />
          &nbsp; By&nbsp;
          <a href="https://akalanka47000.github.io/portfolio/">
            <p className="text-primary-base hover:text-primary-hover transition-all duration-200">Team Watchnode</p>
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
