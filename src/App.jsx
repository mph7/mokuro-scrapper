import './App.css'
import { useState } from 'react'


function App() {
    const [fileName, setFileName] = useState('No file selected.')
    const [output, setOutput] = useState('')



    function handleFileChange(e) {
        const allLines = [];
        setFileName(e.target.files ? e.target.files[0].name : 'No file selected.')

        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.target.files[0]);
        function onReaderLoad(event) {
            const obj = JSON.parse(event.target.result);
            console.log(obj);

            handleDataScrapping(obj)
        }



        function handleDataScrapping(data) {
            const pages = data.pages

            for (let i = 0; i < pages.length; i++) {
                const element = pages[i].blocks;

                for (let j = 0; j < element.length; j++) {
                    const line = element[j].lines[0];
                    allLines.push(line)
                }
            }
            console.log(allLines.join('\n'))
            setOutput(allLines.join('\n'))
        }
    }

    return (
        <div className="converter">
            <h1>Mokuro Scrapper</h1>
            <form>
                <div className="selecter">
                    <label htmlFor="input">Choose File</label>
                    <input type="file" name='input' id='input' onChange={handleFileChange} />
                    <p className='file-name'>{fileName}</p>
                </div>
                <button type="button">Scrap</button>
            </form>
            <div className="outputs">
                <textarea name="output" id="1" cols={90} rows={16} readOnly value={output}></textarea>
            </div>
        </div>
    )
}

export default App
