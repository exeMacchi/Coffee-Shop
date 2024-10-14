
export default function Alert({ type, title, message }) {
    return (
        <div className={`border-4 rounded-2xl p-4 my-2 shadow-inner 
                        ${ type === "success"
                           ?
                           "border-green-900 dark:border-green-500 " + 
                           "bg-green-500/20 dark:bg-green-700/20 " + 
                           "shadow-green-900/50 dark:shadow-green-500/50"
                           : 
                           "border-red-800 dark:border-red-300 " + 
                           "bg-red-500/20 dark:bg-red-800/20 " + 
                           "shadow-red-900/50 dark:shadow-red-500/50" }`}>
            <h2 className={`text-3xl text-center font-bold
                          ${ type === "success"
                             ? 
                             "text-green-900 dark:text-green-500"
                             :
                             "text-red-800 dark:text-red-300"}`}>
                {title}
            </h2>
            <p className={`text-xl text-center py-2
                         ${ type === "success"
                            ? 
                            "text-green-900 dark:text-green-500"
                            : 
                            "text-red-800 dark:text-red-300"}`}>
                {message}
            </p>
        </div>
    );
}
