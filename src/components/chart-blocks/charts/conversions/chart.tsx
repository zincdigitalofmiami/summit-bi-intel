"use client";

import { conversionsData } from "@/data/convertions";

const addThousandsSeparator = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ConversionsChart() {
  const maxValue = Math.max(...conversionsData.map((item) => item.value));
  
  return (
    <div className="h-[400px] w-full flex items-center justify-center px-2">
      <div className="w-full max-w-lg">
        <div className="space-y-2 sm:space-y-1">
          {conversionsData.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            const width = Math.max(percentage, 20); // Minimum width for small values
            
            return (
              <div key={item.stage} className="relative">
                {/* Funnel Section */}
                <div
                  className="relative mx-auto rounded-sm shadow-sm transition-all duration-500 ease-out hover:shadow-md"
                  style={{
                    backgroundColor: item.color,
                    width: `${width}%`,
                    height: "56px", // Slightly reduced for mobile
                    marginLeft: `${(100 - width) / 2}%`,
                  }}
                >
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-2">
                    <div className="text-xs sm:text-sm font-semibold leading-tight text-center">
                      {item.stage}
                    </div>
                    <div className="text-base sm:text-lg font-bold">
                      {addThousandsSeparator(item.value)}
                    </div>
                  </div>
                  
                  {/* Conversion Rate */}
                  {index > 0 && (
                    <div className="absolute -top-5 sm:-top-6 right-2 text-xs text-muted-foreground font-medium">
                      {((item.value / conversionsData[index - 1].value) * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
                
                {/* Arrow Connector */}
                {index < conversionsData.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-muted-foreground/30"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="text-center sm:text-left">
              <div className="text-muted-foreground mb-1">Overall Conversion</div>
              <div className="font-bold text-lg">
                {((conversionsData[conversionsData.length - 1].value / conversionsData[0].value) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-muted-foreground mb-1">Total Value</div>
              <div className="font-bold text-lg">
                {addThousandsSeparator(conversionsData.reduce((sum, item) => sum + item.value, 0))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}