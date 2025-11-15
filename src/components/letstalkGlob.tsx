'use client'

import Link from 'next/link'

interface LetsTalkProps {
  label: string
  url: string
}

export const LetsTalk: React.FC<LetsTalkProps> = ({ label, url }) => {
  const repeatedLabel = Array(4)
    .fill(label)
    .join(' <span class="mx-4 text-gray-400 text-[24px]">♦</span> ')

  return (
    <Link href={url || '#'} className="block no-underline">
      <div className="group overflow-hidden cursor-pointer relative">
        {/* Top tiny gray line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-300" />

        {/* Scrolling label */}
        <div className="py-4 infinite-scroll text-center">
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .infinite-scroll {
              display: flex;
              justify-content: center;
              animation: scroll 20s linear infinite;
            }
            .infinite-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
          <span
            className="transition-colors duration-300 group-hover:text-white"
            style={{
              fontFamily: 'Geist',
              fontWeight: 500,
              fontStyle: 'Medium',
              fontSize: '80px',
              lineHeight: '80px',
              letterSpacing: '-3.2px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              verticalAlign: 'middle',
            }}
            dangerouslySetInnerHTML={{ __html: repeatedLabel }}
          />
        </div>

        {/* Bottom tiny gray line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300" />

        {/* Full overlay for black hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}
