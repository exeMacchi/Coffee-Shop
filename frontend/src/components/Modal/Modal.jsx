import CloseIcon from "../Icons/CloseIcon"

export default function Modal({ open, onClose, children }) {
    return (
        /* Backdrop */
        <div onClick={ onClose }
             className={`fixed inset-0 flex justify-center items-center transition-colors
                        ${ open ? "visible bg-black/50" : "invisible" }`}>
            {/* Modal */}
            <div className={`bg-stone-300 dark:bg-slate-500 dark:text-gray-200 
                               rounded-3xl shadow p-6 w-1/4 transition-all
                            ${ open ? "scale-100 opacity-100": "scale-125 opacity-0" }`}
                 onClick={(e) => { e.stopPropagation() }}>

                {/* Close Button */}
                <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-100/50 
                                   hover:scale-125 hover:text-stone-900 dark:hover:text-gray-100 transition"
                        onClick={ onClose }>
                    <CloseIcon className="text-2xl"/>
                </button>

                {/* Modal Content */}
                {children}
            </div>
        </div>
    );
}
