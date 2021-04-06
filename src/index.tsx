import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react'; 
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    }

    const submitHandler = async () => {
        if (!ref.current) {
            return;
        }

        // const result = await ref.current.transform(input, {
        //     loader: 'jsx',
        //     target: 'es2015'
        // });

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()]
        });

        console.log(result);
        setCode(result.code);
    }

    useEffect(() => {
        startService();
    }, []);

    return (
        <div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={submitHandler}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));