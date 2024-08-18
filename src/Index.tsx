import CAJIcon from "./assets/CAJIcon.svg";
import CheckIcon from "./assets/Check.svg";
import Logo from './assets/Logo.svg'
import {useContext, useEffect, useRef} from "react";
import AnimationLogo from "./components/AnimationLogo";
import {CajFile, TopContext} from "./Provider.tsx";
import {useNavigate} from "react-router-dom";

function PDFWidget({cajFile}: { cajFile: CajFile }) {
    const {setCajFileStatus, setViewCajFile, setCaJFileBlobUrl} = useContext(TopContext)
    const navigator = useNavigate()
    useEffect(() => {
        if (cajFile) {
            uploadFile()
        }
    }, []);

    const uploadFile = () => {
        if(cajFile.uploadStatus !== "uploading") return
        // get file from fileRef
        const formData = new FormData();
        formData.append("file", cajFile.file, cajFile.file.name);

        fetch("/upload", {
            method: "POST",
            body: formData,
            redirect: "follow"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.blob(); // Convert the response to a Blob object
            })
            .then((blob) => {
                // Create a link element to download the blob
                const url = URL.createObjectURL(blob);
                setCaJFileBlobUrl(cajFile, url)
                setCajFileStatus(cajFile, "uploaded")
            })
            .catch((error) => console.error('Error:', error));
    }

    const goPreview = function () {
        setViewCajFile(cajFile)
        navigator("/view")
    }

    return <div onClick={goPreview}
                className={"pdf-thumb relative cursor-pointer w-[100px] h-[130px] border rounded-[4px] font-[600] flex justify-center items-center"}>
        <div className={'text-gray-400 text-[12px] p-[10px] overflow-hidden text-ellipsis'}>
            {cajFile.file.name}
        </div>
        {
            cajFile.uploadStatus == "uploading" &&
            <div className={"absolute  flex-col justify-center items-center z-1"}>
                <div className={'flex justify-center'}>
                    <AnimationLogo/>
                </div>
            </div>
        }
    </div>
}

export default function Home() {
    const {appendUploadCAJFiles, uploadCAJFiles} = useContext(TopContext)
    const ads = useRef(
        [
            "Completely Free: Enjoy unlimited conversions with no cost.",
            "Blazing Fast: Our system ensures swift processing, so you don’t have to wait.",
            "Cross-Platform Compatibility: Works smoothly on any operating system or device.",
            "Privacy Protection: We don’t store your files or compromise your privacy. Your data security is our top priority."
        ]
    )

    const fileRef = useRef<HTMLInputElement>(null);

    const pickFile = () => {
        fileRef.current?.click();
    }

    useEffect(() => {
        if (fileRef && fileRef.current) {
            fileRef.current.onchange = () => {
                const files = fileRef.current?.files;
                if (files) {
                    appendUploadCAJFiles(new CajFile(files[0]))
                }
                // set fileRef to null to reset the file input
                if (fileRef.current) {
                    fileRef.current.value = '';
                }
            }
        }
    }, [fileRef, fileRef.current]);

    return <div className={'bg-white min-h-[100vh] box-border'}>
        <input ref={fileRef} hidden={true} accept={'.caj'} type="file"/>
        <div className={'h-[56px] border-b-[1px] flex items-center'}>
            <div className={'px-[16px] flex items-center sm:px-[32px] text-[22px] font-[700]'}>
                <img src={Logo} className={'mr-[10px]'} alt=""/> View CAJ Online
            </div>
        </div>
        <div className="px-[16px] sm:px-[32px]  m-auto max-w-[1136px]  w-full mt-[30px] sm:mt-[60px]">
            <div className={' select-none  p-[10px] bg-[#0FC0C5] h-[300px]  rounded-[8px]'}>
                <div className={'w-full h-full bg-[#1A1A1A0D] rounded-[8px] border flex items-center justify-center'}
                     style={{border: "1px dashed white"}}>
                    <div className={'flex justify-center flex-col'}>
                        <img src={CAJIcon} className={'w-[100px] m-auto mb-[20px]'} alt=""/>
                        <div
                            onClick={pickFile}
                            className={'bg-white cursor-pointer flex justify-center items-center font-[700] text-[16px] text-[rgb(33,33,33)] w-[190px] h-[54px] rounded-[4px]'}>
                            CHOOSE FILE
                        </div>
                        {/*<div className={'text-center text-white opacity-80 mt-[8px]'}>or drop here</div>*/}
                    </div>
                </div>
            </div>
            <div className={'mt-[10px] flex'}>
                {uploadCAJFiles.map((caiFile, index) =>
                    <div key={index} className={'m-[4px]'}><PDFWidget cajFile={caiFile}/></div>)
                }
            </div>
            <div className={"mt-[40px]"}>
                <div className={"flex  flex-[5] text-[18px] text-[rgb(26,26,26)]"} style={{fontSmooth: "antialiased"}}>
                    Welcome to our online CAJ to PDF converter! Whether you're on Windows, Mac, or Linux, our tool makes
                    it
                    easy to convert your CAJ files to high-quality PDF documents. Just upload your CAJ file, and we'll
                    quickly handle the conversion, allowing you to view and share your document seamlessly on any
                    device.
                </div>
                <div className={'mt-[10px]'}>
                    {
                        ads.current.map((item, index) =>
                            <div key={index} className={'flex mt-[6px]'}>
                                <img className={'w-[20px] h-[20px] mt-[2px] mr-[2px]'} src={CheckIcon} alt=""/>
                                {item}
                            </div>)
                    }
                </div>
            </div>
        </div>

    </div>
}
