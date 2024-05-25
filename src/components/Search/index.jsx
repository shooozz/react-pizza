import React from 'react'
import debounce from 'lodash.debounce'

import { useDispatch } from 'react-redux'

import { setSearchValue } from '../../redux/slices/filterSlice'

import styles from './Search.module.scss'

const Search = () => {
    const dispatch = useDispatch()

    const [value, setValue] = React.useState('')
    const inputRef = React.useRef()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        // document.querySelector('input').focus()
        inputRef.current.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce(str => {
            console.log(str)
            dispatch(setSearchValue(str))
        }, 500),
        []
    )

    const onChangeInput = event => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <input ref={inputRef} value={value} className={styles.input} placeholder='Поиск пиццы ...' onChange={event => onChangeInput(event)} />
            <svg className={styles.icon} baseProfile='tiny' height='32px' version='1.1' viewBox='0 0 32 32' width='32px' xmlns='http://www.w3.org/2000/svg'>
                <g id='Guides__x26__Forms' />
                <g id='Icons'>
                    <path
                        d='M24,23.543l-4.356-4.356c0.875-1.168,1.399-2.614,1.399-4.186c0-3.866-3.134-7-7-7s-7,3.134-7,7s3.134,7,7,7   
                    c1.572,0,3.018-0.525,4.186-1.399l4.356,4.356L24,23.543z M9.043,15c0-2.757,2.243-5,5-5c2.757,0,5,2.243,5,5c0,
                    2.757-2.243,5-5,5   C11.286,20,9.043,17.757,9.043,15z'
                    />
                </g>
            </svg>
            {value && (
                <svg onClick={onClickClear} className={styles.clearIcon} viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                        <style>{'.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}'}</style>
                    </defs>
                    <title />
                    <g id='cross'>
                        <line className='cls-1' x1='7' x2='25' y1='7' y2='25' />
                        <line className='cls-1' x1='7' x2='25' y1='25' y2='7' />
                    </g>
                </svg>
            )}
        </div>
    )
}

export default Search
