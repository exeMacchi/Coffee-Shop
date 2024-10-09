
export default function FormInput({ id, type, name, labelText, required, inputValue, setInputValue }) {

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prevInputsValues) => ({
            ...prevInputsValues,
            [name]: value
        }));
    }

    return (
        <div className="flex grow relative">
        {
            // INPUT TEXT
            type === "text" ? (
                <input id={id}
                       type="text"
                       name={name}
                       value={inputValue}
                       placeholder="..."
                       onChange={handleOnChange}
                       className="peer h-14 placeholder-shown:pt-2"
                       required={required}/>

            // INPUT NUMBER
            ) : type === "password" ? (
                <input id={id} 
                       type="password" 
                       name={name}
                       value={inputValue}
                       placeholder="..."
                       onChange={handleOnChange}
                       className="peer h-14 placeholder-shown:pt-2"
                       required={required}/>

            ) : type === "number" ? (
                <input id={id}
                       type="number"
                       name={name}
                       value={inputValue}
                       placeholder="..."
                       min={0}
                       onChange={handleOnChange}
                       className="peer h-14 placeholder-shown:pt-2 rounded-l-none"
                       required={required}/>

            // TEXTAREA
            ) : type === "textarea" ? (
                <textarea id={id} 
                            name={name} 
                            value={inputValue}
                            placeholder="..."
                            maxLength={200}
                            onChange={handleOnChange}
                            className="peer h-36 resize-none placeholder-shown:pt-4"
                            required={required}>
                </textarea>
            ) : (
                <></>
            )
        }
            <label htmlFor={id} 
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
