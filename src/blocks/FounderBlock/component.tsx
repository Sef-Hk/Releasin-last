// import type { FoundersInter as FounderProps } from "@/payload-types";
// import Image from "next/image";

// export const FounderCompo: React.FC<FounderProps> = ({ header, person, bottomdesc }) => {
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h2 className="text-left text-3xl font-medium">{header}</h2>
//         <div className="h-px bg-gray-300 w-20 mt-1"></div> {/* Tiny grey line */}
//       </div>

//       {/* Founders */}
//       <div className="space-y-4">
//         {person?.map((pers, ind) => (
//           <div key={ind} className="flex items-start space-x-4">
//             {/* Image */}
//             {pers.image && typeof pers.image === 'object' && (
//               <div className="flex-shrink-0">
//                 <Image
//                   src={pers.image.url || ''}
//                   alt={pers.image.alt || ''}
//                   width={120} // rectangle width
//                   height={120} // rectangle height
//                   className="object-cover rounded"
//                 />
//               </div>
//             )}

//             {/* Text */}
//             <div className="flex flex-col justify-between">
//               <div className="text-lg font-semibold">{pers.name}</div> {/* Name top-right */}
//               <div className="text-sm text-gray-600">{pers.desc}</div> {/* Description bottom-right */}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Optional bottom description */}
//       {bottomdesc && <div className="text-gray-500">{bottomdesc}</div>}
//     </div>
//   );
// };


import type { FoundersInter as FounderProps } from "@/payload-types";
import Image from "next/image";

export const FounderCompo: React.FC<FounderProps> = ({ header, person, bottomdesc }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-left text-3xl font-medium">{header}</h2>
      </div>

      {/* Grey line under header */}
      <div className="h-px bg-gray-300 w-full"></div>

      {/* Founders */}
      <div>
        {person?.map((pers, ind) => (
          <div key={ind}>
            {/* Grey line on top of founder */}
            <div className="h-px bg-gray-300 w-full"></div>

            {/* Founder content */}
            <div className="flex items-center space-x-4 py-6">

              {/* Image left */}
              {pers.image && typeof pers.image === 'object' && (
                <div className="flex-shrink-0">
                  <Image
                    src={pers.image.url || ''}
                    alt={pers.image.alt || ''}
                    width={120}
                    height={120}
                    className="object-cover rounded"
                  />
                </div>
              )}

              {/* Text right */}
              <div className="flex flex-col justify-start">
                <div className="text-lg font-semibold">{pers.name}</div>
                <div className="text-sm text-gray-600 mt-1">{pers.desc}</div>
              </div>
            </div>

            {/* Grey line on bottom of founder */}
            <div className="h-px bg-gray-300 w-full"></div>
          </div>
        ))}
      </div>

      {/* Bottom description with grey lines */}
      {bottomdesc && (
        <div>
          <div className="h-px bg-gray-300 w-full"></div>
          <div className="text-gray-500 py-6">{bottomdesc}</div>
          <div className="h-px bg-gray-300 w-full"></div>
        </div>
      )}
    </div>
  );
};
