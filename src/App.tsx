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
    const [firstPage, setFirstPage] = useState<number | ''>('')
    const [lastPage, setLastPage] = useState<number | ''>('')

    const allLines: string[] = [];

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

    function handleFirstPageChange(e: ChangeEvent<HTMLInputElement>) {
        setFirstPage(e.target.value === '' ? '' : Number(e.target.value))
    }

    function handleLastPageChange(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);

        setLastPage(e.target.value === '' ? '' : Number(e.target.value))
    }

    function cleanPages(pages: Page[]) {
        console.log(firstPage);
        console.log(lastPage);

        if (firstPage !== '' && lastPage !== '') {
            if (firstPage === lastPage) return (pages.slice(firstPage - 1, lastPage))
            return (pages.slice(firstPage - 1, lastPage))
        } else if (firstPage === '' && lastPage !== '') {
            return (pages = pages.slice(0, lastPage))
        } else if (firstPage !== '' && lastPage === '') {
            console.log('test');

            return (pages.slice(firstPage - 1))
        }
        return pages
    }

    function handleDataScrapping() {
        const pages = cleanPages(fileData!.pages)

        for (const value of pages!) {
            const element = value.blocks;

            for (const j of element) {
                const line = j.lines.join('\n');
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
                    <label htmlFor="input" className="file-input">
                        Choose File
                    </label>
                    <input type="file" name="input" id="input" onChange={handleFileChange} />
                    <p className="file-name">{fileName}</p>
                </div>
                <div className="pages">
                    <div className="first-page">
                        <label htmlFor="first-page">Start page: </label>
                        <input type="number" name="first-page" id="first-page" onChange={handleFirstPageChange} />
                    </div>
                    <div className="last-page">
                        <label htmlFor="last-page">Last page: </label>
                        <input type="number" name="last-page" id="last-page" onChange={handleLastPageChange} />
                    </div>
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
