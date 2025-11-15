import type { RelnumberInter as RelnumberProps } from "@/payload-types";

const ReleasinNumber: React.FC<RelnumberProps> = ({ relnumb }) => {
  return (
    <div className="w-full">
      {relnumb?.map((rel, ind) => {
        return (
          <div key={ind} className="mb-4">
            {/* Title and Number on the same line */}
            <div className="flex justify-between items-center">
              {/* Number */}
              <div
                style={{
                  fontFamily: 'Geist',
                  fontWeight: 500,
                  fontStyle: 'Medium',
                  fontSize: '14px',
                  lineHeight: '19.6px',
                  letterSpacing: '-0.42px',
                  verticalAlign: 'middle',
                  color: '#757575',
                }}
              >
                {rel.number} +
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: 'Geist',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '22px',
                  textAlign: 'right',
                }}
              >
                {rel.title}
              </div>
            </div>

            {/* Thin grey line under each item */}
            <div className="border-t border-gray-300 mt-2" />
          </div>
        );
      })}
    </div>
  );
};

export default ReleasinNumber;
