
export default function FloatingLabel({ children, inputID, labelText}) {

    return (
        <div className="flex grow relative">
            { children }

            <label htmlFor={inputID} 
                   className="absolute left-0 top-1 text-gray-600/50 text-sm px-3
                              transition-all
                              peer-placeholder-shown:top-4
                              peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-800/80">
                {labelText}
            </label>
        </div>
    );
}
