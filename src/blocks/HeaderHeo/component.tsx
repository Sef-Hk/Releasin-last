import React from 'react';
import type { CustomblockInter as HeaderHeroProps } from '@/payload-types';
import Image from 'next/image';

const HeaderHero: React.FC<HeaderHeroProps> = ({ logo, title, text, logosArray }) => {
  const duplicatedLogos = logosArray ? [...logosArray, ...logosArray] : [];

  return (
    <div>
      <div>
        {logo && typeof logo === "object" && (
          <Image 
            src={logo.url || ''} 
            alt={logo.alt || ''} 
            width={250} 
            height={250} 
          />
        )}
      </div>

      <div>
        <p
          style={{
            fontFamily: 'Geist',
            fontWeight: 600,
            fontStyle: 'SemiBold',
            fontSize: '26px',
            lineHeight: '28.6px',
            letterSpacing: '-1.04px',
            verticalAlign: 'middle',
          }}
        >
          {title}
        </p>
      </div>

      <div>
        <p
          style={{
            fontFamily: 'Geist',
            fontWeight: 500,
            fontStyle: 'Medium',
            fontSize: '16px',
            lineHeight: '22.4px',
            letterSpacing: '-0.48px',
            verticalAlign: 'middle',
          }}
        >
          {text}
        </p>
      </div>

      <div style={{ borderTop: '1px solid #ccc', margin: '16px 0' }} />

      <div style={{ overflow: 'hidden', position: 'relative', width: '100%' }}>
        <style>
          {`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .logo-scroll {
              animation: scroll 30s linear infinite;
            }
          `}
        </style>
        <div 
          className="logo-scroll"
          style={{ 
            display: 'flex', 
            gap: '48px', 
            alignItems: 'center',
            width: 'max-content'
          }}
        >
          {duplicatedLogos.map((item, i) => {
            if (item.logo && typeof item.logo === 'object' && item.logo.url) {
              return (
                <div 
                  key={i}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    src={item.logo.url}
                    alt={item.logo.alt ?? ''}
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #ccc', margin: '16px 0' }} />
    </div>
  );
};

export default HeaderHero;
