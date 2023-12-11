import "./button.css"

export default function Button({ identifier, content, handleClick }) {
    return ( 
        <button id={identifier} onClick={handleClick}>{content}</button>
    )
}