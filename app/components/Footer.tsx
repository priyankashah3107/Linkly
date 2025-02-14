import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 px-4 text-sm sm:text-base md:text-lg font-semibold">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <p className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>Created by</span>
          <a 
            href="https://github.com/priyankashah3107" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-600 transition-colors"
          >
            Priyanka Shah
          </a>
          <span className="hidden sm:inline">|</span>
          <div className="flex gap-4">
            <a 
              href="https://github.com/priyankashah3107" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://x.com/priyankashah317" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              Twitter
            </a>
          </div>
        </p>
      </div>
    </footer>
  )
}

export default Footer