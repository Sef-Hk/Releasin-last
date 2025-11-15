import type { Servicesinter as ServiceProps } from "@/payload-types";
import Image from "next/image";

const Services: React.FC<ServiceProps> = ({ title, services }) => {
  return (
    <div className="w-full">
      {/* Main Title */}
      <div
        style={{
          fontFamily: 'Geist',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '28px',
        }}
        className="mb-2"
      >
        {title}
      </div>
      <div className="border-t border-gray-300 mb-6" />

      {/* Services List */}
      <div className="space-y-6">
        {services?.map((serv, i) => (
          <div key={i}>
            <div className="flex justify-between items-center gap-6">
              {/* Title & Description */}
              <div className="flex-1">
                <div
                  style={{
                    fontFamily: 'Geist',
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '22px',
                  }}
                  className="mb-1"
                >
                  {i + 1}. {serv.title} {/* <-- Automatic numbering */}
                </div>
                <div
                  style={{
                    fontFamily: 'Geist',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '20px',
                    color: '#757575',
                  }}
                >
                  {serv.description}
                </div>
              </div>

              {/* Image */}
              {serv.image && typeof serv.image === 'object' && serv.image.url && (
                <div className="flex-shrink-0">
                  <Image
                    src={serv.image.url}
                    alt={serv.image.alt ?? ''}
                    width={160} 
                    height={120} 
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <div className="border-t border-gray-300 mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

