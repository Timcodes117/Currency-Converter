import React from 'react'
import Select from 'react-select'

// I created this input component so I don't have to duplicate the same
// and not to make the code bulky...
// it makes the code re-useable
// this collects infos via props based on it needs
const InputSelect = ({ label, data, isLoading, clearable, searchable, onChange, disabled, mutiple, inputValue, onInput, tootip }) => {
    return (
        <div className='flex   flex-col flex-1 gap-2    w-full  ' title={tootip}>
            <p className='text-[24px]'>{label}</p>
            <div className='flex flex-row gap-2 flex-1 items-end w-full  '>
                <Select
                    className="basic-single w-full"
                    classNamePrefix="select"
                    isLoading={isLoading}
                    isMulti={mutiple}
                    isClearable={clearable}
                    isSearchable={searchable}
                    onChange={(value) => onChange(value)}
                    name="from"
                    placeholder="select currency"
                    options={data}
                />
            </div>
            {/* this is where the input is coming from */}
            <input type="number" value={inputValue} onInput={(e) => onInput(e.currentTarget.value)} min={1}
            className='w-full  h-[50px] border-b text-[25px] mt-2' disabled={disabled} placeholder='0.00' />

            {/* I did this to show different */}
            {/*labels when the curent component title is "To" or "From" */}
            <p className='text-[16px]'> {label == "To" ? "Converted" : ""} Amount</p>

        </div>
    )
}

export default InputSelect