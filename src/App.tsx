import "./App.css";
import { ChangeEvent, useState } from "react";

interface Block {
    lines: string[];
  }
  
  interface Page {
    blocks: Block[];
  }
  
  interface FileData {
    pages: Page[];
  }

function App() {
    const [fileName, setFileName] = useState<string>("No file selected.");
    const [fileData, setFileData] = useState<FileData | null>(null);
    const [output, setOutput] = useState<string>("");

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        setFileName(e.target.files ? e.target.files[0].name : "No file selected.");

        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.target.files![0]);
        function onReaderLoad(event: ProgressEvent<FileReader>) {
            const obj = JSON.parse(event.target!.result as string);
            setFileData(obj);
        }
    }

    const allLines: string[] = [];
    function handleDataScrapping() {
        const pages = fileData?.pages;

        for (const value of pages!) {
            const element = value.blocks;

            for (const j of element) {
                const line = j.lines[0];
                allLines.push(line);
            }
        }
        setOutput(allLines.join("\n"));
    }

    return (
        <div className="converter">
            <h1>Mokuro Scrapper</h1>
            <form>
                <div className="selecter">
                    <label htmlFor="input">Choose File</label>
                    <input type="file" name="input" id="input" onChange={handleFileChange} />
                    <p className="file-name">{fileName}</p>
                </div>
                <button type="button" onClick={handleDataScrapping}>
                    Scrap
                </button>
            </form>
            <div className="outputs">
                <textarea name="output" id="1" cols={90} rows={16} readOnly value={output}></textarea>
            </div>
        </div>
    );
}

export default App;
