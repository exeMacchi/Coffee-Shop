

export default function ProductCard({ product }) {

    return (
        <article className="border-2 rounded-lg overflow-hidden 
                          border-yellow-950 dark:border-slate-300
                          hover:cursor-pointer hover:translate-y-2 
                          hover:shadow-xl hover:shadow-orange-950 dark:hover:shadow-blue-100
                          transition duration-500">
            <figure className="min-w-full max-h-52 overflow-hidden">
                <img className="object-contain -translate-y-16 size-full"
                     src={product.image}></img>
            </figure>
            <div className="bg-orange-200 dark:bg-slate-700 flex flex-col items-center gap-3 p-4">
                <h4 className="text-2xl">{product.name}</h4>
                <p className="text-xl">{product.description}</p>
                <span className="italic">${product.price}</span>
            </div>
        </article>
    );
}
