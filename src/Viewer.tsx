import Sample from "./PDFSample.tsx";
import {useContext} from "react";
import {TopContext} from "./Provider.tsx";
function Viewer() {
    const {viewCajFile} = useContext(TopContext)
    return (
        <div>
            <Sample viewFileBlob={viewCajFile!.blobUrl!}/>
        </div>
    );
}

export default Viewer
