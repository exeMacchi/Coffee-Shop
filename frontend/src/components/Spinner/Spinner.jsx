
export default function Spinner({pxSize = 20}) {
    return (
        <div className="flex justify-center items-center gap-4">
            <span className={`bg-yellow-950 dark:bg-gray-200 rounded-full animate-shrink-grow`} 
                  style={{ animationDelay: "0ms", 
                           height: `${pxSize}px`, 
                           width: `${pxSize}px` }}></span>

            <span className={`bg-yellow-950 dark:bg-gray-200 rounded-full animate-shrink-grow`} 
                  style={{ animationDelay: "200ms", 
                           height: `${pxSize}px`, 
                           width: `${pxSize}px` }}></span>

            <span className={`bg-yellow-950 dark:bg-gray-200 rounded-full animate-shrink-grow`} 
                  style={{ animationDelay: "400ms", 
                           height: `${pxSize}px`, 
                           width: `${pxSize}px` }}></span>
        </div>
    );
}
