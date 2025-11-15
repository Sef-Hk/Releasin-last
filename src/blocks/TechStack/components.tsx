// import type { TechstackInter } from "@/payload-types"
// import Image from "next/image"
// export const TechStack : React.FC<TechstackInter> = ({techs,header}) => {
//     return (
//         <div>
             
//              <div>{header}</div>
//             {techs?.map((tech,ind)=> {
//                 return(
//                     <div key={ind}>
//                        <div> {tech.title}</div> 
//                        <div>{tech.desc}</div>
//                        <div>
//                         {tech.logo && typeof tech.logo === 'object' && (
//                             <div>
//                                 <Image
//                                  src={tech.logo.url || ''}
//                                  alt={tech.logo.alt || ''}
//                                  width={50}
//                                  height={50}
//                                 />
//                             </div>
//                         )}
                       
//                        </div>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

import type { TechstackInter } from "@/payload-types";
import Image from "next/image";

export const TechStack: React.FC<TechstackInter> = ({ techs, header }) => {
  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-2xl font-bold text-left mb-6">{header}</h2>

      {/* Grid for techs: 2 per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techs?.map((tech, ind) => (
          <div
            key={ind}
            className="flex justify-between items-start bg-white border border-gray-300 rounded-md p-4 shadow-sm"
          >
            {/* Left: title + desc */}
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold mb-2">{tech.title}</h3>
              <p className="text-gray-700">{tech.desc}</p>
            </div>

            {/* Right: image */}
            {tech.logo && typeof tech.logo === "object" && (
              <div className="flex-shrink-0">
                <Image
                  src={tech.logo.url || ""}
                  alt={tech.logo.alt || ""}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
