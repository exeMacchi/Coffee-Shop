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

export function CartIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" 
             viewBox="0 0 24 24" {...props}>
            <g fill="none">
                <path fill="currentColor" d="M18 15H7L5.5 6H21z"></path>
                <path stroke="currentColor" strokeLinecap="round" 
                    strokeLinejoin="round" strokeWidth={2} 
                    d="M3 3h2l.5 3m0 0L7 15h11l3-9z"></path>
                <circle cx={8} cy={20} r={1} stroke="currentColor" 
                        strokeLinecap="round" strokeLinejoin="round" 
                        strokeWidth={2}></circle>
                <circle cx={17} cy={20} r={1} stroke="currentColor" 
                        strokeLinecap="round" strokeLinejoin="round" 
                        strokeWidth={2}></circle>
            </g>
        </svg>
    );
}


export function PlusIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" 
             viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path>
        </svg>
    );
}

export function MinusIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" 
             viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" d="M19 12.998H5v-2h14z"></path>
        </svg>);
}

export function SearchIcon(props) {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" 
             viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" 
                  d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14">
            </path>
        </svg>
    );
} 
