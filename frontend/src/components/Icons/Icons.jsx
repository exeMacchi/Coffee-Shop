/* --- DARK MODE ICONS --- */
export function DarkIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width="1em" 
             height="1em" 
             viewBox="0 0 256 256" {...props}>
            <path fill="currentColor" d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64m-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48M58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16"></path>
        </svg>
    );
}

export function LightIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="1em" 
             height="1em" 
             viewBox="0 0 256 256" {...props}>
            <path fill="currentColor" 
                d="M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.1 103.1 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98m-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4"></path>
        </svg>
    );
}

/* --- ADMIN ICONS --- */
export function EditIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="1em" height="1em" viewBox="0 0 24 24" {...props}>
                <g fill="none" stroke="currentColor" strokeLinecap="round" 
                   strokeLinejoin="round" strokeWidth={2}>
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                    </path>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
                    </path>
                </g>
        </svg>
    );
}

export function TrashIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" 
             viewBox="0 0 24 24" {...props}>
                <path fill="none" stroke="currentColor" strokeLinecap="round" 
                      strokeLinejoin="round" strokeWidth={2} 
                      d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4">
                </path>
        </svg>
    );
}

/* --- OTHERS ICONS --- */
export function CloseIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" 
             viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" 
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z">
            </path>
        </svg>
    );
}

export function BarIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" 
             viewBox="0 0 24 24" {...props}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" 
                  strokeWidth={2} d="M5 7h14M5 12h14M5 17h14">
            </path>
        </svg>
    );
}
