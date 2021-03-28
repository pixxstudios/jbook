import { useState } from 'react'; 
import ReactDOM from 'react-dom';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const submitHandler = () => {
        console.log(input);
    }

    return (
        <div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={submitHandler}>Submit</button>
            </div>
            <pre></pre>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));